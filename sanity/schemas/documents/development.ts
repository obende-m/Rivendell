import { defineType, defineField } from "sanity";

export const development = defineType({
  name: "development",
  title: "Real Estate Developments",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Development Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Development Status",
      type: "string",
      options: {
        list: [
          { title: "Planning", value: "planning" },
          { title: "Under Construction", value: "construction" },
          { title: "Selling / Leasing", value: "selling" },
          { title: "Completed", value: "completed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location / Address",
      type: "string",
    }),
    defineField({
      name: "overview",
      title: "Overview Narrative (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Pillars / Key Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videos",
      title: "Video Links (Cloudinary / MP4)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "downloads",
      title: "Brochures / Architectural Plans",
      type: "array",
      of: [
        {
          type: "file",
          title: "Downloadable Document",
          fields: [{ name: "label", type: "string", title: "Document Label" }],
        },
      ],
    }),
    defineField({
      name: "inquiryFormEnabled",
      title: "Enable Direct Inquiry Booking Form",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "cta",
      title: "CTA Overrides",
      type: "ctaFields",
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seo",
    }),
  ],
});
