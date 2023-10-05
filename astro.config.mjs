import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import decapCmsOauth from "astro-decap-cms-oauth";
import node from '@astrojs/node';

export default defineConfig({
  site: "https://antoinegriffard.com/",
  integrations: [tailwind({ applyBaseStyles: false }), react(), sitemap(),decapCmsOauth()],
  output: "server",
  adapter: node({ mode: 'standalone', }),
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    },
    extendDefaultPlugins: true
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  scopedStyleStrategy: "where"
});