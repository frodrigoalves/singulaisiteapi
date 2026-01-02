import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddressDisplay } from "@/components/web3/address-display";
import { useWeb3 } from "@/providers/web3-provider";
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
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Coins,
  TrendingUp,
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
  const { address, isConnected } = useWeb3();
  const { user } = useAuth();
  const { toast } = useToast();

  const [balance, setBalance] = useState("0.00");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar dados do usuario
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Buscar perfil com saldo
      const { data: profile } = await supabase
        .from("profiles")
        .select("sgl_balance, wallet_address")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        setBalance(profile.sgl_balance?.toLocaleString() || "0.00");
      }

      // Buscar transacoes
      const { data: txs } = await supabase
        .from("transactions")
        .select("*")
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order("created_at", { ascending: false })
        .limit(10);

      if (txs) {
        setTransactions(txs.map(tx => ({
          id: tx.id,
          type: tx.from_user_id === user.id ? "send" : "receive",
          from_address: tx.from_address || "Unknown",
          to_address: tx.to_address || "Unknown",
          amount: tx.amount?.toString() || "0",
          created_at: tx.created_at,
          tx_hash: tx.tx_hash,
        })));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
    toast({
      title: "Atualizado!",
      description: "Dados atualizados com sucesso.",
    });
  };

  const handleTransfer = async () => {
    if (!recipient || !amount || !user) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setTransferring(true);
    try {
      // Aqui voce pode chamar sua API de transferencia
      const response = await fetch("https://api.singulai.site/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          to_address: recipient,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Transfer failed");
      }

      toast({
        title: "Transferencia enviada!",
        description: `${amount} SGL enviados para ${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
      });

      setRecipient("");
      setAmount("");
      await loadUserData();
    } catch (error) {
      toast({
        title: "Erro na transferencia",
        description: "Nao foi possivel completar a transferencia.",
        variant: "destructive",
      });
    } finally {
      setTransferring(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-bold text-foreground">Tokens</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus tokens SGL</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Balance Card */}
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
          
          {address && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-muted-foreground mb-2">Sua carteira</p>
              <AddressDisplay address={address} />
            </div>
          )}
        </GlassCard>

        {/* Transfer Card */}
        <GlassCard variant="default" size="lg" className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Transferir SGL
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Endereco do destinatario
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
                  onClick={() => setAmount(balance.replace(/,/g, "").replace(/\./g, ""))}
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
              disabled={transferring || !recipient || !amount}
            >
              {transferring ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Transferindo...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Transferir
                </>
              )}
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
        </div>

        {transactions.length === 0 ? (
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
                    {formatAddress(tx.from_address)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {formatAddress(tx.to_address)}
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
        )}
      </GlassCard>
    </div>
  );
}
