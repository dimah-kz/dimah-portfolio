import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { formats } from "./formats";
import { loadMessages } from "./messages";
import { routing } from "./routing";

/** next-intl's per-request config: the language comes from the `[locale]` segment. */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
    formats,
    // Dates are calendar days, rendered the same on the server and in the browser.
    timeZone: "UTC",
  };
});
