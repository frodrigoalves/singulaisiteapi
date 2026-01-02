import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/hooks/use-auth";
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
  created_at: string;
  tx_hash: string | null;
}

export default function TokensPage() {
  const { t } = useApp();
  const { user } = useAuth();
  const { toast } = useToast();

  const [balance, setBalance] = useState("0.00");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  // Carregar dados do usuario
  useEffect(() => {
    async function loadData() {
      if (!user) return;

      try {
        // Buscar perfil com wallet
        const { data: profile } = await supabase
          .from("profiles")
          .select("wallet_address, sgl_balance")
          .eq("user_id", user.id)
          .single();

        if (profile) {
          setWalletAddress(profile.wallet_address);
          setBalance(profile.sgl_balance?.toLocaleString() || "0.00");
        }

        // Buscar transacoes (se existir a tabela)
        const { data: txs } = await supabase
          .from("transactions")
          .select("*")
          .or(`from_address.eq.${profile?.wallet_address},to_address.eq.${profile?.wallet_address}`)
          .order("created_at", { ascending: false })
          .limit(10);

        if (txs) {
          setTransactions(txs.map(tx => ({
            ...tx,
            type: tx.to_address === profile?.wallet_address ? "receive" : "send"
          })));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  const handleTransfer = async () => {
    if (!recipient || !amount || !walletAddress) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // Aqui vai a logica de transferencia real
      // Por enquanto, apenas simula
      toast({
        title: "Funcionalidade em desenvolvimento",
        description: "Transferencias serao habilitadas em breve!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha na transferencia",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "-";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Tokens</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus tokens SGL</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Saldo */}
        <GlassCard variant="glow" size="lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo SGL</p>
              <p className="text-2xl font-bold text-foreground">{balance}</p>
            </div>
          </div>

          {walletAddress ? (
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs text-muted-foreground mb-1">Sua Wallet</p>
              <p className="font-mono text-sm text-foreground">{formatAddress(walletAddress)}</p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm text-yellow-400">Nenhuma wallet conectada</p>
            </div>
          )}
        </GlassCard>

        {/* Transferir */}
        <GlassCard variant="default" size="lg" className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">Transferir SGL</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Endereco do Destinatario</label>
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
                  onClick={() => setAmount(balance.replace(/,/g, ''))}
                >
                  MAX
                </Button>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full gap-2"
              onClick={handleTransfer}
              disabled={sending || !walletAddress}
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? "Enviando..." : "Transferir"}
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Historico de Transacoes */}
      <GlassCard variant="default" size="default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Historico de Transacoes</h3>
          <Button variant="outline" size="sm" disabled>
            Exportar CSV
          </Button>
        </div>

        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Tipo</TableHead>
                <TableHead>De</TableHead>
                <TableHead>Para</TableHead>
                <TableHead>Quantidade</TableHead>
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
                  <TableCell className="font-mono text-sm">
                    {tx.from_address === walletAddress ? "Voce" : formatAddress(tx.from_address)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {tx.to_address === walletAddress ? "Voce" : formatAddress(tx.to_address)}
                  </TableCell>
                  <TableCell className={tx.type === "receive" ? "text-green-400 font-mono" : "text-red-400 font-mono"}>
                    {tx.type === "receive" ? "+" : "-"}{tx.amount} SGL
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(tx.created_at)}</TableCell>
                  <TableCell>
                    {tx.tx_hash ? (
                      <a
                        href={`https://basescan.org/tx/${tx.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground"
                      >
                        {formatAddress(tx.tx_hash)}
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
        ) : (
          <div className="text-center py-12">
            <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma transacao encontrada</p>
            <p className="text-sm text-muted-foreground mt-1">
              Suas transacoes aparecerão aqui
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
