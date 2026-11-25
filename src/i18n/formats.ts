import type { Formats } from "next-intl";

/** Named formats for `format.dateTime(date, "date")` and friends. */
export const formats = {
  dateTime: {
    /** A post's date: `Nov 21, 2026`. */
    date: { dateStyle: "medium" },
    /** A month in work history: `Mar 2024`. */
    month: { year: "numeric", month: "short" },
  },
} satisfies Formats;
