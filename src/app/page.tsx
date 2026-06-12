import { getHomepageData } from "@/lib/sanity/queries";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { DivisionsSection } from "@/components/sections/DivisionsSection";
import { SignatureProjects } from "@/components/sections/SignatureProjects";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export const revalidate = 3600; // Cache for 1 hour (ISR)

export default async function Home() {
  const data = await getHomepageData();

  return (
    <div className="flex flex-col w-full">
      <HeroSection data={data?.hero} />
      <StatsSection stats={data?.stats} />
      <AboutPreview
        eyebrow={data?.aboutEyebrow}
        heading={data?.aboutHeading}
        description={data?.aboutDescription}
        ctaText={data?.aboutCtaText}
        ctaLink={data?.aboutCtaLink}
        image1={data?.aboutImage1}
        image2={data?.aboutImage2}
      />
      <DivisionsSection
        eyebrow={data?.divisionsEyebrow}
        heading={data?.divisionsHeading}
        divisions={data?.divisionsList}
      />
      <SignatureProjects
        eyebrow={data?.projectsEyebrow}
        heading={data?.projectsHeading}
        ctaText={data?.projectsCtaText}
        projects={data?.featuredProjects}
      />
      <ServicesGrid
        eyebrow={data?.servicesEyebrow}
        heading={data?.servicesHeading}
      />
      <TestimonialsSection
        heading={data?.testimonialsHeading}
        testimonials={data?.featuredTestimonials}
      />
      <CTASection data={data?.sectionCta} />
    </div>
  );
}
