import { defineType, defineField } from "sanity";

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link / Anchor",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isMegaMenu",
      title: "Is Mega Menu / Has Children",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "children",
      title: "Sub-items",
      type: "array",
      of: [
        {
          type: "object",
          name: "subItem",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
      hidden: ({ parent }) => !parent?.isMegaMenu,
    }),
  ],
});
