import { Component, computed, inject, signal } from "@angular/core";
import { ThemeService } from "@services/theme";
import { PrimeIcons, TooltipOptions } from "primeng/api";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { ToggleButtonModule } from "primeng/togglebutton";
import { PanelModule } from "primeng/panel";
import { TooltipModule } from "primeng/tooltip";
import { DividerModule } from "primeng/divider";
import { ToastModule } from "primeng/toast";
import { CheckboxModule } from "primeng/checkbox";
import { SelectModule } from "primeng/select";
import { Card } from "@components/card/card";
import { hiragana, KanaChar, katakana } from "@/libs/japanese";
import { FormsModule } from "@angular/forms";
import { NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [
    ButtonModule,
    Card,
    CardModule,
    DividerModule,
    PanelModule,
    PanelModule,
    SelectModule,
    ToastModule,
    ToggleButtonModule,
    TooltipModule,
    CheckboxModule,
    FormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly console = console;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly themeService = inject(ThemeService);

  protected readonly romanizeTooltip: TooltipOptions = {
    tooltipPosition: "top",
    tooltipStyleClass: "romanize-tooltip",
  };

  // TODO: Remove specific rows for dakuten and combined, and add "toggle dakuten" + "toggle combined" buttons
  // TODO: Add "random" button
  protected readonly hiragana = this.enumerateRowsChars(hiragana, 11);
  protected readonly katakana = this.enumerateRowsChars(katakana, 11);

  protected readonly selectedCharacters = signal(new Set<KanaChar>());
  protected readonly hiraganaSelected = computed(() => {
    const selectedChars = this.selectedCharacters();
    return this.getRowsWithSelected(selectedChars, this.hiragana);
  });
  protected readonly katakanaSelected = computed(() => {
    const selectedChars = this.selectedCharacters();
    return this.getRowsWithSelected(selectedChars, this.katakana);
  });
  protected readonly asSelectedChars = (value: any) => value as ReturnType<typeof this.getRowsWithSelected>;

  protected toggleCharacter(char: KanaChar) {
    this.selectedCharacters.update((chars) => {
      if (chars.has(char)) chars.delete(char);
      else chars.add(char);
      return new Set<KanaChar>(chars);
    });
  }

  protected toggleRow(row: readonly { char: KanaChar | null }[], fully: boolean) {
    this.selectedCharacters.update((chars) => {
      for (const { char } of row) {
        if (char === null) continue;
        if (fully) chars.delete(char);
        else chars.add(char);
      }
      return new Set(chars);
    });
  }

  private enumerateRowsChars(rows: Record<string, readonly (KanaChar | null)[]>, endRow?: number) {
    return Object.values(rows)
      .slice(0, endRow)
      .map((row, i) => ({
        i,
        row: row.map((char, j) => ({ j, char })),
      }));
  }

  private getRowsWithSelected(selectedChars: Set<KanaChar>, rows: typeof this.hiragana) {
    return rows.map((row) => ({
      ...row,
      row: this.getRowWithSelected(selectedChars, row.row),
    }));
  }

  private getRowWithSelected(
    selectedChars: Set<KanaChar>,
    row: (typeof this.hiragana)[number]["row"],
  ) {
    const result = {
      partial: false,
      fully: true,
      chars: new Array<(typeof this.hiragana)[number]["row"][number] & { selected: boolean }>(),
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
