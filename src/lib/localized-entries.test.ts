import { describe, expect, it } from "vitest";
import { z } from "zod";
import { localizedEntries } from "./localized-entries";

const base = z.object({
  name: z.string(),
  description: z.string(),
  order: z.number().default(100),
});
const translation = base.pick({ name: true, description: true }).partial();

function entry(path: string, data: Record<string, unknown>) {
  return { info: { path }, ...data };
}

describe("localizedEntries", () => {
  const read = localizedEntries(
    [
      entry("starter.mdx", {
        name: "starter",
        description: "A starter.",
        order: 1,
      }),
      entry("starter.fa.mdx", { description: "یک استارتر." }),
      entry("toolkit.mdx", { name: "toolkit", description: "A toolkit." }),
    ],
    { base, translation, dir: "content/projects" },
  );

  it("reads the default language from files without a language", () => {
    expect(read("en")).toEqual([
      { name: "starter", description: "A starter.", order: 1, slug: "starter" },
      {
        name: "toolkit",
        description: "A toolkit.",
        order: 100,
        slug: "toolkit",
      },
    ]);
  });

  it("lays a translation over the default file", () => {
    expect(read("fa")[0]).toEqual({
      name: "starter",
      description: "یک استارتر.",
      order: 1,
      slug: "starter",
    });
  });

  it("falls back to the default file without a translation", () => {
    expect(read("fa")[1]?.description).toBe("A toolkit.");
  });

  it("names the file in a validation error", () => {
    expect(() =>
      localizedEntries([entry("broken.mdx", { name: "broken" })], {
        base,
        translation,
        dir: "content/projects",
      }),
    ).toThrow("content/projects/broken.mdx: description");
  });
});
