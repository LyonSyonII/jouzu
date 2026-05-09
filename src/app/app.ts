import { Component, inject, signal } from "@angular/core";
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
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly themeService = inject(ThemeService);

  protected readonly romanizeTooltip: TooltipOptions = {
    tooltipPosition: "top",
    tooltipStyleClass: "romanize-tooltip",
  };

  // TODO: Remove specific rows for dakuten and combined, and add "toggle dakuten" + "toggle combined" buttons
  // TODO: Add "random" button
  protected readonly hiragana = enumerateRowsChars(hiragana, 11);
  protected readonly katakana = enumerateRowsChars(katakana, 11);
  protected readonly selectedCharacters = signal(new Set<KanaChar>());
}

function enumerateRowsChars(rows: Record<string, readonly (KanaChar | null)[]>, endRow?: number) {
   return Object.values(rows).slice(0, endRow).map((row, i) => ({
    row: row.map((char, j) => ({ char, j })),
    i,
  }));
}
