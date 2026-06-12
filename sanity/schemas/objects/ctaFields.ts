import { defineType, defineField } from "sanity";

export const ctaFields = defineType({
  name: "ctaFields",
  title: "CTA Fields",
  type: "object",
  fields: [
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
    }),
    defineField({
      name: "ctaBackgroundImage",
      title: "CTA Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
