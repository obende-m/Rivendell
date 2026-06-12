import { defineType, defineField } from "sanity";

export const seoSettings = defineType({
  name: "seoSettings",
  title: "Global SEO & Script Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteUrl",
      title: "Canonical Site URL",
      type: "string",
      initialValue: "https://rivendell.ng",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitleTemplate",
      title: "Title Template Override",
      type: "string",
      description: "e.g., '%s | Rivendell Consults'",
      initialValue: "%s | Rivendell Consults",
    }),
    defineField({
      name: "robotsTxt",
      title: "Robots.txt Content Overwrite",
      type: "text",
      rows: 4,
      initialValue: "User-agent: *\nAllow: /\nSitemap: https://rivendell.ng/sitemap.xml",
    }),
    defineField({
      name: "siteVerificationGoogle",
      title: "Google Search Console Verification Tag",
      type: "string",
    }),
  ],
});
