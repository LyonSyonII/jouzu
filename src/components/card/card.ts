import { booleanAttribute, Component, input, ViewEncapsulation } from "@angular/core";
import { DividerModule } from "primeng/divider";

@Component({
  selector: "x-card",
  imports: [DividerModule],
  templateUrl: "./card.html",
  styleUrl: "./card.scss",
  encapsulation: ViewEncapsulation.Emulated
})
export class Card {
  header = input<string>();
  divider = input(true, {transform: booleanAttribute});
}
