import { describe, expect, it } from "vitest";
import { localizePath, splitLocalePath } from "./paths";

describe("localizePath", () => {
  it("keeps the default language without a prefix", () => {
    expect(localizePath("/", "en")).toBe("/");
    expect(localizePath("/blog/post", "en")).toBe("/blog/post");
  });

  it("prefixes every other language", () => {
    expect(localizePath("/", "fa")).toBe("/fa");
    expect(localizePath("/projects", "fa")).toBe("/fa/projects");
  });
});

describe("splitLocalePath", () => {
  it("reads the default language from an unprefixed path", () => {
    expect(splitLocalePath("/")).toEqual({ locale: "en", path: "/" });
    expect(splitLocalePath("/blog/post")).toEqual({
      locale: "en",
      path: "/blog/post",
    });
  });

  it("reads a prefix and returns the path without it", () => {
    expect(splitLocalePath("/fa")).toEqual({ locale: "fa", path: "/" });
    expect(splitLocalePath("/fa/blog/post")).toEqual({
      locale: "fa",
      path: "/blog/post",
    });
    expect(splitLocalePath("/en/projects")).toEqual({
      locale: "en",
      path: "/projects",
    });
  });

  it("treats an unknown first segment as part of the path", () => {
    expect(splitLocalePath("/fax/page")).toEqual({
      locale: "en",
      path: "/fax/page",
    });
  });

  it("is the inverse of localizePath", () => {
    for (const locale of ["en", "fa"] as const) {
      for (const path of ["/", "/projects", "/blog/tags/x"]) {
        expect(splitLocalePath(localizePath(path, locale))).toEqual({
          locale,
          path,
        });
      }
    }
  });
});
