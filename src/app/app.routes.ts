import { DOCUMENT } from "@angular/common";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./routes/root/root.route"),
  },
  {
    path: "kana",
    loadComponent: () => import("./routes/kana-game/kana-game.route"),
    resolve: {
      selectedKana: async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const document = inject(DOCUMENT);
        const { kanaGameResolver } = await import("./routes/kana-game/kana-game.resolver");
        return kanaGameResolver(document, route, state);
      },
    },
  },
];
