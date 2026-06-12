import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Rivendell Consults for bespoke architectural designs, luxury constructions, and premium real estate assets in Lagos and Lusaka.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-on-surface select-none">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col justify-center max-w-[1440px] mx-auto px-6 md:px-16 pt-16 pb-8 overflow-hidden">
        <div className="grid grid-cols-12 w-full">
          <RevealOnScroll className="col-span-12 md:col-span-8 space-y-6" y={15}>
            <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-2">
              ESTABLISH CONNECTION
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-[80px] leading-tight text-on-surface mb-8">
              Let&apos;s define the future of your{" "}
              <span className="italic text-primary">vision.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Whether you are initiating a bespoke architectural commission or seeking strategic real estate counsel, our partners are ready to engage.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Split Section */}
      <section className="py-20 bg-surface-container-low px-6 md:px-16 border-t border-gold-muted/10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: HQ details */}
          <div className="space-y-12">
            <RevealOnScroll className="space-y-8" y={15}>
              <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface">
                Nigeria HQ
              </h2>
              <div className="space-y-8 font-body-md text-sm text-on-surface-variant">
                {/* Address */}
                <div className="flex items-start gap-6 group">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1 select-none">
                    location_on
                  </span>
                  <div>
                    <p className="font-label-caps text-[10px] text-primary mb-2 tracking-widest uppercase">
                      OFFICE ADDRESS
                    </p>
                    <p className="font-body-lg text-lg text-on-surface leading-relaxed">
                      12B Ikoyi Crescent,
                      <br />
                      Ikoyi, Lagos, Nigeria
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-6 group">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1 select-none">
                    call
                  </span>
                  <div>
                    <p className="font-label-caps text-[10px] text-primary mb-2 tracking-widest uppercase">
                      TELEPHONE
                    </p>
                    <p className="font-body-lg text-lg text-on-surface hover:text-primary transition-colors cursor-pointer leading-relaxed">
                      +234 810 555 0123
                    </p>
                    <p className="font-body-lg text-lg text-on-surface hover:text-primary transition-colors cursor-pointer leading-relaxed">
                      +234 902 444 0987
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6 group">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1 select-none">
                    mail
                  </span>
                  <div>
                    <p className="font-label-caps text-[10px] text-primary mb-2 tracking-widest uppercase">
                      EMAIL ENQUIRIES
                    </p>
                    <p className="font-body-lg text-lg text-on-surface hover:text-primary transition-colors cursor-pointer">
                      concierge@rivendell.com
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-6 group">
                  <span className="material-symbols-outlined text-primary text-3xl mt-1 select-none">
                    schedule
                  </span>
                  <div>
                    <p className="font-label-caps text-[10px] text-primary mb-2 tracking-widest uppercase">
                      BUSINESS HOURS
                    </p>
                    <p className="font-body-lg text-lg text-on-surface">
                      Mon — Fri: 09:00 - 18:00
                    </p>
                    <p className="font-body-lg text-lg text-on-surface">
                      Sat: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Instant buttons */}
            <RevealOnScroll
              className="pt-12 border-t border-gold-muted/20 space-y-6"
              y={15}
              delay={0.15}
            >
              <h3 className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">
                Instant Reach
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/2348105550123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-label-caps text-xs tracking-widest hover:brightness-105 transition-all select-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  WHATSAPP DIRECT
                </a>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 border border-on-surface/20 text-on-surface font-label-caps text-xs tracking-widest hover:border-primary hover:text-primary transition-all select-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  SCHEDULE CALL
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Contact Form */}
          <RevealOnScroll className="w-full" y={15} delay={0.2}>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[500px] relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-low">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover grayscale opacity-45 mix-blend-luminosity scale-105"
            alt="Lagos drone landscape"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH0BvRzhP2yWsMjgNxCPGbBG0N2lxPThqHA1yvwwO4KlrhFlJLjm0NipKxm-E3igB8kEnBtGKwjSghI8icvbT8-4HzNDhuPAQTULNLlcgq17HOCTsoaclxKGzAaIB_GoWfAd7C9C6ggYqHWO8eD4N95Q4e2MxmcKhe5nZp8jbNdmoxckymqa57EKfP7Jrw9xdpjCxxZm_0jo146plGVmZyHgreL4symY9fwr4SZgPpZ1aPdsjUW-ZnBPkkt7qLC_JEYytjY_JYYtX4"
          />
        </div>
        {/* Custom ping coords pin overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-12 bg-primary rounded-full animate-ping absolute opacity-25" />
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center relative shadow-[0_0_40px_rgba(240,200,116,0.4)]">
              <span className="material-symbols-outlined text-on-primary">location_on</span>
            </div>
            <div className="absolute top-16 bg-surface px-4 py-2 border border-primary/20 pointer-events-auto min-w-[220px] text-center glass-panel">
              <p className="font-label-caps text-[8px] text-primary mb-1 tracking-widest">
                RIVENDELL HEADQUARTERS
              </p>
              <p className="font-display-lg text-xs text-on-surface">
                12B Ikoyi Crescent, Lagos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence numbers summary */}
      <section className="py-20 px-6 md:px-16 border-t border-gold-muted/10 bg-background">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <RevealOnScroll y={15}>
              <h4 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface-variant">
                Global <span className="italic text-primary">Insight,</span> Local Mastery.
              </h4>
            </RevealOnScroll>
            <StaggerChildren className="grid grid-cols-2 gap-12 md:gap-20">
              <div>
                <span className="font-display-lg text-5xl md:text-6xl text-primary block mb-2 select-none">
                  15+
                </span>
                <span className="font-label-caps text-[9px] tracking-wider text-on-surface-variant/80 uppercase">
                  YEARS OF PRECISION
                </span>
              </div>
              <div>
                <span className="font-display-lg text-5xl md:text-6xl text-primary block mb-2 select-none">
                  200+
                </span>
                <span className="font-label-caps text-[9px] tracking-wider text-on-surface-variant/80 uppercase">
                  PROJECTS COMPLETED
                </span>
              </div>
            </StaggerChildren>
          </div>
        </div>
      </section>
    </div>
  );
}
