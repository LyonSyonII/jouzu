// Greatly inspired by https://dev.to/playfulprogramming-angular/dark-mode-with-analog-tailwind-4049

import { DOCUMENT } from "@angular/common";
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  signal,
  afterNextRender,
} from "@angular/core";

export type Theme = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _document = inject(DOCUMENT);
  private _theme = signal<Theme>("light");
  public theme = this._theme.asReadonly();

  constructor() {
    afterNextRender(() => {
      const isDark = this._document.documentElement.classList.contains("dark");
      this._theme.set(isDark ? "dark" : "light");
    });
  }

  public toggleDarkMode(): void {
    const nextTheme = this._theme() === "dark" ? "light" : "dark";
    this._theme.set(nextTheme);
    if (nextTheme === "dark") {
      this._document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      this._document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  public isDarkMode(): boolean {
    return this._theme() === "dark";
  }
}
