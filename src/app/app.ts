import BaseComponent from "@components/base.component";
import { Component } from "@angular/core";
import { Root } from "./routes/root/root.route";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "x-app",
  template: `
    <x-root />
    <p-toast />
  `,
  imports: [Root, ToastModule]
})
export class App extends BaseComponent {}
