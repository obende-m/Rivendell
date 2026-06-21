import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GhostBorder } from "@/components/ui/GhostBorder";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";

export const metadata: Metadata = {
  title: "Real Estate Developments",
  description:
    "Rivendell Consults curates landmark real estate developments, high-yield luxury estates, and strategic equity participations.",
};

export default function DevelopmentsPage() {
  const currentEstates = [
    {
      name: "The Obsidian Pavilion",
      loc: "LAKE COMO, ITALY",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX0IwtUBIchOxFojD1zTekWUSEJUc_McJq3nw49sOGjvhD6H5Ci0vUlGmnSeKA3edTiXmj52W1Vo_77dW0yUS9cblirZd2CKV3FD_6Uotyl8-of0jUjuJRg3XzMxv8C5nC6LLHn83A6wh36vBcj9wSaU9jZQt7KNkIxe3QUGPiSMd89-LrSCTaN4xYO1BXa0Bl1MnUVG6Clph7I_f0-IEHsGBrjdXtbS68jp1q-HS9-HRDuiRx8eJWe6EyW6dRJt3ZBT6Yuez-px43",
      span: "md:col-span-8 h-[600px]",
    },
    {
      name: "Pine Sanctuary",
      loc: "ASPEN, COLORADO",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvglu6mq8q0QhF6DZBDHpEplpQtWtgTQhlf61x98dOJM0Jh_Q8AZXSN4AGVkllwKF6N1staoZ6a8xLUE8Jj5VlU8qI6G-HYfCuDSfcgSL2IioHc3nciOk0x178SpEF7q5QZdVWqDiPntiTkXOuSbX3IVBFoTznAwEPU_Z0cFc-04YyrlZ9f0TI6iswh5hp8lYefYs2zr8Z-SyB9Ri8gTj-AFbELcO9WwMao6wP-negD6VyhfF8MK1lFnN6hXkrjlY8zhtGLMqu7Z7q",
      span: "md:col-span-4 h-[600px]",
    },
    {
      name: "Aura Heights",
      loc: "LONDON, UK",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBheL9Ep_gLtmdBCLU8F4pI9t94_JZbDR_YsFC2y4STQXgxy8ywPVAEv07BbnGM3Vijw-I_JLbHCFnvJYuPhK6VF499L5PsInEZceZ23Wus6fY9rT_xX06MHEsLcfgFYLZHyhbfe3jOns93gpeHJTQ6VomHoHJgmOk8RR3ItDl2--8c75PaZYTqtXu6pewDBXZyWBTHTFsVvyAOCybIOSOKceiwnw-fC4e6PtEybkufSUaz6mL7iezpgEDEVfXitIEfCY5AjK-urK4d",
      span: "md:col-span-4 h-[400px]",
    },
    {
      name: "Zenith Garden Villas",
      loc: "DUBAI, UAE",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKlLXCG022-ei6GMWnqZfkm24SErAukrCiLXaDyPVutIYFNt3fgba08lfewGJhnyH-DoNN27ZaYvE_xkkjZs5q2Y-TLk9F1XqaKbbcpZ30ipyCn1puyqaWfwaKlCYzs2fyGDNBeE3o3Q9JYKVty_IYHSh2r6rtywrsvJbtZ73y5gJ__4f3sLw3RYrmmA2PhIjnRxDZwxUTrBaQqoZD8FdaGDX7E_YGoy__r8JU2xYB8lQSO9PR6SKpgGUmo8xk5Eg4qRWVV1rhY-42",
      span: "md:col-span-8 h-[400px]",
    },
  ];

  return (
    <div className="bg-background text-on-surface select-none">
      {/* Hero */}
      <header className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Luxury Estate Development"
            className="w-full h-full object-cover brightness-50 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSHW0bXtcppHQ0WEs1Kthkm3bxQ6cH2xmnLqa0kokjJ7BVtji1bJAufZx1jWAIlxOBR-ORRlEj7Nxj4jyPSr0pZzU4splpwprU0D1ryqn1D9ym62CJxBbor6c_NQxG2JrWCViprp8rzb-pWFA3-S8TPfSKxZM-7XnC0VuqPTX_TERj00SyfkA3R2x2GCiL7-YLRPIWc0cew5YJkQUxQp0BqjWrRXvvhwcjsotM8Oam2ybLb4nz7DNawhxCb-sxxLKt_kSOzBTH7zcP"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        </div>
        <div className="relative z-10 text-center max-w-4xl section-container mx-auto">
          <RevealOnScroll y={15}>
            <span className="font-label-caps text-label-caps text-primary mb-6 tracking-[0.3em] block">
              RESIDENTIAL REDEFINED
            </span>
            <h1 className="font-display-xl text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-tight text-on-surface mb-8">
              Architectural <span className="italic text-primary">Legacies</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Crafting meticulously designed spaces that serve as timeless sanctuaries for the global elite. Where precision engineering meets ethereal luxury.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#masterpieces">
                <Button variant="primary">Explore Estates</Button>
              </Link>
              <Link href="#prospectus">
                <Button variant="outline">Request Prospectus</Button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </header>

      {/* Bento Grid Developments */}
      <section className="py-20 md:py-32 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16" id="masterpieces">
        <RevealOnScroll
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
          y={15}
        >
          <div className="max-w-2xl">
            <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest">
              PORTFOLIO
            </span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg">
              Current Masterpieces
            </h2>
          </div>
          <div className="h-[0.5px] flex-grow bg-gold-muted/20 mx-8 mb-4 hidden md:block" />
          <p className="font-body-md text-sm text-on-surface-variant/80 max-w-xs italic border-l border-primary pl-6 leading-relaxed">
            &ldquo;Architecture is the learned game, correct and magnificent, of forms assembled in the light.&rdquo;
          </p>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {currentEstates.map((est) => (
            <div
              key={est.name}
              className={`group relative overflow-hidden project-card bg-surface-container-low border border-gold-muted/5 ${est.span}`}
            >
              <ImageReveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={est.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={est.img}
                />
              </ImageReveal>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <span className="font-label-caps text-[10px] text-on-surface-variant/80 mb-2 block tracking-wider uppercase">
                  {est.loc}
                </span>
                <h3 className="font-display-lg text-2xl md:text-3xl text-on-surface group-hover:text-primary transition-colors duration-500">
                  {est.name}
                </h3>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </section>

      {/* Investment Opportunities */}
      <section className="bg-surface-container py-20 md:py-32 border-t border-gold-muted/10" id="prospectus">
        <div className="section-container max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Blueprint Frame */}
            <div className="relative group lg:pr-12">
              <ImageReveal>
                <div className="ghost-border p-2 bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Investment planning blueprint"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNeYlbOlN33dv8XZv8hhFWZ1xWqLq5A7c-WUEZrk-XBPTuL-QUf4F2p8YrdFXvr0N4po3Xc4wH2uXCpbsMkAQ-IaLOfToipgiy2o565lgEjuqVqtxWMIyswHLRx8EhdlZScNCyYyWi6hrY6YKERGLnQ-Oi5xuIR6KlyTJi6uUZGF6Ugy7NYZYrHK_mNrYb367HbxNEhWklTTvbPjHQQ-n5tWu8XUnurkEhaRBgjrjxCPktB0_40BfecTVMzErbcsDTkihOPXqog2NT"
                  />
                </div>
              </ImageReveal>
              <div className="absolute -bottom-10 -right-6 hidden xl:flex flex-col bg-primary p-8 text-on-primary select-none cursor-default shadow-xl shadow-primary/20">
                <span className="font-display-lg text-[64px] leading-none font-bold">18%</span>
                <span className="font-label-caps text-[10px] tracking-widest uppercase">
                  Target Annual Yield
                </span>
              </div>
            </div>

            {/* Right details */}
            <RevealOnScroll className="space-y-8" y={15}>
              <span className="font-label-caps text-label-caps text-primary tracking-widest block">
                FOR PARTNERS
              </span>
              <h2 className="font-display-lg text-3xl md:text-headline-lg leading-tight">
                Strategic Investment Opportunities
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Rivendell Consults offers exclusive participation in our Tier-1 development projects. We focus on high-yield, low-volatility real estate assets in prime global corridors.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    icon: "verified",
                    title: "Equity Participation",
                    desc: "Direct ownership stakes in landmark developments with structured exit strategies.",
                  },
                  {
                    icon: "insights",
                    title: "Data-Driven Site Selection",
                    desc: "Proprietary analytics identifying emerging luxury pockets before market saturation.",
                  },
                  {
                    icon: "security",
                    title: "End-to-End Governance",
                    desc: "Rigorous financial oversight from land acquisition to final unit delivery.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4 items-start">
                    <span className="material-symbols-outlined text-primary text-2xl mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-body-md font-bold text-on-surface text-sm">
                        {item.title}
                      </h4>
                      <p className="font-body-md text-sm text-on-surface-variant/80 leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary">Request Prospectus</Button>
                <Button variant="outline">Partner Dashboard</Button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Brand Quote */}
      <section className="py-20 md:py-32 relative overflow-hidden select-none border-b border-gold-muted/10">
        <div className="section-container max-w-[1440px] mx-auto relative z-10">
          <RevealOnScroll className="max-w-4xl border-l-2 border-primary pl-8 md:pl-12" y={15}>
            <p className="font-display-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-tight text-on-surface">
              &ldquo;We do not build houses; we curate experiences of permanence and peace. Every stone laid is a testament to architectural precision and the enduring legacy of our patrons.&rdquo;
            </p>
            <div className="mt-8 md:mt-12">
              <span className="font-label-caps text-label-caps text-primary tracking-widest block uppercase text-xs">
                — ALISTAIR VANCE, CHIEF ARCHITECT
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Booking call final CTA */}
      <section className="py-16 text-center bg-surface-container-low">
        <Link href="/contact">
          <Button variant="primary" className="tracking-[0.25em]">
            BOOK PRIVATE PORTFOLIO INSPECTION
          </Button>
        </Link>
      </section>
    </div>
  );
}
