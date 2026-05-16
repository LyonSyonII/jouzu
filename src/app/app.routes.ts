import { Routes } from "@angular/router";
import { kanaGameResolver } from "./routes/kana-game/kana-game.resolver";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./routes/root/root.route")
  },
  {
    path: 'kana',
    loadComponent: () => import("./routes/kana-game/kana-game.route"),
    resolve: {
      selectedKana: kanaGameResolver
    }
  }
];
