// string-payload.resolver.ts
import { storage } from "@/libs/signals/storage.signal";
import { ResolveFn } from "@angular/router";
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

export const kanaGameResolver: ResolveFn<KanaChar[]> = async () => {
  const selected = await storage.get(kanaGameKeys.selectedKana, new Set<KanaChar>(), { clone: true });
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
};
