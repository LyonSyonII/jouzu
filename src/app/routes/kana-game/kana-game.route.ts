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
import { KanaChar, romanize, segment } from "@shared/japanese";
import { KanaCharArkType } from "@shared/japanese.schema";
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

    let selectedValueIdx = 0;
    let charIdx = 0;

    return currentWord.charGroups.map(group => ({
      chars: group.map(({ word: char, reading }) => ({
        char,
        charIdx: charIdx++,
        reading: reading.map(kana => ({
          kana,
          romaji: romanize(kana),
          selectedValueIdx: selectedKana.has(kana) ? selectedValueIdx++ : null,
        })),
      })),
    }));
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
    return (
      pipe(
        currentWordDisplay,
        flatMap(group => group.chars),
      ).find(char => char.reading.some(reading => reading.selectedValueIdx === selectedInputIdx))
        ?.charIdx ?? -1
    );
  });

  protected answer: string = "";

  private readonly kanaInputs = viewChildren<KanaGameInput>("kanaInput");

  private readonly remainingKana: Set<KanaChar> = new Set();
  private readonly usedKana: Set<KanaChar> = new Set();
  private readonly usedWords: Set<SegmentedWord> = new Set();
  private wordGroupStart = 0;

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
    this.remainingKana.clear();
    this.usedKana.clear();
    this.usedWords.clear();
    this.wordGroupStart = 0;

    return pipe(
      await fetch("/assets/wordlist.zst").then(r => r.arrayBuffer()),
      b => new Uint8Array(b),
      decompress,
      d => new TextDecoder().decode(d),
      JSON.parse,
      WordlistSchema.assert,
      map(word => {
        const groups: WordChar[][] = [[]];
        const segments = segment(word.word);
        let segmentIdx = 0;
        let segmentChars = "";
        let score = 0;

        for (const char of word.chars) {
          groups.at(-1)!.push(char);
          segmentChars += char.word;
          if (segmentChars === segments[segmentIdx]) {
            segmentIdx++;
            segmentChars = "";
            groups.push([]);
          }
        }

        for (const kana of selectedKana) {
          if (word.reading.includes(kana)) score += 1;
        }
        return {
          word: {
            ...word,
            charGroups: groups.filter(group => group.length > 0),
          },
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

    if (this.remainingKana.size === 0) {
      const kana = this.usedKana.size > 0 ? this.usedKana : this.selectedKana();
      for (const char of kana) {
        this.remainingKana.add(char);
      }
      this.usedKana.clear();
    }

    for (; this.wordGroupStart < words.length; this.wordGroupStart += 3) {
      const wordGroups = words.slice(this.wordGroupStart, this.wordGroupStart + 3);
      const hasUnusedWords = wordGroups.some(group => group.some(({ word }) => !this.usedWords.has(word)));
      if (!hasUnusedWords) continue;

      for (const group of wordGroups) {
        const match = group.find(({ word }) => (
          !this.usedWords.has(word) &&
          word.chars.some(char => char.reading.some(kana => this.remainingKana.has(kana)))
        ));
        if (match === undefined) continue;

        this.usedWords.add(match.word);
        for (const char of match.word.chars) {
          for (const kana of char.reading) {
            if (!this.remainingKana.has(kana)) continue;
            this.remainingKana.delete(kana);
            this.usedKana.add(kana);
          }
        }
        return match.word;
      }
    }

    return null;
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

type Word = (typeof WordlistSchema.infer)[number];
type WordChar = Word["chars"][number];
type SegmentedWord = Word & {
  charGroups: WordChar[][];
};
type ScoredWord = {
  word: SegmentedWord;
  score: number;
};
type Words = ScoredWord[][];
type CurrentWord = SegmentedWord | null;
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
