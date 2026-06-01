import { type } from "arktype";
import { kanaChars } from "./japanese";

export const KanaCharArkType = type.enumerated(...kanaChars);
