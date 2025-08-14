import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages";

export const GET: APIRoute = async () => {
  const pngBuffer = await generateOgImageForSite(); // Buffer
  // Convert Node Buffer to Uint8Array so it's an accepted BlobPart
  const uint8 = new Uint8Array(pngBuffer);
  const body = new Blob([uint8], { type: "image/png" });
  return new Response(body, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
