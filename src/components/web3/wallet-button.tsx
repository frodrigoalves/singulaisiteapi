import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AddressDisplay } from "./address-display";
import { NetworkBadge } from "./network-badge";
import { Wallet, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  isConnected?: boolean;
  address?: string;
  balance?: string;
  network?: "mainnet" | "sepolia" | "goerli" | "polygon" | "arbitrum";
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const WalletButton = React.forwardRef<HTMLDivElement, WalletButtonProps>(
  (
    {
      className,
      isConnected = false,
      address,
      balance,
      network = "sepolia",
      onConnect,
      onDisconnect,
      ...props
    },
    ref
  ) => {
    if (!isConnected) {
      return (
        <Button
          variant="hero"
          size="default"
          onClick={onConnect}
          className={cn("gap-2", className)}
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      );
    }

    return (
      <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
        <NetworkBadge network={network} size="sm" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="glass" className="gap-2 pl-3 pr-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{balance} SGL</div>
                  <div className="text-sm font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-card border-border">
            <div className="px-3 py-2">
              <AddressDisplay address={address || ""} size="sm" />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View on Etherscan</DropdownMenuItem>
            <DropdownMenuItem>Copy Address</DropdownMenuItem>
            <DropdownMenuItem>Switch Wallet</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDisconnect} className="text-destructive">
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);
WalletButton.displayName = "WalletButton";

export { WalletButton };
