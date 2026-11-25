import { site } from "@/lib/site";
import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { headerProfiles, navLinks } from "./links";

/** Avatar and name, linked to `/` by the layout. */
function BrandTitle() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={site.author.avatar}
        alt=""
        width={28}
        height={28}
        sizes="28px"
        priority
        className="size-7 rounded-full ring-1 ring-border"
      />
      <span className="font-heading text-[0.9375rem] font-semibold tracking-tight">
        {site.name}
      </span>
    </span>
  );
}

/** The header: the name, the pages in `navLinks`, then `headerProfiles` as icons. */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <BrandTitle />,
      // Glass: the hero runs under the header. Tint and blur are in `global.css`.
      transparentMode: "always",
    },
    links: [
      ...navLinks.map((link): LinkItemType => ({
        text: link.label,
        url: link.href,
        active: "nested-url",
      })),
      ...headerProfiles.map(({ label, href, icon: Icon }): LinkItemType => ({
        type: "icon",
        text: label,
        label,
        url: href,
        icon: <Icon />,
        external: true,
      })),
    ],
  };
}
