// Greatly inspired by https://dev.to/playfulprogramming-angular/dark-mode-with-analog-tailwind-4049

import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { inject, Injectable, PLATFORM_ID, RendererFactory2, signal, effect } from "@angular/core";

export type Theme = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _platformId = inject(PLATFORM_ID);
  private _renderer = inject(RendererFactory2).createRenderer(null, null);
  private _document = inject(DOCUMENT);

  private _theme = signal<Theme>("light");
  public theme = this._theme.asReadonly();

  constructor() {
    this.syncThemeFromLocalStorage();

    effect(() => {
      const currentTheme = this._theme();

      if (currentTheme === "dark") {
        this._renderer.addClass(this._document.documentElement, "dark");
      } else {
        this._renderer.removeClass(this._document.documentElement, "dark");
      }
    });
  }

  private syncThemeFromLocalStorage(): void {
    if (isPlatformBrowser(this._platformId)) {
      const storedTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
      this._theme.set(storedTheme);
    }
  }

  public toggleDarkMode(): void {
    if (isPlatformBrowser(this._platformId)) {
      const newTheme = this._theme() === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      this._theme.set(newTheme);
    }
  }

  public isDarkMode(): boolean {
    return this._theme() === "dark";
  }
}
