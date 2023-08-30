import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import rehypeKatex from "rehype-katex";
import { remarkDiagram } from "./remark-plugins/remark-diagram.mjs";
import { remarkReadingTime } from "./remark-plugins/remark-reading-time.mjs";
import remarkCollapse from "remark-collapse";
import remarkPlantUML from "@akebifiky/remark-simple-plantuml";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://agriffard.github.io/",
  compressHTML: true,
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx(), react(), robotsTxt(), sitemap()],
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkReadingTime, remarkMath, remarkPlantUML, remarkDiagram, remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    }
  }
});