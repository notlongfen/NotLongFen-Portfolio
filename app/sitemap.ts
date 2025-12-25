import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://notlongfen.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/cyberpunk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/magazine`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Add project pages for cyberpunk edition
  const cyberpunkProjectRoutes: MetadataRoute.Sitemap = projects.map(
    (project) => ({
      url: `${siteUrl}/cyberpunk/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Add project pages for magazine edition
  const magazineProjectRoutes: MetadataRoute.Sitemap = projects.map(
    (project) => ({
      url: `${siteUrl}/magazine/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...baseRoutes, ...cyberpunkProjectRoutes, ...magazineProjectRoutes];
}

