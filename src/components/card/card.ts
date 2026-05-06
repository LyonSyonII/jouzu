import { booleanAttribute, Component, input, ViewEncapsulation } from "@angular/core";
import { TooltipOptions } from "primeng/api";
import { DividerModule } from "primeng/divider";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "x-card",
  imports: [DividerModule, TooltipModule],
  templateUrl: "./card.html",
  styleUrl: "./card.scss",
  encapsulation: ViewEncapsulation.Emulated,
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
