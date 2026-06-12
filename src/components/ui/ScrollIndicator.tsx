import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center select-none", className)}>
      <p className="font-label-caps text-[9px] tracking-[0.35em] uppercase mb-4 opacity-40 text-on-surface">
        Scroll to Explore
      </p>
      <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
        <div className="scroll-dot absolute top-0 left-0 w-full h-4 bg-primary" />
      </div>
    </div>
  );
}
