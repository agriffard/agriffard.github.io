import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueCategories = (posts: CollectionEntry<"blog">[]) => {
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  const categories: string[] = filteredPosts
    .flatMap(post => post.data.categories)
    .map(category => slugifyStr(category))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((categoryA: string, categoryB: string) =>
      categoryA.localeCompare(categoryB)
    );
  return categories;
};

export default getUniqueCategories;
