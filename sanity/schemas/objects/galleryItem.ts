import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image File",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== "image",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
      description: "Direct link to video file (Cloudinary / MP4)",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "caption",
      title: "Caption / Description",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category Alignment",
      type: "string",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interior Design", value: "interior" },
          { title: "Construction", value: "construction" },
          { title: "Real Estate", value: "real-estate" },
        ],
      },
    }),
  ],
});
