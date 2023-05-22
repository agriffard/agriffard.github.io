import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkPlantUML from "@akebifiky/remark-simple-plantuml";
import { remarkReadingTime } from "./remark-plugins/remark-reading-time.mjs";
import { remarkDiagram } from "./remark-plugins/remark-diagram.mjs";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://agriffard.github.io/",
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), react(), sitemap(), compress(),
  robotsTxt(), mdx()],
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