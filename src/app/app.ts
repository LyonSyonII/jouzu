import BaseComponent from "@components/base.component";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ToastModule } from "primeng/toast";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "x-app",
  template: `
    <router-outlet />
    @defer (on idle) {
      <p-toast />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToastModule, RouterOutlet],
})
export class App extends BaseComponent {}
