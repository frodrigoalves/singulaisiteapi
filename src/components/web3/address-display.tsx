import * as React from "react";
import { cn } from "@/lib/utils";
import { Copy, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface AddressDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
  truncate?: boolean;
  showCopy?: boolean;
  showEtherscan?: boolean;
  size?: "sm" | "default" | "lg";
}

const truncateAddress = (address: string, startChars = 6, endChars = 4) => {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

const AddressDisplay = React.forwardRef<HTMLDivElement, AddressDisplayProps>(
  (
    {
      className,
      address,
      truncate = true,
      showCopy = true,
      showEtherscan = true,
      size = "default",
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);

    const displayAddress = truncate ? truncateAddress(address) : address;

    const handleCopy = async () => {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    };

    const handleEtherscan = () => {
      window.open(`https://sepolia.etherscan.io/address/${address}`, "_blank");
    };

    const sizeClasses = {
      sm: "text-xs gap-1",
      default: "text-sm gap-2",
      lg: "text-base gap-2",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center font-mono bg-secondary/50 rounded-lg px-3 py-1.5",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <span className="text-foreground">{displayAddress}</span>
        
        {showCopy && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
        )}
        
        {showEtherscan && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleEtherscan}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    );
  }
);
AddressDisplay.displayName = "AddressDisplay";

export { AddressDisplay };
