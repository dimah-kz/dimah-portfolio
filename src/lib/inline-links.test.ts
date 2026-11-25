import { describe, expect, it } from "vitest";
import { parseInlineLinks } from "./inline-links";

describe("parseInlineLinks", () => {
  it("keeps text without links as one part", () => {
    expect(parseInlineLinks("Just text.")).toEqual([
      { type: "text", value: "Just text." },
    ]);
  });

  it("splits text around a link", () => {
    expect(
      parseInlineLinks("I lead engineering at [Nothing](https://nothing.pub)."),
    ).toEqual([
      { type: "text", value: "I lead engineering at " },
      { type: "link", label: "Nothing", href: "https://nothing.pub" },
      { type: "text", value: "." },
    ]);
  });

  it("reads several links, at the start and the end", () => {
    expect(parseInlineLinks("[A](https://a.dev) and [B](/blog/b)")).toEqual([
      { type: "link", label: "A", href: "https://a.dev" },
      { type: "text", value: " and " },
      { type: "link", label: "B", href: "/blog/b" },
    ]);
  });

  it("reads links in right-to-left copy", () => {
    expect(
      parseInlineLinks("در [Nothing](https://nothing.pub)، دپارتمان"),
    ).toEqual([
      { type: "text", value: "در " },
      { type: "link", label: "Nothing", href: "https://nothing.pub" },
      { type: "text", value: "، دپارتمان" },
    ]);
  });

  it("leaves other brackets and unsafe targets as text", () => {
    const text = "Use [this](javascript:alert(1)) or [that] (https://x.dev).";
    expect(parseInlineLinks(text)).toEqual([{ type: "text", value: text }]);
  });
});
