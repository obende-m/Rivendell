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

// 1. Homepage
export async function getHomepageData(): Promise<HomepageData> {
  return mock.mockHomepageData;
}

// 2. Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  return mock.mockSiteSettings;
}

// 3. Navigation
export async function getNavigation(): Promise<NavigationData> {
  return mock.mockNavigation;
}

// 4. Footer
export async function getFooter(): Promise<FooterData> {
  return mock.mockFooter;
}

// 5. Contact Info
export async function getContactInfo(): Promise<ContactInfoData> {
  return mock.mockContactInfo;
}

// 6. SEO Settings
export async function getSEOSettings(): Promise<SEOSettingsData> {
  return mock.mockSEOSettings;
}

// 7. Projects Listing
export async function getProjects(): Promise<Project[]> {
  return mock.mockProjects;
}

// 8. Project Detail
export async function getProject(slug: string): Promise<Project | null> {
  const item = mock.mockProjects.find((p) => p.slug.current === slug);
  return item || null;
}

// 9. Services Listing
export async function getServices(): Promise<Service[]> {
  return mock.mockServices;
}

// 10. Service Detail
export async function getService(slug: string): Promise<Service | null> {
  const item = mock.mockServices.find((s) => s.slug.current === slug);
  return item || null;
}

// 11. Developments Listing
export async function getDevelopments(): Promise<Development[]> {
  return mock.mockDevelopments;
}

// 12. Development Detail
export async function getDevelopment(slug: string): Promise<Development | null> {
  const item = mock.mockDevelopments.find((d) => d.slug.current === slug);
  return item || null;
}

// 13. Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return mock.mockTeamMembers;
}

// 14. Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return mock.mockTestimonials;
}

// 15. Gallery Albums
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  return mock.mockGalleryAlbums;
}

// 16. Careers Listing
export async function getCareers(): Promise<Career[]> {
  return mock.mockCareers.filter((c) => c.active === true);
}

// 17. Career Detail
export async function getCareer(slug: string): Promise<Career | null> {
  const item = mock.mockCareers.find((c) => c.slug.current === slug);
  return item || null;
}
