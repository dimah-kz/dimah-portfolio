import { llmsFullTxt } from "@/lib/agents";
import { markdownHeaders } from "@/lib/markdown-response";

export const revalidate = false;

export async function GET() {
  return new Response(await llmsFullTxt(), {
    headers: markdownHeaders("/llms-full.txt"),
  });
}
