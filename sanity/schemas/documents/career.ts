import { defineType, defineField } from "sanity";

export const career = defineType({
  name: "career",
  title: "Careers / Jobs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Engineering / Construction", value: "engineering" },
          { title: "Project Management", value: "project-management" },
          { title: "Sales & Marketing", value: "sales-marketing" },
          { title: "Administration", value: "administration" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Office Location",
      type: "string",
      initialValue: "Lagos, Nigeria",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Job Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
        ],
      },
      initialValue: "full-time",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Job Description (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Job Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "benefits",
      title: "Salary & Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "applicationDeadline",
      title: "Application Deadline",
      type: "date",
    }),
    defineField({
      name: "active",
      title: "Job Listing Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
