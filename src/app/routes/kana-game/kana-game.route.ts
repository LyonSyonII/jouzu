import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  linkedSignal,
  resource,
  signal,
  viewChildren,
  ViewChildren,
} from "@angular/core";
import BaseComponent from "@components/base.component";
import { Card } from "@components/card/card.component";
import { KanaChar, KanaCharArkType, romanize, segment } from "@shared/japanese";
import { AngularSvgIconModule } from "angular-svg-icon";
import { Skeleton } from "primeng/skeleton";
import { Nav } from "@components/nav/nav.component";
import { decompress } from "fzstd";
import { filter, flatMap, groupBy, map, pipe, sortBy, values } from "remeda";
import { type } from "arktype";
import { KanaGameInput } from "./kana-game-input";

@Component({
  selector: "x-kana-game",
  templateUrl: "./kana-game.route.html",
  styleUrl: "./kana-game.route.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, AngularSvgIconModule, Nav, Skeleton, KanaGameInput],
})
export default class KanaGame extends BaseComponent {
  public readonly selectedKana = input.required<Set<KanaChar>, KanaChar[]>({
    transform: kana => new Set(kana),
  });

  protected readonly words = resource<Words, Set<KanaChar>>({
    params: this.selectedKana,
    loader: ({ params }) => this.fetchWords(params),
  });

  protected readonly currentWord = linkedSignal<CurrentWord>(() => {
    if (!this.words.hasValue()) return null;
    console.log(this.words.value());
    return this.getNextWord();
  });

  protected readonly currentWordDisplay = computed<CurrentWordDisplay | null>(() => {
    const currentWord = this.currentWord();
    if (currentWord === null) return null;
    const selectedKana = this.selectedKana();
    const wordSegments = segment(currentWord.word);

    let selectedValueIdx = 0;
    let charIdx = 0;
    let segmentIdx = 0;
    let segmentChars = "";
    const groups: CurrentWordDisplay = [{ chars: [] }];

    for (const { word: char, reading } of currentWord.chars) {
      const group = groups.at(-1)!;
      group.chars.push({
        char,
        charIdx: charIdx++,
        reading: reading.map(kana => ({
          kana,
          romaji: romanize(kana),
          selectedValueIdx: selectedKana.has(kana) ? selectedValueIdx++ : null,
        })),
      });

      segmentChars += char;
      if (segmentChars === wordSegments[segmentIdx]) {
        segmentIdx++;
        segmentChars = "";
        groups.push({ chars: [] });
      }
    }

    return groups.filter(group => group.chars.length > 0);
  });

  protected readonly selectedKanaValues = linkedSignal(() => {
    const currentWordDisplay = this.currentWordDisplay();
    if (currentWordDisplay === null) return [];
    return pipe(
      currentWordDisplay,
      flatMap(group => group.chars),
      flatMap(char => char.reading),
      filter(kana => kana.selectedValueIdx !== null),
      map(_ => ""),
    );
  });
  protected readonly selectedKanaInputFocused = signal(0);
  protected readonly focusedCharIdx = computed(() => {
    const currentWordDisplay = this.currentWordDisplay();
    if (currentWordDisplay === null) return -1;

    const selectedInputIdx = this.selectedKanaInputFocused();
    return pipe(
      currentWordDisplay,
      flatMap(group => group.chars),
    ).find(char => char.reading.some(reading => reading.selectedValueIdx === selectedInputIdx))?.charIdx ?? -1;
  });

  protected answer: string = "";

  private readonly kanaInputs = viewChildren<KanaGameInput>("kanaInput");

  private readonly remainingKana: Set<KanaChar> = new Set();
  private readonly usedKana: Set<KanaChar> = new Set();

  // {
  //   "word": "胃",
  //   "reading": "い",
  //   "chars": [
  //     {
  //       "word": "胃",
  //       "reading": "い"
  //     }
  //   ],
  //   "accent": "い○",
  //   "romanization": "i",
  //   "english": "stomach"
  // }
  constructor() {
    super();
    effect(() => {
      const error = this.words.error();
      if (error) {
        this.panic(error);
      }
    });
  }

  protected goPrevInput() {
    this.selectedKanaInputFocused.update(i => {
      if (i <= 0) {
        return 0;
      }
      return i - 1;
    });
  }

  protected goNextInput() {
    this.selectedKanaInputFocused.update(i => {
      const last = this.selectedKanaValues().length - 1;
      if (i >= last) {
        this.validateAnswer();
        return last;
      }
      return i + 1;
    });
  }

  protected validateAnswer() {
    if (this.kanaInputs().every(input => input.isExpected())) {
      this.success("Word is correct!");
    } else {
      this.error("Word is incorrect :(");
    }
  }

  private async fetchWords(selectedKana: Set<KanaChar>): Promise<Words> {
    return pipe(
      await fetch("/assets/wordlist.zst").then(r => r.arrayBuffer()),
      b => new Uint8Array(b),
      decompress,
      d => new TextDecoder().decode(d),
      JSON.parse,
      WordlistSchema.assert,
      map(word => {
        let score = 0;
        for (const kana of selectedKana) {
          if (word.reading.includes(kana)) score += 1;
        }
        return {
          word,
          score,
        };
      }),
      filter(({ score }) => score > 0),
      sortBy(({ word }) => word.reading.length, [({ score }) => score, "desc"]),
      groupBy(({ word }) => word.reading.length),
      values(),
    );
  }

  private getNextWord(): CurrentWord | null {
    if (!this.words.hasValue()) {
      return null;
    }
    const words = this.words.value();
    console.log("Chosen:", word);
  }
}

const WordlistSchema = type({
  word: "string",
  reading: "string",
  accent: "string",
  romanization: "string",
  english: "string",
  chars: type({
    word: "string",
    reading: KanaCharArkType.array(),
  }).array(),
}).array();

type Word = typeof WordlistSchema.infer[number];
type ScoredWord = {
  word: Word;
  score: number;
};
type Words = ScoredWord[][];
type CurrentWord = Word | null;
type CurrentWordDisplay = Array<{
  chars: Array<{
    char: string;
    charIdx: number;
    reading: Array<{
      kana: KanaChar;
      romaji: string;
      selectedValueIdx: number | null;
    }>;
  }>;
}>;
