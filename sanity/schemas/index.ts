// Objects
import { seo } from "./objects/seo";
import { heroFields } from "./objects/heroFields";
import { ctaFields } from "./objects/ctaFields";
import { statItem } from "./objects/statItem";
import { processStep } from "./objects/processStep";
import { galleryItem } from "./objects/galleryItem";
import { navItem } from "./objects/navItem";
import { socialLink } from "./objects/socialLink";

// Documents
import { project } from "./documents/project";
import { service } from "./documents/service";
import { development } from "./documents/development";
import { blogPost } from "./documents/blogPost";
import { testimonial } from "./documents/testimonial";
import { teamMember } from "./documents/teamMember";
import { galleryAlbum } from "./documents/galleryAlbum";
import { career } from "./documents/career";

// Singletons
import { homepage } from "./singletons/homepage";
import { siteSettings } from "./singletons/siteSettings";
import { navigation } from "./singletons/navigation";
import { footer } from "./singletons/footer";
import { contactInfo } from "./singletons/contactInfo";
import { seoSettings } from "./singletons/seoSettings";

export const schemaTypes = [
  // Objects
  seo,
  heroFields,
  ctaFields,
  statItem,
  processStep,
  galleryItem,
  navItem,
  socialLink,

  // Documents
  project,
  service,
  development,
  blogPost,
  testimonial,
  teamMember,
  galleryAlbum,
  career,

  // Singletons
  homepage,
  siteSettings,
  navigation,
  footer,
  contactInfo,
  seoSettings,
];
