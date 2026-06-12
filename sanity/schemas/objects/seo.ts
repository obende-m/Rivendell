import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) => Rule.max(60).warning("Should be under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160).warning("Should be under 160 characters"),
    }),
    defineField({
      name: "shareImage",
      title: "Share Image (OpenGraph)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
