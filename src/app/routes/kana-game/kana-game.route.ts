import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  resource,
  signal,
} from "@angular/core";
import BaseComponent from "@components/base.component";
import { Card } from "@components/card/card.component";
import { KanaChar, KanaCharArkType, romanize } from "@shared/japanese";
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

  protected readonly words = resource({
    params: this.selectedKana,
    loader: ({ params }) => this.fetchWords(params),
  });

  protected readonly currentWord = linkedSignal(() => {
    if (!this.words.hasValue()) return null;

    console.log(this.words.value());
    const { word } = this.words.value()[14][2];
    console.log("Chosen:", word);
    return word;
  });

  protected readonly currentWordDisplay = computed(() => {
    const currentWord = this.currentWord();
    if (currentWord === null) return null;
    const selectedKana = this.selectedKana();
    const Segmenter = (
      Intl as typeof Intl & {
        Segmenter?: new (
          locale: string,
          options: { granularity: "word" },
        ) => { segment(value: string): Iterable<{ segment: string }> };
      }
    ).Segmenter;
    const segmenter = Segmenter ? new Segmenter("ja", { granularity: "word" }) : null;
    const segments = segmenter
      ? [...segmenter.segment(currentWord.word)].map(({ segment }) => segment)
      : [currentWord.word];
    const wordSegments: string[] = [];
    for (const segment of segments) {
      const previous = wordSegments.at(-1);
      const kanaOnly = /^[ぁ-んァ-ンー]+$/u.test(segment);
      const previousKanaOnly = previous !== undefined && /^[ぁ-んァ-ンー]+$/u.test(previous);
      const startsWithKanji = /^[一-龯々]/u.test(segment);

      if (previous !== undefined && (previousKanaOnly && kanaOnly || previousKanaOnly && startsWithKanji)) {
        wordSegments[wordSegments.length - 1] = previous + segment;
      } else {
        wordSegments.push(segment);
      }
    }

    let selectedValueIdx = 0;
    let charIdx = 0;
    let segmentIdx = 0;
    let segmentChars = "";
    const groups = [{ chars: new Array<{
      char: string;
      charIdx: number;
      reading: Array<{
        kana: KanaChar;
        romaji: string;
        selectedValueIdx: number | null;
      }>;
    }>() }];

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

  private readonly remainingKana: Set<KanaChar> = new Set();
  private readonly usedKana: Set<KanaChar> = new Set();

  private readonly WordlistSchema = type({
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
    console.log(this.selectedKanaInputFocused());
  }

  protected goNextInput() {
    this.selectedKanaInputFocused.update(i => {
      const last = this.selectedKanaValues().length - 1;
      if (i >= last) {
        return last;
      }
      return i + 1;
    });
    console.log(this.selectedKanaInputFocused());
  }

  private async fetchWords(selectedKana: Set<KanaChar>) {
    return pipe(
      await fetch("/assets/wordlist.zst").then(r => r.arrayBuffer()),
      b => new Uint8Array(b),
      decompress,
      d => new TextDecoder().decode(d),
      JSON.parse,
      this.WordlistSchema.assert,
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
}
