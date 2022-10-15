import type { Project, SocialsObject } from "./types";

export const SITE = {
  website: "https://agriffard.pages.dev/",
  author: "Antoine Griffard",
  desc: "Adventures in .NET world.",
  title: "Antoine Griffard",
  ogImage: "default-og.png",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  width: 46,
  height: 46,
};

export const PROJECTS: Project = [
  {
    name: "Orchard Core",
    href: "https://orchardcore.net"
  },
  {
    name: "Try Orchard Core",
    href: "https://try.orchardcore.net"
  }
];

export const SOCIALS: SocialsObject = [
  {
    name: "Microsoft",
    href: "https://mvp.microsoft.com/en-us/PublicProfile/5000870?fullName=Antoine%20%20Griffard"
  },
  {
    name: "Github",
    href: "https://github.com/agriffard"
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/agriffard"
  },
  {
    name: "Twitter",
    href: "https://github.com/agriffard"
  },
  {
    name: "Mail",
    href: "mailto:agriffard@hotmail.com"
  }
];
