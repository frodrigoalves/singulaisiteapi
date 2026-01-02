import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddressDisplay } from "@/components/web3/address-display";
import { useAuth } from "@/hooks/use-auth";
import { useWalletAddress, useTokenBalance } from "@/hooks/use-blockchain";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Coins,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  Loader2,
  Wallet,
  RefreshCw,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "send" | "receive";
  from_address: string;
  to_address: string;
  amount: string;
  tx_hash: string;
  created_at: string;
}

export default function TokensPage() {
  const { user } = useAuth();
  const { address, loading: addressLoading } = useWalletAddress();
  const { balance, loading: balanceLoading } = useTokenBalance();
  const { toast } = useToast();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTx, setLoadingTx] = useState(true);

  // Carregar transacoes do Supabase
  useEffect(() => {
    async function loadTransactions() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
          .order("created_at", { ascending: false })
          .limit(10);

        if (data) {
          setTransactions(
            data.map((tx: any) => ({
              id: tx.id,
              type: tx.from_user_id === user.id ? "send" : "receive",
              from_address: tx.from_address || "Unknown",
              to_address: tx.to_address || "Unknown",
              amount: tx.amount,
              tx_hash: tx.tx_hash || "",
              created_at: tx.created_at,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoadingTx(false);
      }
    }

    loadTransactions();
  }, [user]);

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // TODO: Implementar transferencia real via blockchain
      toast({
        title: "Em desenvolvimento",
        description: "Transferencias serao habilitadas em breve!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao enviar transacao",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const truncateHash = (hash: string) => {
    if (!hash) return "-";
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const truncateAddress = (addr: string) => {
    if (!addr || addr === "Unknown") return "Desconhecido";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Tokens</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus tokens SGL</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Balance Card */}
        <GlassCard variant="glow" size="lg" className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo SGL</p>
              {balanceLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <p className="text-2xl font-bold text-foreground">{balance}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Valor em USD</span>
              <span className="text-foreground">$0.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rede</span>
              <span className="text-foreground">Base</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-muted-foreground mb-2">Sua Carteira</p>
            {addressLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : address ? (
              <AddressDisplay address={address} />
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma carteira conectada</p>
            )}
          </div>
        </GlassCard>

        {/* Transfer Card */}
        <GlassCard variant="default" size="lg" className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">Transferir SGL</h3>

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
              <label className="text-sm text-muted-foreground mb-2 block">Quantidade</label>
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
                  onClick={() => setAmount(balance.replace(/,/g, ""))}
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 text-sm text-muted-foreground">
              Gas estimado: 0.002 ETH
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full gap-2"
              onClick={handleTransfer}
              disabled={sending || !address}
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? "Enviando..." : "Transferir"}
            </Button>

            {!address && (
              <p className="text-sm text-center text-muted-foreground">
                Conecte uma carteira para transferir
              </p>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Transaction History */}
      <GlassCard variant="default" size="default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Historico de Transacoes</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </Button>
        </div>

        {loadingTx ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <Wallet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
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
                <TableHead>Quantidade</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hash</TableHead>
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
                  <TableCell className="font-mono text-sm">
                    {truncateAddress(tx.from_address)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {truncateAddress(tx.to_address)}
                  </TableCell>
                  <TableCell
                    className={
                      tx.type === "receive"
                        ? "text-green-400 font-mono"
                        : "text-red-400 font-mono"
                    }
                  >
                    {tx.type === "receive" ? "+" : "-"}
                    {tx.amount} SGL
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(tx.created_at)}
                  </TableCell>
                  <TableCell>
                    {tx.tx_hash ? (
                      <a
                        href={`https://basescan.org/tx/${tx.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground"
                      >
                        {truncateHash(tx.tx_hash)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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
