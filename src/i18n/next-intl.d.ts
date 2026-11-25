import type { formats } from "./formats";
import type { Locale } from "./locales";
import type { Messages } from "./messages";

// Typed `useTranslations`, `useLocale`, and `useFormatter`.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: Messages;
    Formats: typeof formats;
  }
}
