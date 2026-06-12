import { defineType, defineField } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "stats", title: "Statistics Section" },
    { name: "about", title: "About Section" },
    { name: "services", title: "Services Preview" },
    { name: "projects", title: "Featured Projects" },
    { name: "divisions", title: "Divisions / Columns" },
    { name: "testimonials", title: "Testimonials" },
    { name: "cta", title: "CTA Section" },
    { name: "seo", title: "SEO Settings" },
  ],
  fields: [
    // Hero Group
    defineField({
      name: "hero",
      title: "Hero Configuration",
      type: "heroFields",
      group: "hero",
    }),

    // Statistics Group
    defineField({
      name: "stats",
      title: "Statistics List",
      type: "array",
      of: [{ type: "statItem" }],
      group: "stats",
      validation: (Rule) => Rule.max(4),
    }),

    // About Group
    defineField({
      name: "aboutEyebrow",
      title: "About Section Eyebrow",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutHeading",
      title: "About Section Heading",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Section Description",
      type: "text",
      rows: 4,
      group: "about",
    }),
    defineField({
      name: "aboutCtaText",
      title: "About CTA Button Text",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutCtaLink",
      title: "About CTA Button Link",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutImage1",
      title: "About Main Image",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),
    defineField({
      name: "aboutImage2",
      title: "About Secondary Image (Offset)",
      type: "image",
      options: { hotspot: true },
      group: "about",
    }),

    // Services Group
    defineField({
      name: "servicesEyebrow",
      title: "Services Eyebrow",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesHeading",
      title: "Services Heading",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "featuredServices",
      title: "Featured Services Preview",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: "services",
    }),

    // Projects Group
    defineField({
      name: "projectsEyebrow",
      title: "Projects Eyebrow",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "projectsHeading",
      title: "Projects Heading",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "projectsCtaText",
      title: "View All Projects Button Text",
      type: "string",
      group: "projects",
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Signature Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      group: "projects",
    }),

    // Divisions Group
    defineField({
      name: "divisionsEyebrow",
      title: "Divisions Eyebrow",
      type: "string",
      group: "divisions",
    }),
    defineField({
      name: "divisionsHeading",
      title: "Divisions Heading",
      type: "string",
      group: "divisions",
    }),
    defineField({
      name: "divisionsList",
      title: "Divisions Column Cards List",
      type: "array",
      of: [
        {
          type: "object",
          name: "divisionCard",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description", rows: 3 },
            { name: "icon", type: "string", title: "Material Symbol Icon Name" },
            { name: "link", type: "string", title: "Card Action URL" },
            { name: "features", type: "array", of: [{ type: "string" }], title: "Feature Checklist Items" },
          ],
        },
      ],
      group: "divisions",
    }),

    // Testimonials Group
    defineField({
      name: "testimonialsHeading",
      title: "Testimonials Section Heading",
      type: "string",
      group: "testimonials",
    }),
    defineField({
      name: "featuredTestimonials",
      title: "Featured Testimonials List",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      group: "testimonials",
    }),

    // CTA Group
    defineField({
      name: "sectionCta",
      title: "Middle Page CTA Call",
      type: "ctaFields",
      group: "cta",
    }),

    // SEO Group
    defineField({
      name: "seo",
      title: "SEO Metadata Overrides",
      type: "seo",
      group: "seo",
    }),
  ],
});
