import { client } from "./client";
import * as mock from "./mockData";
import {
  HomepageData,
  SiteSettings,
  NavigationData,
  FooterData,
  ContactInfoData,
  SEOSettingsData,
  Project,
  Service,
  Development,
  TeamMember,
  Testimonial,
  GalleryAlbum,
  Career,
} from "./types";

const isPlaceholder =
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "placeholder";

// 1. Homepage
export async function getHomepageData(): Promise<HomepageData> {
  if (isPlaceholder) return mock.mockHomepageData;
  try {
    return await client.fetch(`*[_type == "homepage"][0] {
      ...,
      hero {
        ...,
        heroPosterImage {
          asset->{url}
        }
      },
      aboutImage1 {
        asset->{url}
      },
      aboutImage2 {
        asset->{url}
      },
      featuredServices[]->,
      featuredProjects[]->{
        ...,
        featuredImage {
          asset->{url}
        }
      },
      featuredTestimonials[]->,
      sectionCta {
        ...,
        ctaBackgroundImage {
          asset->{url}
        }
      }
    }`);
  } catch (err) {
    console.error("Sanity fetch error (homepage), using mock data:", err);
    return mock.mockHomepageData;
  }
}

// 2. Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isPlaceholder) return mock.mockSiteSettings;
  try {
    return await client.fetch(`*[_type == "siteSettings"][0] {
      ...,
      logo { asset->{url} },
      logoDark { asset->{url} },
      favicon { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockSiteSettings;
  }
}

// 3. Navigation
export async function getNavigation(): Promise<NavigationData> {
  if (isPlaceholder) return mock.mockNavigation;
  try {
    return await client.fetch(`*[_type == "navigation"][0]`);
  } catch (err) {
    return mock.mockNavigation;
  }
}

// 4. Footer
export async function getFooter(): Promise<FooterData> {
  if (isPlaceholder) return mock.mockFooter;
  try {
    return await client.fetch(`*[_type == "footer"][0] {
      ...,
      logo { asset->{url} },
      certifications[] { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockFooter;
  }
}

// 5. Contact Info
export async function getContactInfo(): Promise<ContactInfoData> {
  if (isPlaceholder) return mock.mockContactInfo;
  try {
    return await client.fetch(`*[_type == "contactInfo"][0] {
      ...,
      offices[] {
        ...,
        mapImage { asset->{url} }
      }
    }`);
  } catch (err) {
    return mock.mockContactInfo;
  }
}

// 6. SEO Settings
export async function getSEOSettings(): Promise<SEOSettingsData> {
  if (isPlaceholder) return mock.mockSEOSettings;
  try {
    return await client.fetch(`*[_type == "seoSettings"][0]`);
  } catch (err) {
    return mock.mockSEOSettings;
  }
}

// 7. Projects Listing
export async function getProjects(): Promise<Project[]> {
  if (isPlaceholder) return mock.mockProjects;
  try {
    return await client.fetch(`*[_type == "project"] | order(displayOrder asc, _createdAt desc) {
      ...,
      featuredImage { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockProjects;
  }
}

// 8. Project Detail
export async function getProject(slug: string): Promise<Project | null> {
  if (isPlaceholder) {
    const item = mock.mockProjects.find((p) => p.slug.current === slug);
    return item || null;
  }
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        ...,
        featuredImage { asset->{url} },
        heroImage { asset->{url} },
        gallery[] {
          ...,
          image { asset->{url} }
        },
        servicesUsed[]->,
        downloads[] {
          label,
          "url": asset->url
        },
        relatedProjects[]-> {
          ...,
          featuredImage { asset->{url} }
        }
      }`,
      { slug }
    );
  } catch (err) {
    const item = mock.mockProjects.find((p) => p.slug.current === slug);
    return item || null;
  }
}

// 9. Services Listing
export async function getServices(): Promise<Service[]> {
  if (isPlaceholder) return mock.mockServices;
  try {
    return await client.fetch(`*[_type == "service"] | order(title asc) {
      ...,
      heroImage { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockServices;
  }
}

// 10. Service Detail
export async function getService(slug: string): Promise<Service | null> {
  if (isPlaceholder) {
    const item = mock.mockServices.find((s) => s.slug.current === slug);
    return item || null;
  }
  try {
    return await client.fetch(
      `*[_type == "service" && slug.current == $slug][0] {
        ...,
        heroImage { asset->{url} },
        supportingImages[] { asset->{url} },
        caseStudies[]-> {
          ...,
          featuredImage { asset->{url} }
        }
      }`,
      { slug }
    );
  } catch (err) {
    const item = mock.mockServices.find((s) => s.slug.current === slug);
    return item || null;
  }
}

// 11. Developments Listing
export async function getDevelopments(): Promise<Development[]> {
  if (isPlaceholder) return mock.mockDevelopments;
  try {
    return await client.fetch(`*[_type == "development"] | order(_createdAt desc) {
      ...,
      gallery[] { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockDevelopments;
  }
}

// 12. Development Detail
export async function getDevelopment(slug: string): Promise<Development | null> {
  if (isPlaceholder) {
    const item = mock.mockDevelopments.find((d) => d.slug.current === slug);
    return item || null;
  }
  try {
    return await client.fetch(
      `*[_type == "development" && slug.current == $slug][0] {
        ...,
        gallery[] { asset->{url} },
        downloads[] {
          label,
          "url": asset->url
        }
      }`,
      { slug }
    );
  } catch (err) {
    const item = mock.mockDevelopments.find((d) => d.slug.current === slug);
    return item || null;
  }
}

// 13. Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isPlaceholder) return mock.mockTeamMembers;
  try {
    return await client.fetch(`*[_type == "teamMember"] | order(displayOrder asc) {
      ...,
      photo { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockTeamMembers;
  }
}

// 14. Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  if (isPlaceholder) return mock.mockTestimonials;
  try {
    return await client.fetch(`*[_type == "testimonial"] | order(displayOrder asc) {
      ...,
      photo { asset->{url} }
    }`);
  } catch (err) {
    return mock.mockTestimonials;
  }
}

// 15. Gallery Albums
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  if (isPlaceholder) return mock.mockGalleryAlbums;
  try {
    return await client.fetch(`*[_type == "galleryAlbum"] | order(displayOrder asc, date desc) {
      ...,
      coverImage { asset->{url} },
      items[] {
        ...,
        image { asset->{url} }
      }
    }`);
  } catch (err) {
    return mock.mockGalleryAlbums;
  }
}

// 16. Careers Listing
export async function getCareers(): Promise<Career[]> {
  if (isPlaceholder) return mock.mockCareers;
  try {
    return await client.fetch(`*[_type == "career" && active == true] | order(_createdAt desc)`);
  } catch (err) {
    return mock.mockCareers;
  }
}

// 17. Career Detail
export async function getCareer(slug: string): Promise<Career | null> {
  if (isPlaceholder) {
    const item = mock.mockCareers.find((c) => c.slug.current === slug);
    return item || null;
  }
  try {
    return await client.fetch(`*[_type == "career" && slug.current == $slug][0]`, { slug });
  } catch (err) {
    const item = mock.mockCareers.find((c) => c.slug.current === slug);
    return item || null;
  }
}
