import { slufigyAll } from "./slugify";
import type { MarkdownInstance } from "astro";

const getPostsByCategory = (posts: CollectionEntry<"blog">[], tag: string) =>
  posts.filter((post) => slufigyAll(post.frontmatter.categories).includes(tag));

export default getPostsByCategory;
