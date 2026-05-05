import { Component, inject } from "@angular/core";
import { ThemeService } from "@libs/theme/theme";
import { PrimeIcons } from "primeng/api";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { TooltipModule } from "primeng/tooltip";
import { DividerModule } from "primeng/divider";
import { Card } from "@libs/components/card/card";

@Component({
  selector: "app-root",
  imports: [Card, DividerModule, PanelModule, TooltipModule, PanelModule, ButtonModule, CardModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly themeService = inject(ThemeService);
}