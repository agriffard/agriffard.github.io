import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconMicrosoft from "@/assets/icons/IconMicrosoft.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import { SITE } from "@/config";

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const SHARE_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;

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

export const SOCIALS = [
  {
    name: "Microsoft",
    href: "https://mvp.microsoft.com/en-US/MVP/profile/000ce4ed-409a-e411-b4b5-6c3be5a84f98",
    linkTitle: `${SITE.title} on Microsoft MVP`,
    icon: IconMicrosoft,
  },
  {
    name: "Github",
    href: "https://github.com/agriffard",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/agriffard",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Email",
    href: "mailto:agriffard@hotmail.com",
    linkTitle: `${SITE.title} by email`,
    icon: IconMail,
  },
] as const;
