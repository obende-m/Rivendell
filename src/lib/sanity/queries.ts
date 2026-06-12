import db from "../../data/db.json";
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
  return db.homepageData as HomepageData;
}

// 2. Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  return db.siteSettings as SiteSettings;
}

// 3. Navigation
export async function getNavigation(): Promise<NavigationData> {
  return db.navigation as NavigationData;
}

// 4. Footer
export async function getFooter(): Promise<FooterData> {
  return db.footer as FooterData;
}

// 5. Contact Info
export async function getContactInfo(): Promise<ContactInfoData> {
  return db.contactInfo as ContactInfoData;
}

// 6. SEO Settings
export async function getSEOSettings(): Promise<SEOSettingsData> {
  return db.seoSettings as SEOSettingsData;
}

// 7. Projects Listing
export async function getProjects(): Promise<Project[]> {
  return db.projects as Project[];
}

// 8. Project Detail
export async function getProject(slug: string): Promise<Project | null> {
  const item = (db.projects as Project[]).find((p) => p.slug.current === slug);
  return item || null;
}

// 9. Services Listing
export async function getServices(): Promise<Service[]> {
  return db.services as Service[];
}

// 10. Service Detail
export async function getService(slug: string): Promise<Service | null> {
  const item = (db.services as Service[]).find((s) => s.slug.current === slug);
  return item || null;
}

// 11. Developments Listing
export async function getDevelopments(): Promise<Development[]> {
  return db.developments as Development[];
}

// 12. Development Detail
export async function getDevelopment(slug: string): Promise<Development | null> {
  const item = (db.developments as Development[]).find((d) => d.slug.current === slug);
  return item || null;
}

// 13. Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return db.teamMembers as TeamMember[];
}

// 14. Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return db.testimonials as Testimonial[];
}

// 15. Gallery Albums
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  return db.galleryAlbums as GalleryAlbum[];
}

// 16. Careers Listing
export async function getCareers(): Promise<Career[]> {
  return (db.careers as Career[]).filter((c) => c.active === true);
}

// 17. Career Detail
export async function getCareer(slug: string): Promise<Career | null> {
  const item = (db.careers as Career[]).find((c) => c.slug.current === slug);
  return item || null;
}
