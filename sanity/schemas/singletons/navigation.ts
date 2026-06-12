import { defineType, defineField } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation Settings",
  type: "document",
  fields: [
    defineField({
      name: "mainMenu",
      title: "Header Main Menu Links",
      type: "array",
      of: [{ type: "navItem" }],
    }),
    defineField({
      name: "ctaButton",
      title: "Header Action CTA Button",
      type: "object",
      fields: [
        { name: "text", type: "string", title: "Button Text", initialValue: "Book Consultation" },
        { name: "href", type: "string", title: "Link URL", initialValue: "/contact" },
      ],
    }),
    defineField({
      name: "mobileMenu",
      title: "Mobile View Overrides (Optional)",
      type: "array",
      of: [{ type: "navItem" }],
      description: "Leave empty to reuse the main header menu links on mobile",
    }),
  ],
});
