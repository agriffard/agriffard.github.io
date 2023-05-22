import { slugifyAll } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getPostsByCategory = (posts: CollectionEntry<"blog">[], tag: string) =>
  posts.filter((post) => slugifyAll(post.data.categories).includes(tag));

export default getPostsByCategory;
