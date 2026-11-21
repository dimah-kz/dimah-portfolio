import { ProjectLogo } from "@/components/brand";
import { projectForDocsSlug } from "@/lib/projects";
import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getPageImageUrl, gitConfig } from "@/lib/shared";
import { articleJsonLd, pageMeta } from "@/lib/seo";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = `${page.url}.md`;

  const image = getPageImageUrl(page).url;
  const project = projectForDocsSlug(page.slugs[0]);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          type: "TechArticle",
          pathname: page.url,
          title: page.data.title,
          description: page.data.description,
          image,
        })}
      />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle className={project ? "flex items-center gap-3" : undefined}>
          {project ? <ProjectLogo id={project.id} /> : null}
          {page.data.title}
        </DocsTitle>
        <DocsDescription className="mb-0">
          {page.data.description}
        </DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${encodeURI(page.path)}`}
          />
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const image = getPageImageUrl(page).url;

  return pageMeta(page.url, {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: page.data.title }],
    },
  });
}
