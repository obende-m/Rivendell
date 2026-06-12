import { defineType, defineField } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "Global Contact Info",
  type: "document",
  fields: [
    defineField({
      name: "offices",
      title: "Offices Presence List",
      type: "array",
      of: [
        {
          type: "object",
          name: "officeItem",
          fields: [
            { name: "name", type: "string", title: "Office Name / Location Title (e.g. Lagos Head Office)" },
            { name: "address", type: "text", title: "Physical Address", rows: 3 },
            {
              name: "phone",
              type: "array",
              title: "Phone Numbers List",
              of: [{ type: "string" }],
            },
            { name: "email", type: "string", title: "Email Address" },
            { name: "hours", type: "string", title: "Business Hours (e.g. Mon - Fri: 9am - 5pm)" },
            {
              name: "mapImage",
              type: "image",
              title: "Map Representation Image",
              options: { hotspot: true },
            },
            {
              name: "coordinates",
              type: "object",
              title: "Map Coordinates (Optional)",
              fields: [
                { name: "lat", type: "number", title: "Latitude" },
                { name: "lng", type: "number", title: "Longitude" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number Link",
      type: "string",
      description: "e.g., '+2348000000000' (include country code, no spaces)",
    }),
    defineField({
      name: "calendlyLink",
      title: "Calendly Scheduling URL Link",
      type: "string",
      description: "Full URL (e.g. https://calendly.com/your-firm)",
    }),
  ],
});
