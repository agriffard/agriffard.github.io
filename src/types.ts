export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
};

export type Project = {
  name: string;
  href: string;
}[];

export type SocialsObject = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
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
