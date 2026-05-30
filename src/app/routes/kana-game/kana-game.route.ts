import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  resource,
} from "@angular/core";
import BaseComponent from "@components/base.component";
import { Card } from "@components/card/card.component";
import { KanaChar, KanaCharArkType, romanize } from "@shared/japanese";
import { AngularSvgIconModule } from "angular-svg-icon";
import { Skeleton } from "primeng/skeleton";
import { Nav } from "@components/nav/nav.component";
import { decompress } from "fzstd";
import { filter, groupBy, map, pipe, sort, sortBy, unique, values } from "remeda";
import { type } from "arktype";
import { FitTextDirective } from "@/libs/directives/fit-text.directive";

@Component({
  selector: "x-kana-game",
  templateUrl: "./kana-game.route.html",
  styleUrl: "./kana-game.route.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, AngularSvgIconModule, Nav, Skeleton, FitTextDirective],
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
    return chars.map(({ word: char, reading }) => ({
      char,
      reading: reading.map(kana => ({ kana, romaji: selectedKana.has(kana) ? null : romanize(kana) })),
    }));
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
