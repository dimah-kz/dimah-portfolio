import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware `Link`, `redirect`, `usePathname`, and `useRouter`. Pass a path
 * without the language (`/blog/my-post`); the current language is added.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
