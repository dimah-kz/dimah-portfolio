import { describe, expect, it } from "vitest";
import { markdownRoute, markdownUrl, pagePath } from "./markdown-url";

describe("markdownUrl", () => {
  it("adds .md to a page, and uses index.md for a home page", () => {
    expect(markdownUrl("/", "en")).toBe("/index.md");
    expect(markdownUrl("/", "fa")).toBe("/fa/index.md");
    expect(markdownUrl("/blog/post", "en")).toBe("/blog/post.md");
    expect(markdownUrl("/blog/post", "fa")).toBe("/fa/blog/post.md");
  });

  it("ignores a trailing slash", () => {
    expect(markdownUrl("/projects/", "en")).toBe("/projects.md");
  });
});

describe("markdownRoute", () => {
  it("names the internal route with its language", () => {
    expect(markdownRoute("/", "en")).toBe("/en/llms.mdx/index");
    expect(markdownRoute("/blog/post", "fa")).toBe("/fa/llms.mdx/blog/post");
  });
});

describe("pagePath", () => {
  it("maps route segments back to the page", () => {
    expect(pagePath(["index"])).toBe("/");
    expect(pagePath(["blog", "post"])).toBe("/blog/post");
  });
});
