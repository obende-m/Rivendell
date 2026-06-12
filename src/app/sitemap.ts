import { MetadataRoute } from "next";
import { getProjects, getServices } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rivendellconsults.com";

  // Static URLs
  const staticPaths = [
    "",
    "/about",
    "/contact",
    "/services",
    "/services/architecture",
    "/services/construction",
    "/projects",
    "/developments",
    "/blog",
    "/gallery",
    "/careers",
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Dynamic Projects URLs
  let projectUrls: any[] = [];
  try {
    const projects = await getProjects();
    projectUrls = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug?.current || p.slug}`,
      lastModified: new Date(p._updatedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: Failed to fetch projects", e);
  }

  // Dynamic Services URLs (if any exist beyond /architecture and /construction)
  let serviceUrls: any[] = [];
  try {
    const services = await getServices();
    serviceUrls = services.map((s) => ({
      url: `${baseUrl}/services/${s.slug?.current || s.slug}`,
      lastModified: new Date(s._updatedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: Failed to fetch services", e);
  }

  return [...staticUrls, ...projectUrls, ...serviceUrls];
}
