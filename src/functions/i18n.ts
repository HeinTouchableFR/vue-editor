import type { TranslationKey } from "@/types";
import { VisualEditor } from "@/VisualEditor";

export function t(key: TranslationKey): string {
  return VisualEditor.i18n[key];
}