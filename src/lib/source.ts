import { isMarkId, ProjectMark } from '@/components/brand';
import { llms, loader } from 'fumadocs-core/source';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineDocs } from 'fumadocs-mdx/macro';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { type BlogAuthor, blogPageSchema } from './blog';
import { docsRoute } from './shared';
import { site } from './site';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (isMarkId(icon)) return createElement(ProjectMark, { id: icon });
    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: blogPageSchema,
});

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
});

export const blogAuthors = {
  dimah: {
    name: site.author.name,
    title: site.author.tagline,
    url: site.author.githubUrl,
    image: site.author.avatarUrl,
  },
} satisfies Record<string, BlogAuthor>;
