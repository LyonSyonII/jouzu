import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ThemeService } from "@services/theme.service";
import { ButtonModule } from "primeng/button";
import BaseComponent from "@components/base.component";

@Component({
  selector: "x-nav",
  template: `
    <nav>
      <h1>
        <ruby>上手<rt>じょうず</rt></ruby>
      </h1>

      <p-button
        ariaLabel="Toggle dark mode"
        size="large"
        [icon]="this.themeService.isDarkMode() ? PrimeIcons.SUN : PrimeIcons.MOON"
        (onClick)="themeService.toggleDarkMode()"
      />
    </nav>
  `,
  styles: `
    nav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;

      > h1 {
        margin: 0;
      }
    }
  `,
  // templateUrl: "./card.component.html",
  // styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule],
})
export class Nav extends BaseComponent {
  protected readonly themeService = inject(ThemeService);
}
