import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface WalletButtonProps {
  isConnected: boolean;
  address?: string;
  balance?: string;
  network?: string;
  onDisconnect?: () => void;
}

export function WalletButton({
  isConnected,
  address,
  balance = "0.00",
  network = "base",
  onDisconnect,
}: WalletButtonProps) {
  const { toast } = useToast();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Endereco copiado!",
        description: "O endereco foi copiado para a area de transferencia.",
      });
    }
  };

  const explorerUrl = network === "base" 
    ? `https://basescan.org/address/${address}`
    : `https://etherscan.io/address/${address}`;

  if (!isConnected || !address) {
    return (
      <Button variant="outline" className="gap-2">
        <Wallet className="w-4 h-4" />
        Sem Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="font-mono">{formatAddress(address)}</span>
          <span className="text-muted-foreground">|</span>
          <span>{balance} SGL</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="w-4 h-4 mr-2" />
          Copiar Endereco
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver no Explorer
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDisconnect} className="text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
