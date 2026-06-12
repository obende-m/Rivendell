import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project Name",
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
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Mixed-Use", value: "mixed-use" },
          { title: "Interior Design", value: "interior" },
          { title: "Architecture", value: "architecture" },
          { title: "Construction", value: "construction" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Planning", value: "planning" },
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Display in high-priority homepage slots",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers display first",
      initialValue: 0,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Grid Card Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Large full-width image for details top section",
    }),
    defineField({
      name: "gallery",
      title: "Project Media Gallery",
      type: "array",
      of: [{ type: "galleryItem" }],
    }),
    // Project Specifications Panel
    defineField({
      name: "location",
      title: "Location / Address",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year of Completion",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Project Duration",
      type: "string",
    }),
    defineField({
      name: "budget",
      title: "Project Budget / Value",
      type: "string",
    }),
    // Editorial Narrative Text
    defineField({
      name: "description",
      title: "Description (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "approach",
      title: "Our Approach",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "solution",
      title: "The Solution",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "results",
      title: "Project Results / Metrics",
      type: "text",
      rows: 4,
    }),
    // Integrations
    defineField({
      name: "servicesUsed",
      title: "Services Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "architect",
      title: "Lead Architect",
      type: "string",
    }),
    defineField({
      name: "contractor",
      title: "Lead Contractor / Partner",
      type: "string",
    }),
    defineField({
      name: "downloads",
      title: "Brochures / Downloads",
      type: "array",
      of: [
        {
          type: "file",
          title: "Downloadable File",
          fields: [{ name: "label", type: "string", title: "File Label" }],
        },
      ],
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "seo",
    }),
  ],
});
