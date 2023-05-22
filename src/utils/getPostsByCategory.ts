import { slugifyAll } from "./slugify";
import type { MarkdownInstance } from "astro";

const getPostsByCategory = (posts: CollectionEntry<"blog">[], tag: string) =>
  posts.filter((post) => slugifyAll(post.frontmatter.categories).includes(tag));

export default getPostsByCategory;
