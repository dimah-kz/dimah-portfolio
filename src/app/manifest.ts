import { defaultLocale, localeConfig } from "@/i18n/locales";
import { site, siteCopy } from "@/lib/site";
import type { MetadataRoute } from "next";

/** Icons are `src/app/icon.png` (512×512) and `src/app/apple-icon.png` (180×180). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: siteCopy(defaultLocale).description,
    id: "/",
    lang: defaultLocale,
    dir: localeConfig[defaultLocale].dir,
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
