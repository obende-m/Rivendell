import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Global Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name / Company Name",
      type: "string",
      initialValue: "Rivendell Consults",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Light Logo / Brand Mark",
      type: "image",
      options: { hotspot: true },
      description: "Logo displayed on dark backgrounds",
    }),
    defineField({
      name: "logoDark",
      title: "Dark Logo / Brand Mark",
      type: "image",
      options: { hotspot: true },
      description: "Logo displayed on light backgrounds (if needed)",
    }),
    defineField({
      name: "favicon",
      title: "Favicon File",
      type: "image",
    }),
    defineField({
      name: "companyRegistration",
      title: "Company Registration Info",
      type: "string",
      description: "Legal registration text shown in footer (e.g. 'RC: 123456')",
    }),
    defineField({
      name: "googleAnalyticsId",
      title: "Google Analytics Tracking ID",
      type: "string",
      description: "e.g., 'G-XXXXXXXXXX'",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO Metadata",
      type: "seo",
    }),
  ],
});
