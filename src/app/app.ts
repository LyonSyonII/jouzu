import BaseComponent from "@components/base.component";
import { Component } from "@angular/core";
import { ToastModule } from "primeng/toast";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "x-app",
  template: `
    <router-outlet />
    <p-toast />
  `,
  imports: [ToastModule, RouterOutlet]
})
export class App extends BaseComponent {}
