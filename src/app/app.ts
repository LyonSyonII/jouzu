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
      const html = this.document.documentElement;
      this.darkMode = html.classList.contains("dark-mode");
    }
  }

  protected toggleDarkMode() {
    this.document.body.classList.add("theme-transition");

    this.darkMode = !this.darkMode;
    const html = this.document.documentElement;

    if (this.darkMode) {
      html.classList.add("dark-mode");
      html.classList.remove("light-mode");
      localStorage.setItem("theme-preference", "dark");
    } else {
      html.classList.remove("dark-mode");
      html.classList.add("light-mode");
      localStorage.setItem("theme-preference", "light");
    }
  }
}
