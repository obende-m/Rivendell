import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "font-label-caps text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer text-center focus:outline-none select-none",
        variant === "primary" &&
          "bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed px-12 py-5 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/5 border-none",
        variant === "secondary" &&
          "bg-stone text-background hover:bg-on-surface px-12 py-5 hover:scale-[1.02] active:scale-[0.98] border-none",
        variant === "outline" &&
          "ghost-border text-on-surface hover:bg-on-surface/5 px-12 py-5 hover:scale-[1.02] active:scale-[0.98]",
        variant === "ghost" &&
          "text-primary border-b border-primary/40 pb-1 hover:border-primary hover:text-primary-fixed tracking-widest",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
