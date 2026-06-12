import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyDescription",
      title: "Company Description Text",
      type: "text",
      rows: 3,
      description: "Brief brand paragraph in the first column",
    }),
    defineField({
      name: "logo",
      title: "Footer Logo Asset",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "columns",
      title: "Link Columns",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerColumn",
          fields: [
            { name: "heading", type: "string", title: "Column Title" },
            {
              name: "links",
              type: "array",
              title: "Links",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Link Label" },
                    { name: "href", type: "string", title: "Link URL" },
                  ],
                },
              ],
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Platforms List",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "legalLinks",
      title: "Legal Links (Bottom Bar)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter Block",
      type: "object",
      fields: [
        { name: "heading", type: "string", title: "Heading", initialValue: "Subscribe" },
        { name: "description", type: "text", title: "Description", rows: 2, initialValue: "Sign up to receive our latest insights and architectural updates." },
        { name: "placeholder", type: "string", title: "Input Placeholder", initialValue: "Your email address" },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Notice Text",
      type: "string",
      initialValue: "© 2026 Rivendell Consults. All rights reserved.",
    }),
    defineField({
      name: "certifications",
      title: "Certifications / Affiliates Logos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
