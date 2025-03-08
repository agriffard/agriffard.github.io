export const SITE = {
  website: "https://antoinegriffard.com/",
  author: "Antoine Griffard",
  profile: "https://antoinegriffard.com/",
  desc: "Have you tried turning it off and on again?",
  title: "Antoine Griffard",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    url: "https://github.com/satnaing/astro-paper/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
} as const;
