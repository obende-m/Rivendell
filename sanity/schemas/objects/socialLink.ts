import { defineType, defineField } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Facebook", value: "facebook" },
          { title: "Twitter / X", value: "twitter" },
          { title: "YouTube", value: "youtube" },
        ],
      },
    }),
    defineField({
      name: "url",
      title: "URL Link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
