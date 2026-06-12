export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: any;
}

export interface HeroFields {
  heroLabel?: string;
  heroHeading?: string;
  heroSubheading?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroBackgroundVideo?: string;
  heroPosterImage?: any;
  overlayStrength?: number;
}

export interface CTAFields {
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  ctaBackgroundImage?: any;
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  type: "image" | "video";
  image?: any;
  videoUrl?: string;
  caption?: string;
  category?: "architecture" | "interior" | "construction" | "real-estate";
}

export interface NavItem {
  label: string;
  href: string;
  visible?: boolean;
  isMegaMenu?: boolean;
  children?: Array<{ label: string; href: string }>;
}

export interface SocialLink {
  platform: "instagram" | "linkedin" | "facebook" | "twitter" | "youtube";
  url: string;
}

export interface Project {
  _id: string;
  _type: "project";
  _createdAt?: string;
  _updatedAt?: string;
  name: string;
  slug: { current: string };
  category: "residential" | "commercial" | "mixed-use" | "interior" | "architecture" | "construction";
  status: "planning" | "in-progress" | "completed";
  featured: boolean;
  displayOrder: number;
  featuredImage: any;
  heroImage?: any;
  gallery?: GalleryItem[];
  location?: string;
  client?: string;
  year?: string;
  duration?: string;
  budget?: string;
  description: any; // Portable text blocks
  challenge?: string;
  approach?: string;
  solution?: string;
  results?: string;
  servicesUsed?: Array<{ _id: string; title: string; slug: { current: string } }>;
  architect?: string;
  contractor?: string;
  downloads?: Array<{ label?: string; asset: { url: string } }>;
  relatedProjects?: Project[];
  seo?: SEO;
}

export interface Service {
  _id: string;
  _type: "service";
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  heroImage?: any;
  icon?: string;
  description: string;
  benefits?: string[];
  processSteps?: ProcessStep[];
  supportingImages?: any[];
  caseStudies?: Project[];
  cta?: CTAFields;
  seo?: SEO;
}

export interface Development {
  _id: string;
  _type: "development";
  name: string;
  slug: { current: string };
  status: "planning" | "construction" | "selling" | "completed";
  location?: string;
  overview: any; // Portable text blocks
  features?: string[];
  gallery?: any[];
  videos?: string[];
  downloads?: Array<{ label?: string; asset: { url: string } }>;
  inquiryFormEnabled: boolean;
  cta?: CTAFields;
  seo?: SEO;
}

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  photo: any;
  biography?: string;
  linkedIn?: string;
  email?: string;
  displayOrder: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  photo?: any;
  testimonial: string;
  rating?: number;
  featured: boolean;
  displayOrder: number;
}

export interface GalleryAlbum {
  _id: string;
  name: string;
  slug: { current: string };
  category: "architecture" | "interior" | "construction" | "real-estate";
  coverImage: any;
  description?: string;
  date?: string;
  items?: GalleryItem[];
  featured: boolean;
  displayOrder: number;
}

export interface Career {
  _id: string;
  title: string;
  slug: { current: string };
  department: "architecture" | "engineering" | "project-management" | "sales-marketing" | "administration";
  location: string;
  type: "full-time" | "contract" | "internship";
  description: any;
  requirements?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  active: boolean;
}

export interface HomepageData {
  hero?: HeroFields;
  stats?: StatItem[];
  aboutEyebrow?: string;
  aboutHeading?: string;
  aboutDescription?: string;
  aboutCtaText?: string;
  aboutCtaLink?: string;
  aboutImage1?: any;
  aboutImage2?: any;
  servicesEyebrow?: string;
  servicesHeading?: string;
  featuredServices?: Service[];
  projectsEyebrow?: string;
  projectsHeading?: string;
  projectsCtaText?: string;
  featuredProjects?: Project[];
  divisionsEyebrow?: string;
  divisionsHeading?: string;
  divisionsList?: Array<{
    title: string;
    description: string;
    icon?: string;
    link?: string;
    features?: string[];
  }>;
  testimonialsHeading?: string;
  featuredTestimonials?: Testimonial[];
  sectionCta?: CTAFields;
  seo?: SEO;
}

export interface SiteSettings {
  siteName: string;
  logo?: any;
  logoDark?: any;
  favicon?: any;
  companyRegistration?: string;
  googleAnalyticsId?: string;
  defaultSeo?: SEO;
}

export interface NavigationData {
  mainMenu?: NavItem[];
  ctaButton?: { text: string; href: string };
  mobileMenu?: NavItem[];
}

export interface FooterData {
  companyDescription?: string;
  logo?: any;
  columns?: Array<{
    heading: string;
    links?: Array<{ label: string; href: string }>;
  }>;
  socialLinks?: SocialLink[];
  legalLinks?: Array<{ label: string; href: string }>;
  newsletter?: {
    heading: string;
    description: string;
    placeholder: string;
  };
  copyright: string;
  certifications?: any[];
}

export interface ContactInfoData {
  offices?: Array<{
    name: string;
    address: string;
    phone?: string[];
    email?: string;
    hours?: string;
    mapImage?: any;
    coordinates?: { lat: number; lng: number };
  }>;
  whatsappNumber?: string;
  calendlyLink?: string;
}

export interface SEOSettingsData {
  siteUrl: string;
  metaTitleTemplate?: string;
  robotsTxt?: string;
  siteVerificationGoogle?: string;
}
