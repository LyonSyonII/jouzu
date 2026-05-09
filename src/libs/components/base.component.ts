import { inject } from "@angular/core";
import { ThemeService } from "@services/theme";
import { PrimeIcons } from "primeng/api";

export default class BaseComponent {
  protected readonly console = console;
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly themeService = inject(ThemeService);


  /**
   * For use in Angular's html templates, to ensure type safety in let-
   */
  protected as<T>(): (any: any) => T {
    return (any) => any as T
  }
}