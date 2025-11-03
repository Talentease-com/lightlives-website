import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lightlives.org";

  // Define static routes with their metadata
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      priority: 1.0,
    },
        // CSR
    {
      url: `${baseUrl}/csr`,
      priority: 0.9,
    },
    // About section
    {
      url: `${baseUrl}/about/mission`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/programs`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/team`,
      priority: 0.7,
    },
    // Sponsor/Donate
    {
      url: `${baseUrl}/sponsor`,
      priority: 0.9,
    },
    // Support section
    {
      url: `${baseUrl}/support/volunteer`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support/join`,
      priority: 0.7,
    },
    // Contact
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
    },
    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      priority: 0.3,
    },
  ];

  return routes;
}
