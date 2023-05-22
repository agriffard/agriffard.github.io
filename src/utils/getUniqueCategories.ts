import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueCategories = (posts: CollectionEntry<"blog">[]) => {
  let categories: string[] = [];
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  filteredPosts.forEach((post) => {
    categories = [...categories, ...post.data.categories]
      .map((category) => slugifyStr(category))
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      );
  });
  return categories;
};

export default getUniqueCategories;
