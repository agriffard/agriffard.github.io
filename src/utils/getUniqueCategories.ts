import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

interface Category {
  category: string;
  categoryName: string;
}

const getUniqueCategories = (posts: CollectionEntry<"blog">[]) => {
  const categories: Category[] = posts
    .filter(postFilter)
    .flatMap(post => post.data.categories)
    .map(category => ({ category: slugifyStr(category), categoryName: category }))
    .filter(
      (value, index, self) =>
        self.findIndex(category => category.category === value.category) === index
    )
    .sort((categoryA, categoryB) => categoryA.category.localeCompare(categoryB.category));
  return categories;
};

export default getUniqueCategories;
