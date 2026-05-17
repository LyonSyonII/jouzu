import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from "@angular/core";
import { TooltipOptions } from "primeng/api";
import { DividerModule } from "primeng/divider";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "x-card",
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DividerModule, TooltipModule],
})
export class Card {
  header = input<string>();
  divider = input(true, { transform: booleanAttribute });
  tooltip = input<{
    text: string;
    position?: "top" | "bottom" | "left" | "right";
    options?: TooltipOptions;
  }>();
}
