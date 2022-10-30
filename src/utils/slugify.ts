import GithubSlugger from "github-slugger";
import type { Frontmatter } from "src/types";

const slugger = new GithubSlugger();

export const slugifyStr = (str: string) => slugger.slug(str);

const slugify = (frontmatter: Frontmatter) =>
  frontmatter.slug ? slugger.slug(frontmatter.slug) : slugger.slug(frontmatter.title);

export const slufigyAll = (arr: string[]) => arr.map((str) => slugifyStr(str));

export default slugify;
