export function urlFor(source: any) {
  const defaultFallback =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  if (!source) {
    return {
      url: () => defaultFallback,
    };
  }

  // Handle direct string URLs
  if (typeof source === "string") {
    return {
      url: () => source,
    };
  }

  // Handle mock objects with asset.url
  if (source.asset?.url) {
    return {
      url: () => source.asset.url,
    };
  }

  if (source.url) {
    return {
      url: () => source.url,
    };
  }

  return {
    url: () => defaultFallback,
  };
}
