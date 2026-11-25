import { notFound } from "next/navigation";

/**
 * Any path the language has no page for. Sends it to `[locale]/not-found.tsx`,
 * so a 404 keeps the language, the header, and the footer.
 */
export default function UnknownPage() {
  notFound();
}
