import { defineType, defineField } from "sanity";

export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g., '120', '98'",
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "e.g., '+', '%', 'M'",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "e.g., 'Completed Projects'",
    }),
  ],
});
