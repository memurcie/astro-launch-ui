import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    tailwind(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      syntaxHighlight: 'prism',
    }),
    sitemap({
      // Customize the sitemap filter to exclude drafts and future posts
      filter: async (page) => {
        // Exclude drafts and future posts from sitemap
        if (page.includes('/blog/')) {
          try {
            const post = await import(`./src/content/blog${page.replace('/blog', '')}.md`);
            return !post.frontmatter.draft && new Date(post.frontmatter.pubDate) <= new Date();
          } catch (e) {
            console.warn(`Could not process blog post for sitemap: ${page}`, e);
            return false;
          }
        }
        return true;
      },
      // Customize the sitemap entries
      customPages: [
        'https://agenixhub.com/',
        'https://agenixhub.com/about',
        'https://agenixhub.com/blog',
        'https://agenixhub.com/contact',
      ],
    })
  ],
  site: "https://agenixhub.com",
  base: "/",
  // Enable sitemap generation in production only
  build: {
    sitemap: isProd,
  },
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
