export interface Frontmatter {
  title: string;
  ogImage?: string;
  description: string;
  author: string;
  datetime: string;
  slug: string;
  featured: boolean;
  draft: boolean;
  categories: string[];
  tags: string[];
}

export type Project = {
  name: string;
  href: string;
}[];

export type SocialsObject = {
  name: SocialMedia;
  href: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia =
  | "microsoft"
  | "github"
  | "linkedin"
  | "email"
  | "twitter";
