import type { Project, Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://antoinegriffard.com/",
  author: "Antoine Griffard",
  profile: "https://antoinegriffard.com/",
  desc: "Have you tried turning it off and on again?",
  title: "Antoine Griffard",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const PROJECTS: Project = [
  {
    name: "Orchard Core",
    href: "https://github.com/OrchardCMS/OrchardCore",
  },
  {
    name: "Orchard Core docs",
    href: "https://docs.orchardcore.net",
  },
  {
    name: "Orchard Core translations",
    href: "https://github.com/OrchardCMS/OrchardCore.Translations",
  },
  {
    name: "Orchard Core website",
    href: "https://orchardcore.net",
  },
  {
    name: "Try Orchard Core website",
    href: "https://try.orchardcore.net",
  },
  {
    name: "Orchard Core Admin theme",
    href: "https://github.com/agriffard/TheAdminTheme",
  },
  {
    name: "Orchard Core Bootstrap theme",
    href: "https://github.com/agriffard/TheBootstrapTheme",
  },
  {
    name: "Orchard Core ClassLess theme",
    href: "https://github.com/agriffard/TheClassLessTheme",
  },
  {
    name: "Orchard Core CookieConsent module",
    href: "https://github.com/agriffard/CookieConsent.OrchardCore",
  },
  {
    name: "Orchard Core Disqus.OrchardCore",
    href: "https://github.com/agriffard/Disqus.OrchardCore",
  },
  {
    name: "Orchard Core Prism module",
    href: "https://github.com/agriffard/Prism.OrchardCore",
  },
  {
    name: "Orchard Core Resume theme",
    href: "https://github.com/agriffard/TheResumeTheme",
  },
];

export const SOCIALS: SocialObjects = [
  {
    name: "Microsoft",
    href: "https://mvp.microsoft.com/en-US/MVP/profile/000ce4ed-409a-e411-b4b5-6c3be5a84f98",
    linkTitle: `${SITE.title} on Microsoft MVP`,
    active: true,
  },
  {
    name: "Github",
    href: "https://github.com/agriffard",
    linkTitle: `${SITE.title} on GitHub`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/agriffard",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  // {
  //   name: "Twitter",
  //   href: "https://twitter.com/agriffard",
  //   linkTitle: `${SITE.title} on Twitter`,
  //   active: true,
  // },
  {
    name: "Email",
    href: "mailto:agriffard@hotmail.com",
    linkTitle: `${SITE.title} by email`,
    active: true,
  },
];
