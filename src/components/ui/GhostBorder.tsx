import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GhostBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
}

export function GhostBorder({ children, strong = false, className, ...props }: GhostBorderProps) {
  return (
    <div
      className={cn(
        strong ? "ghost-border-strong" : "ghost-border",
        "bg-surface-container-low/40 backdrop-blur-sm border-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
