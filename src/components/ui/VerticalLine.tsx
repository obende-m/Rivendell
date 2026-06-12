import { cn } from "@/lib/utils";

interface VerticalLineProps {
  tall?: boolean;
  className?: string;
}

export function VerticalLine({ tall = false, className }: VerticalLineProps) {
  return (
    <div
      className={cn(
        tall ? "vertical-line-tall" : "vertical-line",
        className
      )}
    />
  );
}
