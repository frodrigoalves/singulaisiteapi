import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NetworkBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  network: "mainnet" | "sepolia" | "goerli" | "polygon" | "arbitrum";
  showDot?: boolean;
  size?: "sm" | "default" | "lg";
}

const networkConfig = {
  mainnet: {
    label: "Ethereum Mainnet",
    shortLabel: "Mainnet",
    color: "bg-green-500",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  sepolia: {
    label: "Sepolia Testnet",
    shortLabel: "Sepolia",
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  goerli: {
    label: "Goerli Testnet",
    shortLabel: "Goerli",
    color: "bg-blue-500",
    textColor: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  polygon: {
    label: "Polygon",
    shortLabel: "Polygon",
    color: "bg-purple-500",
    textColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  arbitrum: {
    label: "Arbitrum",
    shortLabel: "Arbitrum",
    color: "bg-blue-400",
    textColor: "text-blue-300",
    bgColor: "bg-blue-400/10",
  },
};

const NetworkBadge = React.forwardRef<HTMLDivElement, NetworkBadgeProps>(
  ({ className, network, showDot = true, size = "default", ...props }, ref) => {
    const config = networkConfig[network];

    const sizeClasses = {
      sm: "text-xs px-2 py-0.5",
      default: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-medium",
          config.bgColor,
          config.textColor,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showDot && (
          <span className={cn("w-2 h-2 rounded-full animate-pulse", config.color)} />
        )}
        <span>{size === "sm" ? config.shortLabel : config.label}</span>
      </div>
    );
  }
);
NetworkBadge.displayName = "NetworkBadge";

export { NetworkBadge };
