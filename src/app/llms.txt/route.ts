import { llmsTxt } from "@/lib/agents";
import { markdownHeaders } from "@/lib/markdown-response";

export const revalidate = false;

export function GET() {
  return new Response(llmsTxt(), { headers: markdownHeaders("/llms.txt") });
}
