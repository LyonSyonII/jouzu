import { Component, Directive, DOCUMENT, inject, PLATFORM_ID } from "@angular/core";
import { ThemeService } from "@libs/theme/theme";
import { MenuItem, PrimeIcons } from "primeng/api";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { MenubarModule } from "primeng/menubar";
import { MultiSelectModule } from "primeng/multiselect";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-root",
  imports: [TooltipModule, MenubarModule, PanelModule, ButtonModule, ToggleButtonModule, ToggleSwitchModule, CardModule, MultiSelectModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly themeService = inject(ThemeService);

  protected asMenuItem = (item: any): MenuItem => item as MenuItem;
  protected readonly navItems: MenuItem[] = [
    {
      label: "かな・カナ",
      tooltip: "kana",
      tooltipOptions: {
        hideDelay: 90000,
        tooltipPosition: "bottom",
        tooltipStyleClass: "tooltip",
      }
    },
    {
      label: "",
    },
  ];
}