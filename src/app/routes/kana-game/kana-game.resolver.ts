// string-payload.resolver.ts
import { storage } from "@/libs/signals/storage.signal";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { kanaGameKeys } from "@shared/idb-keys";
import {
  hiraganaDakutenChars,
  hiraganaHandakutenChars,
  hiraganaYouonChars,
  KanaChar,
  katakanaDakutenChars,
  katakanaHandakutenChars,
  katakanaYouonChars,
} from "@shared/japanese";

export async function kanaGameResolver(
  document: Document,
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
): Promise<KanaChar[]> {
  await loadFullNotoSansJp(document);

  const selected = await storage.get(kanaGameKeys.selectedKana, new Set<KanaChar>(), {
    clone: true,
  });
  const dakutenSelected = await storage.get(kanaGameKeys.dakutenSelected, false);
  const handakutenSelected = await storage.get(kanaGameKeys.handakutenSelected, false);
  const youonSelected = await storage.get(kanaGameKeys.youonSelected, false);

  // Add kana variants based on currently selected chars + toggles
  const dakutenChars = dakutenSelected
    ? ([...hiraganaDakutenChars, ...katakanaDakutenChars] as const)
    : ([] as const);
  const handakutenChars = handakutenSelected
    ? ([...hiraganaHandakutenChars, ...katakanaHandakutenChars] as const)
    : ([] as const);
  for (const variant of [...dakutenChars, ...handakutenChars]) {
    if (variant === null) continue;
    const base = variant.normalize("NFD")[0] as KanaChar;
    if (selected.has(base)) selected.add(variant);
  }
  if (youonSelected) {
    for (const youon of [...hiraganaYouonChars, ...katakanaYouonChars]) {
      if (youon === null) continue;
      const base = youon[0] as KanaChar;
      const small = String.fromCharCode(youon[1].charCodeAt(0) + 1) as KanaChar;
      if (selected.has(base) && selected.has(small)) selected.add(youon);
    }
  }

  return [...selected];
}

let fullNotoSansJpLoad: Promise<void> | null = null;

function loadFullNotoSansJp(document: Document): Promise<void> {
  if (document.defaultView === null) return Promise.resolve();

  if (fullNotoSansJpLoad) return fullNotoSansJpLoad;

  fullNotoSansJpLoad = new Promise(resolve => {
    const existing = document.getElementById("noto-sans-jp-full");
    if (existing) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.id = "noto-sans-jp-full";
    link.rel = "stylesheet";
    link.href = "assets/noto-sans-jp/wght.css";
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.append(link);
  });

  return fullNotoSansJpLoad;
}
