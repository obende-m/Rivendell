import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({ eyebrow, heading, align = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-20",
        align === "left" && "items-start text-left",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className
      )}
    >
      {eyebrow && (
        <span className="font-label-caps text-label-caps text-primary mb-4 tracking-[0.4em] uppercase block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight max-w-3xl">
        {heading}
      </h2>
    </div>
  );
}
