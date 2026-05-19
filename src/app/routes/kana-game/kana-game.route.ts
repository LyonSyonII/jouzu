import { RomanizePipe } from "@/libs/pipes/romanize.pipe";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  resource,
  ResourceLoaderParams,
  signal,
} from "@angular/core";
import BaseComponent from "@components/base.component";
import { Card } from "@components/card/card.component";
import { KanaChar } from "@shared/japanese";
import { AngularSvgIconModule } from "angular-svg-icon";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton"
import { Nav } from "@components/nav/nav.component";
import { decompress } from "fzstd";
import { filter, map, pipe, sort } from "remeda";
import { ArkErrors, type } from "arktype";

@Component({
  selector: "x-kana-game",
  templateUrl: "./kana-game.route.html",
  styleUrl: "./kana-game.route.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, Card, RomanizePipe, AngularSvgIconModule, Nav, SkeletonModule],
})
export default class KanaGame extends BaseComponent {
  protected readonly selectedKana = input.required<KanaChar[]>();
  protected readonly words = resource({
    params: this.selectedKana,
    loader: this.fetchWords
  });
  protected readonly currentWord = signal<Word | null>(null);
  protected readonly remainingKana: Set<KanaChar> = new Set();
  protected readonly usedKana: Set<KanaChar> = new Set();

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
      if (this.words.hasValue()) {
        const { word } = this.words.value()[0];
        this.currentWord.set(word)
        console.log(this.words.value());
      }
    });
  }

  private async fetchWords({params: selectedKana}: ResourceLoaderParams<KanaChar[]>) {
    return pipe(
      await fetch("/assets/wordlist.zst").then((r) => r.arrayBuffer()),
      (b) => new Uint8Array(b),
      decompress,
      (d) => new TextDecoder().decode(d),
      (text) => JSON.parse(text) as unknown,
      WordlistSchema.assert,
      map(word => {
        let score = 0;
        for (const char of word.chars) {
          const reading = typeof char === "string" ? char : char.reading;
          for (const kana of selectedKana) {
            if (reading.includes(kana)) score += 1;
          }
        }
        return {
          word,
          score
        }
      }),
      filter(({ score }) => score > 0),
      sort((a, b) => {
        if (a.word.reading.length !== b.word.reading.length) {
          return a.word.reading.length - b.word.reading.length;
        }
        return b.score - a.score;
      })
    );
  }
}

const WordlistSchema = type({
  word: "string",
  reading: "string",
  accent: "string",
  romanization: "string",
  english: "string",
  chars: type("string").or({
    word: "string",
    reading: "string",
  }).array(),
}).array();
type Wordlist = typeof WordlistSchema.infer;
type Word = Wordlist[number];
type WordChar = Word["chars"][number];