import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "backdrop-blur-xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white/5 border-white/10",
        elevated: "bg-white/8 border-white/15 shadow-elevated",
        subtle: "bg-white/3 border-white/5",
        solid: "bg-card border-border",
        glow: "bg-white/5 border-primary/30 shadow-glow",
      },
      size: {
        sm: "p-4 rounded-xl",
        default: "p-6 rounded-2xl",
        lg: "p-8 rounded-3xl",
        xl: "p-10 rounded-3xl",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        glow: "hover:shadow-glow hover:border-primary/30",
        scale: "hover:scale-[1.02]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "none",
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, size, hover, className }))}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };
