"use client";

import { Testimonial } from "@/lib/sanity/types";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  heading?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  heading = "Voices of Prestige",
  testimonials,
}: TestimonialsSectionProps) {
  // Use provided testimonials, or default to 9 premium testimonials
  const list: Testimonial[] = testimonials && testimonials.length > 0 ? testimonials : ([
    {
      _id: "test-1",
      name: "Julian Sterling",
      position: "Principal Developer",
      company: "Sterling Estates",
      testimonial: "The attention to detail displayed by Rivendell is unparalleled. They didn't just build a home; they crafted a legacy for my family that breathes with life and architectural intelligence.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-2",
      name: "Elena Vance",
      position: "Chief Executive",
      company: "Vance Developments",
      testimonial: "Rivendell's ability to navigate complex urban developments while maintaining a pure architectural vision is why they remain our primary choice for luxury construction.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-3",
      name: "Marcus Thorne",
      position: "Managing Director",
      company: "Thorne & Co.",
      testimonial: "From excavation to the final finishes, their commitment to structural integrity and refined aesthetics is exemplary. They are true masterbuilders.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-4",
      name: "Dr. Amara Ndubisi",
      position: "Founder",
      company: "The Canopy Space",
      testimonial: "Their sustainable, green-certified design approach transformed our commercial pavilion into a living breathing ecosystem that our clients adore.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-5",
      name: "Victoria Sterling",
      position: "Art Curator",
      company: "Sterling Art Trust",
      testimonial: "The interior atrium spacing, lighting design, and raw stone fireplaces they crafted for our gallery are works of art themselves.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-6",
      name: "Adebayo Adeyemi",
      position: "Managing Partner",
      company: "Oakwood Partners",
      testimonial: "Rivendell Consults delivered our corporate headquarters on schedule and under budget, without compromising on a single detail of their magnificent design.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-7",
      name: "Tariq Al-Mansoor",
      position: "Developer",
      company: "Al-Mansoor Waterfront",
      testimonial: "Their coastal masterplanning is world-class. The waterfront layout and cantilevered structures they designed set a new standard for luxury.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-8",
      name: "Sophia Chen",
      position: "Interior Architect",
      company: "Studio Chen",
      testimonial: "Working alongside Rivendell is always inspiring. Their craftsmanship team executes complex custom carpentry and stone installations with flawless precision.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-9",
      name: "Chinedu Okafor",
      position: "Owner",
      company: "The Obsidian Villa",
      testimonial: "The obsidian structural framing and glass interfaces they created are phenomenal. Truly Lagos's most innovative architectural firm.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-10",
      name: "Aisha Bello",
      position: "Interior Stylist",
      company: "Bello Interiors",
      testimonial: "The custom woodwork and marble detailing Rivendell executed for our penthouse projects is unmatched. Their attention to tolerances is a designer's dream.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-11",
      name: "Christian Sterling",
      position: "Managing Partner",
      company: "Sterling Capital",
      testimonial: "Investing in Rivendell developments has consistently yielded outstanding returns. Their project management division is transparent, professional, and precise.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-12",
      name: "Nnamdi Azikiwe",
      position: "Owner",
      company: "The Glass Pavilion",
      testimonial: "They delivered a cantilevered structural glass masterpiece that suspended beautifully over the hillside. Truly a remarkable engineering feat.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-13",
      name: "Zainab Yusuf",
      position: "Director",
      company: "Eko Tech Hub",
      testimonial: "Rivendell transformed our open-plan offices into a hybrid workspace that boosts collaboration. Their lighting design and acoustic modeling are top-tier.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-14",
      name: "David Kojo",
      position: "Founder",
      company: "Accra Horizons",
      testimonial: "Their team handled the complex zoning permits, geotechnical surveys, and heavy foundation works seamlessly. Extremely reliable structural partners.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    },
    {
      _id: "test-15",
      name: "Elena Rostova",
      position: "Art Collector",
      company: "The Vault Gallery",
      testimonial: "The minimalist concrete gallery space they built for us features breathtaking light wells and floating partitions. An absolute masterpiece.",
      rating: 5,
      photo: {
        asset: {
          url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
        }
      }
    }
  ] as Testimonial[]);

  // Distribute items into 3 columns
  const col1: Testimonial[] = [];
  const col2: Testimonial[] = [];
  const col3: Testimonial[] = [];

  list.forEach((item, idx) => {
    if (idx % 3 === 0) col1.push(item);
    else if (idx % 3 === 1) col2.push(item);
    else col3.push(item);
  });

  // Helper component to render a single card
  const TestimonialCard = ({ item }: { item: Testimonial }) => {
    const avatarUrl = item.photo?.asset?.url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";
    return (
      <div className="group relative flex flex-col justify-between p-6 rounded-2xl border border-primary/10 bg-surface-container-low/40 backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
        <div>
          {/* Rating */}
          <div className="flex gap-0.5 text-primary mb-4">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary stroke-none animate-pulse" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <p className="text-on-surface-variant/90 text-sm italic font-medium leading-relaxed mb-6">
            &ldquo;{item.testimonial}&rdquo;
          </p>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3 border-t border-gold-muted/10 pt-4 mt-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover border border-primary/10"
            src={avatarUrl}
          />
          <div>
            <h4 className="text-sm font-semibold text-on-surface">{item.name}</h4>
            <p className="text-[11px] text-on-surface-variant/80 font-medium">
              {item.position}
            </p>
            {item.company && (
              <span className="text-[9px] text-primary/80 uppercase tracking-widest font-bold block mt-0.5">
                {item.company}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden flex flex-col items-center">
      <div className="section-container max-w-[1440px] mx-auto text-center relative z-10">
        <RevealOnScroll className="max-w-3xl mx-auto mb-16" y={15}>
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] block mb-3 uppercase">
            TESTIMONIALS
          </span>
          <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface uppercase">
            {heading.includes("Prestige") ? (
              <>
                Voices of <span className="italic text-primary">Prestige</span>
              </>
            ) : (
              heading
            )}
          </h2>
        </RevealOnScroll>
      </div>

      {/* Marquee Area */}
      <div className="relative w-full max-w-[1440px] px-6 md:px-12 lg:px-16 mt-8 h-[650px] overflow-hidden flex gap-6 pause-marquee">
        {/* Top Fade */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />

        {/* Column 1 - scrolls up */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 animate-scroll-up py-4">
            {/* Render 3 times for super long seamless loop */}
            {[...col1, ...col1, ...col1].map((item, idx) => (
              <TestimonialCard key={`c1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Column 2 - scrolls down */}
        <div className="hidden md:flex flex-1 flex-col gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 animate-scroll-down py-4">
            {[...col2, ...col2, ...col2].map((item, idx) => (
              <TestimonialCard key={`c2-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Column 3 - scrolls up */}
        <div className="hidden lg:flex flex-1 flex-col gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 animate-scroll-up py-4">
            {[...col3, ...col3, ...col3].map((item, idx) => (
              <TestimonialCard key={`c3-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
