import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "icon",
      title: "Material Symbol Icon Name",
      type: "string",
      description: "Name of the Google Material Symbol (e.g. 'architecture', 'engineering')",
    }),
    defineField({
      name: "description",
      title: "Description (Short)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "benefits",
      title: "Benefits / Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [{ type: "processStep" }],
    }),
    defineField({
      name: "supportingImages",
      title: "Supporting Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "caseStudies",
      title: "Linked Projects / Case Studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "cta",
      title: "Custom Section CTA Override",
      type: "ctaFields",
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seo",
    }),
  ],
});
