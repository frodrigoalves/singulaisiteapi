import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "./glass-card";
import { LucideIcon } from "lucide-react";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  action?: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, title, value, subtitle, icon: Icon, trend, action, ...props }, ref) => {
    return (
      <GlassCard
        ref={ref}
        variant="default"
        size="default"
        hover="glow"
        className={cn("relative overflow-hidden group", className)}
        {...props}
      >
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-small text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-h3 font-bold text-foreground">{value}</span>
              {trend && (
                <span
                  className={cn(
                    "text-small font-medium",
                    trend.isPositive ? "text-green-400" : "text-red-400"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-caption text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {Icon && (
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>
        
        {action && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {action}
          </div>
        )}
      </GlassCard>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard };
