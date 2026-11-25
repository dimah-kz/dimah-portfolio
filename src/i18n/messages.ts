import type en from "../../messages/en.json";
import type { Locale } from "./locales";

/** The shape every language's messages follow: `messages/en.json`. */
export type Messages = typeof en;

/**
 * Interface labels per language, loaded on demand. Each file must have every
 * key of `en.json`: a missing one is a type error here.
 */
const loaders = {
  en: () => import("../../messages/en.json"),
  fa: () => import("../../messages/fa.json"),
} satisfies Record<Locale, () => Promise<{ default: Messages }>>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  return (await loaders[locale]()).default;
}
