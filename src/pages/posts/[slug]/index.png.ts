import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { slugifyStr } from "@/utils/slugify";

export async function getStaticPaths() {
  const posts = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const pngBuffer = await generateOgImageForPost(props as CollectionEntry<"blog">);
  const uint8 = new Uint8Array(pngBuffer);
  const body = new Blob([uint8], { type: "image/png" });
  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
