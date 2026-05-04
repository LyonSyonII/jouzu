import { Component, DOCUMENT, inject, PLATFORM_ID } from "@angular/core";
import { ThemeService } from "@libs/theme/theme";
import { PrimeIcons } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-root",
  imports: [ButtonModule, CardModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly themeService = inject(ThemeService);
}
