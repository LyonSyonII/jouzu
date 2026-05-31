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
import { RomanizePipe } from "../../../libs/pipes/romanize.pipe";

@Component({
  selector: "x-kana-game",
  templateUrl: "./kana-game.route.html",
  styleUrl: "./kana-game.route.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, AngularSvgIconModule, Nav, Skeleton, KanaGameInput, RomanizePipe],
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
    const { word } = this.words.value()[14][0];
    console.log("Chosen:", word);
    return word;
  });

  protected readonly currentWordDisplay = computed(() => {
    const currentWord = this.currentWord();
    if (currentWord === null) return null;
    const selectedKana = this.selectedKana();
    const chars = currentWord.chars;
    let selectedValueIdx = 0;
    return chars.map(({ word: char, reading }) => ({
      char,
      reading: reading.map(kana => ({
        kana,
        romaji: romanize(kana),
        selectedValueIdx: selectedKana.has(kana) ? selectedValueIdx++ : null,
      })),
    }));
  });

  protected readonly selectedKanaValues = linkedSignal(() => {
    const currentWordDisplay = this.currentWordDisplay();
    if (currentWordDisplay === null) return [];
    return pipe(
      currentWordDisplay,
      flatMap(char => char.reading),
      filter(kana => kana.selectedValueIdx !== null),
      map(_ => ""),
    );
  });
  protected readonly selectedKanaInputFocused = signal(0);

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
