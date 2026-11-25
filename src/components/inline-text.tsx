import { Link } from "@/i18n/navigation";
import { parseInlineLinks } from "@/lib/inline-links";

const linkClass =
  "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

/**
 * Copy with links written `[label](href)`, such as a timeline step or a role's
 * summary. A path (`/blog/my-post`) stays in the visitor's language; a URL
 * opens in a new tab.
 */
export function InlineText({ text }: { text: string }) {
  return parseInlineLinks(text).map((part, index) => {
    if (part.type === "text") return part.value;
    if (part.href.startsWith("/")) {
      return (
        <Link key={index} href={part.href} className={linkClass}>
          {part.label}
        </Link>
      );
    }
    return (
      <a
        key={index}
        href={part.href}
        {...(part.href.startsWith("mailto:")
          ? {}
          : { target: "_blank", rel: "noreferrer" })}
        className={linkClass}
      >
        {part.label}
      </a>
    );
  });
}
