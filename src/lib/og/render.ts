import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { render, type RenderInput, type RenderOptions } from "takumi-js";

/** Every share image is 1200×630, the size Open Graph and X expect. */
export const ogSize = { width: 1200, height: 630 } as const;

/** One family name for the card. Each file serves its own script. */
export const ogFontFamily = "Site Sans";

const fontsDir = join(process.cwd(), "src/lib/og/fonts");

// Read once at module scope, so prerendering does no I/O per image. These are
// the files `next/font` serves the site (see `src/app/fonts.ts`): Inter for
// Latin, Vazirmatn for Persian and Arabic. Registered without a weight, a
// variable font keeps its axes, so `fontWeight` picks any weight from 100 to 900.
const readFont = (file: string) => readFile(join(fontsDir, file));
const [interLatin, interLatinExt, vazirmatnArabic] = await Promise.all([
  readFont("inter-latin.woff2"),
  readFont("inter-latin-ext.woff2"),
  readFont("vazirmatn-arabic.woff2"),
]);

const fonts = [
  {
    name: ogFontFamily,
    data: vazirmatnArabic,
    unicodeRange: [
      [0x0600, 0x06ff],
      [0x0750, 0x077f],
      [0x0870, 0x08ff],
      [0x200c, 0x200e],
      [0xfb50, 0xfdff],
      [0xfe70, 0xfefc],
    ],
  },
  {
    name: ogFontFamily,
    data: interLatin,
    unicodeRange: [
      [0x0000, 0x00ff],
      [0x0131, 0x0131],
      [0x0152, 0x0153],
      [0x02bb, 0x02bc],
      [0x02c6, 0x02c6],
      [0x02da, 0x02da],
      [0x02dc, 0x02dc],
      [0x2000, 0x200b],
      [0x2010, 0x206f],
      [0x20ac, 0x20ac],
      [0x2122, 0x2122],
      [0x2212, 0x2215],
    ],
  },
  {
    name: ogFontFamily,
    data: interLatinExt,
    unicodeRange: [
      [0x0100, 0x024f],
      [0x1e00, 0x1eff],
      [0x20a0, 0x20cf],
      [0x2c60, 0x2c7f],
      [0xa720, 0xa7ff],
    ],
  },
] satisfies RenderOptions["fonts"];

/**
 * Renders a share card to a PNG response. Takumi shapes Persian and
 * mixed-direction text correctly, which `next/og` (Satori) does not.
 * The routes are static, so each image renders once, at build.
 */
export async function ogImageResponse(element: RenderInput): Promise<Response> {
  const image = await render(element, { ...ogSize, fonts });

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=0, s-maxage=31536000, must-revalidate",
    },
  });
}
