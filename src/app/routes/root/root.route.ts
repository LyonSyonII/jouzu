import { Component, computed, signal } from "@angular/core";
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
  romanize,
  katakanaDakutenChars,
  katakanaHandakutenChars,
  katakanaYouonChars,
  hiraganaDakutenChars,
  hiraganaHandakutenChars,
  hiraganaYouonChars,
} from "@shared/japanese";
import { FormsModule } from "@angular/forms";
import { storage } from "@/libs/signals/storage.signal";
import BaseComponent from "@components/base.component";
import { RomanizePipe } from "../../../libs/pipes/romanize.pipe";
import { AngularSvgIconModule } from "angular-svg-icon";

@Component({
  selector: "x-root",
  imports: [
    ButtonModule,
    Card,
    DividerModule,
    ToggleButtonModule,
    TooltipModule,
    CheckboxModule,
    FormsModule,
    RomanizePipe,
    AngularSvgIconModule,
  ],
  templateUrl: "./root.route.html",
  styleUrl: "./root.route.scss",
})
export class Root extends BaseComponent {
  // TODO: Remove specific rows for dakuten and combined, and add "toggle dakuten" + "toggle combined" buttons
  // TODO: Add "random" button
  protected readonly hiragana = this.enumerateRowsChars(hiragana, fromHiragana, 11);
  protected readonly katakana = this.enumerateRowsChars(katakana, fromKatakana, 11);

  protected readonly selectedKana = storage("selected-kana", new Set<KanaChar>());
  protected readonly hiraganaSelected = computed(() =>
    this.getRowsWithSelected(this.selectedKana(), this.hiragana),
  );
  protected readonly katakanaSelected = computed(() =>
    this.getRowsWithSelected(this.selectedKana(), this.katakana),
  );
  protected readonly dakutenSelected = signal(false);
  protected readonly handakutenSelected = signal(false);
  protected readonly youonSelected = signal(false);
  
  protected readonly romanize = romanize;
  protected readonly romanizeTooltip: TooltipOptions = {
    tooltipPosition: "top",
    tooltipStyleClass: "romanize-tooltip"
  };

  protected toggleCharacter(char: KanaChar) {
    this.selectedKana.update((selected) => {
      if (selected.has(char)) selected.delete(char);
      else selected.add(char);
      return new Set<KanaChar>(selected);
    });
  }

  protected toggleCharacters(chars: (KanaChar | null)[]) {
    this.selectedKana.update((selected) => {
      for (const char of chars) {
        if (char === null) continue;
        if (selected.has(char)) selected.delete(char);
        else selected.add(char);
      }
      console.log({selected});
      return new Set(selected);
    });
  }
  
  protected toggleCombination(chars: (KanaChar | null)[]) {
    this.selectedKana.update((selected) => {
      for (const char of chars) {
        if (char === null) continue;
        if (selected.has(char)) selected.delete(char);
        else selected.add(char);
      }
      console.log({selected});
      return new Set(selected);
    });
  }

  protected toggleRow(row: readonly { char: KanaChar | null }[], fully: boolean) {
    this.selectedKana.update((selected) => {
      for (const { char } of row) {
        if (char === null) continue;
        if (fully) selected.delete(char);
        else selected.add(char);
      }
      return new Set(selected);
    });
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

  private getRowsWithSelected<C extends KanaChar>(
    selectedChars: ReadonlySet<KanaChar>,
    rows: KanaRow<C>[],
  ): KanaRowSelection<C>[] {
    return rows.map((row) => ({
      ...row,
      row: this.getRowWithSelected(selectedChars, row.row),
    }));
  }

  private getRowWithSelected<C extends KanaChar>(
    selectedChars: ReadonlySet<KanaChar>,
    row: KanaCell<C>[],
  ) {
    const result = {
      partial: false,
      fully: true,
      chars: new Array<KanaCell<C> & { selected: boolean }>(),
    };

    for (const char of row) {
      if (char.char === null) {
        result.chars.push({ ...char, selected: true });
        continue;
      }
      const selected = selectedChars.has(char.char);
      result.chars.push({
        ...char,
        selected,
      });
      if (selected) result.partial = true;
      else result.fully = false;
    }

    return result;
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

interface KanaRowSelection<C extends KanaChar> {
  i: number;
  row: {
    partial: boolean;
    fully: boolean;
    chars: Array<KanaCell<C> & { selected: boolean }>;
  };
}
