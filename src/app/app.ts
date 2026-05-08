import { Component, inject } from "@angular/core";
import { ThemeService } from "@services/theme";
import { PrimeIcons, TooltipOptions } from "primeng/api";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { TooltipModule } from "primeng/tooltip";
import { DividerModule } from "primeng/divider";
import { ToastModule } from "primeng/toast";
import { SelectModule } from "primeng/select";
import { Card } from "@components/card/card";

@Component({
  selector: "app-root",
  imports: [
    Card,
    DividerModule,
    SelectModule,
    PanelModule,
    TooltipModule,
    PanelModule,
    ButtonModule,
    CardModule,
    ToastModule,
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
}
