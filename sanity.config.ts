import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Rivendell Consults Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Rivendell Content")
          .items([
            // Singletons (Globals)
            S.listItem()
              .title("Global Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Homepage Setup")
              .child(S.document().schemaType("homepage").documentId("homepage")),
            S.listItem()
              .title("Navigation Menu")
              .child(S.document().schemaType("navigation").documentId("navigation")),
            S.listItem()
              .title("Footer Content")
              .child(S.document().schemaType("footer").documentId("footer")),
            S.listItem()
              .title("Contact Information")
              .child(S.document().schemaType("contactInfo").documentId("contactInfo")),
            S.listItem()
              .title("SEO & Search Settings")
              .child(S.document().schemaType("seoSettings").documentId("seoSettings")),
            S.divider(),
            // Regular Documents
            ...S.documentTypeListItems().filter(
              (item) =>
                ![
                  "siteSettings",
                  "homepage",
                  "navigation",
                  "footer",
                  "contactInfo",
                  "seoSettings",
                ].includes(item.getId() || "")
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
