import { slugifyAll } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getPostsByCategory = (
  posts: CollectionEntry<"blog">[],
  category: string
) => posts.filter(post => slugifyAll(post.data.categories).includes(category));

export default getPostsByCategory;
