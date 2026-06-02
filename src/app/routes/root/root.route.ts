import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TooltipOptions } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { ToggleButtonModule } from "primeng/togglebutton";
import { TooltipModule } from "primeng/tooltip";
import { DividerModule } from "primeng/divider";
import { CheckboxModule } from "primeng/checkbox";
import { Card } from "@components/card/card.component";
import {
  hiragana,
  katakana,
  KanaChar,
  fromKatakana,
  fromHiragana,
  Romaji,
  KanaTable,
  KanaToRomajiMap,
} from "@shared/japanese";
import { FormsModule } from "@angular/forms";
import { storage } from "@/libs/signals/storage.signal";
import BaseComponent from "@components/base.component";
import { RomanizePipe } from "../../../libs/pipes/romanize.pipe";
import { AngularSvgIconModule } from "angular-svg-icon";
import { QuicklinkDirective } from "ngx-quicklink";
import { RouterLink } from "@angular/router";
import { kanaGameKeys } from "@shared/idb-keys";
import { ThemeService } from "@services/theme.service";
import { Nav } from "@components/nav/nav.component";

@Component({
  selector: "x-root",
  templateUrl: "./root.route.html",
  styleUrl: "./root.route.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    Card,
    ToggleButtonModule,
    TooltipModule,
    CheckboxModule,
    FormsModule,
    RomanizePipe,
    AngularSvgIconModule,
    QuicklinkDirective,
    RouterLink,
    Nav,
  ],
})
export default class Root extends BaseComponent {
  // TODO: Add "random" button
  protected readonly themeService = inject(ThemeService);

  protected readonly hiragana = this.enumerateRowsChars(hiragana, fromHiragana, 11);
  protected readonly katakana = this.enumerateRowsChars(katakana, fromKatakana, 11);

  protected readonly selectedKana = storage(kanaGameKeys.selectedKana, new Set<KanaChar>());
  protected readonly dakutenSelected = storage(kanaGameKeys.dakutenSelected, false);
  protected readonly handakutenSelected = storage(kanaGameKeys.handakutenSelected, false);
  protected readonly youonSelected = storage(kanaGameKeys.youonSelected, false);

  protected readonly romanizeTooltip: TooltipOptions = {
    tooltipPosition: "top",
    tooltipStyleClass: "romanize-tooltip",
  };

  protected readonly kanaGroups = [
    { name: "ひらがな", rows: this.hiragana },
    { name: "カタカナ", rows: this.katakana },
  ] as const;
  protected readonly kanaExtraToggles = [
    { icon: "dakuten", tooltip: "dakuten", signal: this.dakutenSelected },
    { icon: "handakuten", tooltip: "handakuten", signal: this.handakutenSelected },
    { icon: "youon", tooltip: "yōon", signal: this.youonSelected },
  ] as const;
  protected readonly togglebuttonIconStates = ["on", "off"] as const;

  protected toggleCharacter(char: KanaChar) {
    this.selectedKana.update(selected => {
      if (selected.has(char)) selected.delete(char);
      else selected.add(char);
    });
  }

  protected toggleRow(row: readonly { char: KanaChar | null }[], fully: boolean) {
    this.selectedKana.update(selected => {
      for (const { char } of row) {
        if (char === null) continue;
        if (fully) selected.delete(char);
        else selected.add(char);
      }
    });
  }

  protected isSelected(char: KanaChar) {
    return this.selectedKana().has(char);
  }

  protected isRowFullySelected(row: readonly { char: KanaChar | null }[]) {
    return row.every(({ char }) => char === null || this.selectedKana().has(char));
  }

  protected isRowPartiallySelected(row: readonly { char: KanaChar | null }[]) {
    return row.some(({ char }) => char !== null && this.selectedKana().has(char));
  }

  private enumerateRowsChars<C extends KanaChar>(
    rows: KanaTable<C>,
    toRomaji: KanaToRomajiMap<C>,
    endRow?: number,
  ): KanaRow<C>[] {
    return Object.values(rows)
      .slice(0, endRow)
      .map((row, i) => ({
        i,
        row: row.map((char, j) => ({ j, char, romaji: char ? toRomaji[char] : null })),
      }));
  }

}

interface KanaCell<C extends KanaChar> {
  j: number;
  char: C | null;
  romaji: Romaji | null;
}

interface KanaRow<C extends KanaChar> {
  i: number;
  row: KanaCell<C>[];
}
