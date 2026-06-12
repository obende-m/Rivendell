import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const hasSanity =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

const builder = hasSanity ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  // If CMS settings are not configured or asset is missing, use Unsplash fallback
  if (!builder || !source) {
    return {
      url: () => "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    };
  }
  try {
    return builder.image(source);
  } catch (error) {
    return {
      url: () => "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    };
  }
}
