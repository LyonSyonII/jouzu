import { booleanAttribute, Component, input } from "@angular/core";
import { DividerModule } from "primeng/divider";

@Component({
  selector: "x-card",
  imports: [DividerModule],
  templateUrl: "./card.html",
  styleUrl: "./card.scss"
})
export class Card {
  header = input<string>();
  divider = input(true, {transform: booleanAttribute});
}
