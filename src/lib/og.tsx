import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { generateOGImage } from "fumadocs-ui/og/takumi";
import { site } from "./site";

const avatar = await readFile(join(process.cwd(), "public/dimah-avatar.png"));
const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

const icon = (
  <div
    style={{
      display: "flex",
      width: 56,
      height: 56,
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    {/* Satori accepts <img>, not next/image. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={avatarSrc} width={56} height={56} alt="" />
  </div>
);

/** Gold sampled from `public/dimah-avatar.png`. */
const accent = "rgb(191, 159, 0)";

const card = {
  site: new URL(site.url).host,
  icon,
  primaryColor: accent,
  primaryTextColor: accent,
};

export function siteOgImage(title: string, description?: string) {
  return generateOGImage({ ...card, title, description });
}

export function siteOgImageWebp(title: string, description?: string) {
  return generateOGImage({ ...card, title, description, format: "webp" });
}
