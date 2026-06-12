import { defineType, defineField } from "sanity";

export const galleryAlbum = defineType({
  name: "galleryAlbum",
  title: "Gallery Albums",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Album Name",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interior Design", value: "interior" },
          { title: "Construction", value: "construction" },
          { title: "Real Estate", value: "real-estate" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Album Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "date",
      title: "Album Date",
      type: "date",
    }),
    defineField({
      name: "items",
      title: "Album Media Items",
      type: "array",
      of: [{ type: "galleryItem" }],
    }),
    defineField({
      name: "featured",
      title: "Featured Album",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
});
