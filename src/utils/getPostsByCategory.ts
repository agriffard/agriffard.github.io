import { slufigyAll } from "./slugify";
import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "../types";

const getPostsByCategory = (
  posts: MarkdownInstance<Frontmatter>[],
  tag: string
) =>
  posts.filter((post) => slufigyAll(post.frontmatter.categories).includes(tag));

export default getPostsByCategory;
