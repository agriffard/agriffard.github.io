import type { Project, SocialsObject } from "./types";

export const SITE = {
  website: "https://agriffard.github.io/",
  author: "Antoine Griffard",
  desc: "Adventures in .NET world.",
  title: "Antoine Griffard",
  ogImage: "default-og.png",
  lightAndDarkMode: true,
  postPerPage: 5,
  extra: ["math"],
};

export const LOGO_IMAGE = {
  enable: false,
  svg: false,
  width: 46,
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

export const SOCIALS: SocialsObject = [
  {
    name: "Microsoft",
    href: "https://mvp.microsoft.com/en-us/PublicProfile/5000870?fullName=Antoine%20%20Griffard",
  },
  {
    name: "Github",
    href: "https://github.com/agriffard",
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/agriffard",
  },
  {
    name: "Twitter",
    href: "https://github.com/agriffard",
  },
  {
    name: "Mail",
    href: "mailto:agriffard@hotmail.com",
  },
];
