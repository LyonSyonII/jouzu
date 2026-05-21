import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  resource,
  ResourceLoaderParams,
  signal,
} from "@angular/core";
import BaseComponent from "@components/base.component";
import { Card } from "@components/card/card.component";
import { KanaChar, KanaCharArkType, romanize } from "@shared/japanese";
import { AngularSvgIconModule } from "angular-svg-icon";
import { Skeleton } from "primeng/skeleton";
import { Nav } from "@components/nav/nav.component";
import { decompress } from "fzstd";
import { filter, map, pipe, sort } from "remeda";
import { type } from "arktype";
import { InputText } from "primeng/inputtext";
import { FitTextDirective } from "@/libs/directives/fit-text.directive";

@Component({
  selector: "x-kana-game",
  templateUrl: "./kana-game.route.html",
  styleUrl: "./kana-game.route.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, AngularSvgIconModule, Nav, Skeleton, InputText, FitTextDirective],
})
export default class KanaGame extends BaseComponent {
  public readonly selectedKana = input.required<KanaChar[]>();
  protected readonly words = resource({
    params: this.selectedKana,
    loader: ({params}) => this.fetchWords(params),
  });
  protected readonly currentWord = linkedSignal(() => {
    if (this.words.hasValue()) {
      const { word } = this.words.value()[2115];
      console.log(this.words.value());
      return word;
    }
    return null;
  });
  protected readonly currentWordRomaji = computed(() => {
    if (this.currentWord() === null) return [];
    const selectedKana = this.selectedKana();
    return (
      this.currentWord()?.chars.map((char) =>
        char.reading.map(kana => selectedKana.includes(kana) ? "_" : romanize(kana)).join("")
      ) ?? []
    );
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
    })
  }

  private async fetchWords(selectedKana: KanaChar[]) {
    return pipe(
      await fetch("/assets/wordlist.zst").then((r) => r.arrayBuffer()),
      (b) => new Uint8Array(b),
      decompress,
      (d) => new TextDecoder().decode(d),
      (text) => JSON.parse(text) as unknown,
      (json) => {
        return this.WordlistSchema.assert(json);
      },
      map((word) => {
        let score = 0;
        for (const char of word.chars) {
          const reading = typeof char === "string" ? char : char.reading;
          for (const kana of selectedKana) {
            if (reading.includes(kana)) score += 1;
          }
        }
        return {
          word,
          score,
        };
      }),
      filter(({ score }) => score > 0),
      sort((a, b) => {
        if (a.word.reading.length !== b.word.reading.length) {
          return a.word.reading.length - b.word.reading.length;
        }
        return b.score - a.score;
      }),
    );
  }
}
