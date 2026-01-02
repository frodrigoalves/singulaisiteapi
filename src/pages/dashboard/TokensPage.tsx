import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWeb3 } from "@/providers/web3-provider";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Coins,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  Loader2,
  RefreshCw,
  Wallet,
  TrendingUp,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "send" | "receive";
  from: string;
  to: string;
  amount: string;
  date: string;
  hash: string;
}

export default function TokensPage() {
  const { walletAddress, sglBalance, ethBalance, refreshBalances, isLoading } = useWeb3();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);
  const [transferring, setTransferring] = useState(false);

  // Carregar wallet do usuario e saldos
  useEffect(() => {
    async function loadWalletAndBalances() {
      if (!user) return;
      
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("wallet_address")
          .eq("user_id", user.id)
          .single();

        if (profile?.wallet_address) {
          // Atualizar o contexto Web3 com o endereco da wallet
          // Isso vai disparar o useEffect do provider que busca os saldos
          const { setWalletAddress } = await import("@/providers/web3-provider").then(m => {
            // Precisamos acessar o contexto de outra forma
            return { setWalletAddress: () => {} };
          });
        }
      } catch (error) {
        console.error("Erro ao carregar wallet:", error);
      }
    }

    loadWalletAndBalances();
  }, [user]);

  // Carregar transacoes do Supabase
  useEffect(() => {
    async function loadTransactions() {
      if (!user) return;
      
      setLoadingTx(true);
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .or(`from_address.eq.${walletAddress},to_address.eq.${walletAddress}`)
          .order("created_at", { ascending: false })
          .limit(10);

        if (data && data.length > 0) {
          const formattedTx = data.map((tx: any) => ({
            id: tx.id,
            type: tx.to_address?.toLowerCase() === walletAddress?.toLowerCase() ? "receive" : "send",
            from: formatAddress(tx.from_address),
            to: formatAddress(tx.to_address),
            amount: `${tx.type === "receive" ? "+" : "-"}${tx.amount} SGL`,
            date: new Date(tx.created_at).toLocaleDateString(),
            hash: formatAddress(tx.tx_hash || ""),
          }));
          setTransactions(formattedTx);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Erro ao carregar transacoes:", error);
        setTransactions([]);
      } finally {
        setLoadingTx(false);
      }
    }

    loadTransactions();
  }, [user, walletAddress]);

  const formatAddress = (address: string) => {
    if (!address || address.length < 10) return address || "-";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Erro",
        description: "Preencha o endereco e o valor",
        variant: "destructive",
      });
      return;
    }

    if (!recipient.startsWith("0x") || recipient.length !== 42) {
      toast({
        title: "Erro",
        description: "Endereco invalido",
        variant: "destructive",
      });
      return;
    }

    setTransferring(true);
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A transferencia on-chain sera implementada em breve.",
    });
    setTransferring(false);
  };

  const handleRefresh = () => {
    refreshBalances();
    toast({
      title: "Atualizando...",
      description: "Buscando saldos da blockchain",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-bold text-foreground">Tokens</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus tokens SGL</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Saldo Principal */}
        <GlassCard variant="glow" size="lg" className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo SGL</p>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  sglBalance
                )}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ETH (Gas)</span>
              <span className="text-foreground font-mono">
                {isLoading ? "..." : ethBalance} ETH
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rede</span>
              <span className="text-foreground">Sepolia Testnet</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Wallet</span>
              <span className="text-foreground font-mono text-xs">
                {walletAddress ? formatAddress(walletAddress) : "Nao conectada"}
              </span>
            </div>
          </div>

          {!walletAddress && (
            <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-xs text-yellow-400">
                Nenhuma wallet vinculada. Va em Configuracoes para importar sua wallet.
              </p>
            </div>
          )}
        </GlassCard>

        {/* Transfer */}
        <GlassCard variant="default" size="lg" className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Transferir SGL
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Endereco do Destinatario
              </label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Quantidade
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-20"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
                  onClick={() => setAmount(sglBalance.replace(/,/g, ""))}
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 text-sm text-muted-foreground">
              Gas Estimado: ~0.002 ETH
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full gap-2"
              onClick={handleTransfer}
              disabled={transferring || !walletAddress}
            >
              {transferring ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {transferring ? "Transferindo..." : "Transferir"}
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Transaction History */}
      <GlassCard variant="default" size="default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Historico de Transacoes
          </h3>
          <Button variant="outline" size="sm" disabled>
            Exportar CSV
          </Button>
        </div>

        {loadingTx ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma transacao encontrada</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suas transacoes aparecerao aqui
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Tipo</TableHead>
                <TableHead>De</TableHead>
                <TableHead>Para</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-white/10">
                  <TableCell>
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      {tx.type === "receive" ? (
                        <ArrowDownLeft className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{tx.from}</TableCell>
                  <TableCell className="font-mono text-sm">{tx.to}</TableCell>
                  <TableCell
                    className={
                      tx.type === "receive"
                        ? "text-green-400 font-mono"
                        : "text-red-400 font-mono"
                    }
                  >
                    {tx.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground"
                    >
                      {tx.hash}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </GlassCard>
    </div>
  );
}
