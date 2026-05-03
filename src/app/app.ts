import { isPlatformBrowser } from "@angular/common";
import { afterNextRender, Component, DOCUMENT, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PrimeIcons } from "primeng/api";
import { BaseComponent } from "primeng/basecomponent";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-root",
  imports: [ButtonModule, CardModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected darkMode: boolean = false;
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode = this.document.documentElement.classList.contains("dark-mode");

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        this.applyTheme(e.matches);
      });
    }
  }

  protected toggleDarkMode() {
    this.applyTheme(!this.darkMode);
  }

  private applyTheme(isDark: boolean) {
    this.darkMode = isDark;

    localStorage.setItem("theme-preference", isDark ? "dark" : "light");

    if (isDark) {
      this.document.documentElement.classList.add("dark-mode");
    } else {
      this.document.documentElement.classList.remove("dark-mode");
    }
  }
}
