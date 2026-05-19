import { Routes } from "@angular/router";
import { kanaGameResolver } from "./routes/kana-game/kana-game.resolver";
import Root from "./routes/root/root.route";

export const routes: Routes = [
  {
    path: '',
    component: Root,
  },
  {
    path: 'kana',
    loadComponent: () => import("./routes/kana-game/kana-game.route"),
    resolve: {
      selectedKana: kanaGameResolver
    }
  }
];
