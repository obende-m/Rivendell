import { getSiteSettings, getContactInfo, getFooter } from "@/lib/sanity/queries";

export async function JsonLd() {
  const settings = await getSiteSettings();
  const contact = await getContactInfo();
  const footer = await getFooter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rivendellconsults.com";

  const siteName = settings?.siteName || "Rivendell Consults";
  const logoUrl = settings?.logo?.asset?.url || `${baseUrl}/images/logo.png`;

  // Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": baseUrl,
    "logo": logoUrl,
    "sameAs": footer?.socialLinks?.map((link) => link.url) || [],
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": baseUrl,
  };

  // LocalBusiness schemas for each office
  const businessSchemas = contact?.offices?.map((office) => {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": `${siteName} - ${office.name}`,
      "image": office.mapImage?.asset?.url || logoUrl,
      "telephone": office.phone?.[0] || "",
      "email": office.email || "",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": office.address,
      },
      "url": baseUrl,
    };
  }) || [];

  const allSchemas = [orgSchema, websiteSchema, ...businessSchemas];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
    />
  );
}
