/** A run of plain text, or a link written `[label](href)` in copy. */
export type InlinePart =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

/** `[label](href)`, where `href` is a URL, `mailto:`, or a path from `/`. */
const linkPattern = /\[([^\]]+)\]\(((?:https?:\/\/|mailto:|\/)[^\s)]*)\)/g;

/**
 * Splits copy into text and links, so a sentence in `site.ts` or a role's
 * `summary` can link a name: `I lead engineering at [Nothing](https://nothing.pub).`
 * Anything that is not a well-formed link stays text.
 */
export function parseInlineLinks(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let index = 0;

  for (const match of text.matchAll(linkPattern)) {
    const [whole, label, href] = match;
    if (match.index > index) {
      parts.push({ type: "text", value: text.slice(index, match.index) });
    }
    parts.push({ type: "link", label, href });
    index = match.index + whole.length;
  }

  if (index < text.length) {
    parts.push({ type: "text", value: text.slice(index) });
  }
  return parts;
}
