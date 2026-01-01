import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: "sm" | "default" | "lg" | "xl" | "full";
  spacing?: "sm" | "default" | "lg" | "xl";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, containerSize = "xl", spacing = "default", children, ...props }, ref) => {
    const spacingClasses = {
      sm: "py-12 md:py-16",
      default: "py-16 md:py-20",
      lg: "py-20 md:py-24",
      xl: "py-24 md:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };
