import { defineType, defineField } from "sanity";

export const heroFields = defineType({
  name: "heroFields",
  title: "Hero Fields",
  type: "object",
  fields: [
    defineField({
      name: "heroLabel",
      title: "Hero Label (Eyebrow)",
      type: "string",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryCtaText",
      title: "Primary CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "primaryCtaLink",
      title: "Primary CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "secondaryCtaLink",
      title: "Secondary CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "heroBackgroundVideo",
      title: "Hero Background Video URL",
      type: "string",
      description: "Direct URL of video (e.g. from Cloudinary)",
    }),
    defineField({
      name: "heroPosterImage",
      title: "Hero Poster Image",
      type: "image",
      options: { hotspot: true },
      description: "Fallback image while video loads or for mobile if needed",
    }),
    defineField({
      name: "overlayStrength",
      title: "Overlay Strength (0-100)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
});
