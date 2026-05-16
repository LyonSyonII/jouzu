import { RomanizePipe } from "@/libs/pipes/romanize.pipe";
import { storage } from "@/libs/signals/storage.signal";
import { Component, input } from "@angular/core";
import BaseComponent from "@components/base.component";
import { Card } from "@components/card/card.component";
import { kanaGameKeys } from "@shared/idb-keys";
import { Kana, KanaChar } from "@shared/japanese";
import { AngularSvgIconModule } from "angular-svg-icon";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "x-kana-game",
  imports: [
    ButtonModule,
    Card,
    RomanizePipe,
    AngularSvgIconModule,
  ],
  templateUrl: "./kana-game.route.html",
  styleUrl: "./kana-game.route.scss",
})
export default class KanaGame extends BaseComponent {
  selectedKana = input.required<KanaChar[]>();
}