import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Radio,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Gift,
  User,
  Coins,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
  Activity,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  status: string;
  tx_hash: string | null;
  from_address: string | null;
  to_address: string | null;
  description: string | null;
  created_at: string;
}

const getTypeIcon = (type: string) => {
  const iconClass = "w-4 h-4";
  switch (type) {
    case "transfer":
      return <ArrowUpRight className={`${iconClass} text-blue-400`} />;
    case "stake":
      return <Lock className={`${iconClass} text-primary`} />;
    case "unstake":
      return <ArrowDownLeft className={`${iconClass} text-orange-400`} />;
    case "reward":
      return <Gift className={`${iconClass} text-yellow-400`} />;
    case "mint":
      return <User className={`${iconClass} text-accent`} />;
    case "capsule":
      return <Clock className={`${iconClass} text-purple-400`} />;
    default:
      return <Coins className={iconClass} />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="border-green-500/50 text-green-400 gap-1">
          <CheckCircle className="w-3 h-3" />
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="border-red-500/50 text-red-400 gap-1">
          <XCircle className="w-3 h-3" />
          Failed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    stake: "Staking",
    unstake: "Unstake",
    transfer: "Transfer",
    reward: "Reward",
    mint: "Mint NFT",
    capsule: "Time Capsule",
  };
  return labels[type] || type;
};

export function RealtimeTransactionsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const { user } = useAuth();

  // Fetch initial transactions
  useEffect(() => {
    if (!user) return;

    const fetchTransactions = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setTransactions(data);
      }
      setIsLoading(false);
    };

    fetchTransactions();
  }, [user]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("transactions-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Realtime transaction update:", payload);
          setIsLive(true);
          setTimeout(() => setIsLive(false), 2000);

          if (payload.eventType === "INSERT") {
            setTransactions((prev) => [payload.new as Transaction, ...prev].slice(0, 20));
          } else if (payload.eventType === "UPDATE") {
            setTransactions((prev) =>
              prev.map((tx) =>
                tx.id === (payload.new as Transaction).id
                  ? (payload.new as Transaction)
                  : tx
              )
            );
          } else if (payload.eventType === "DELETE") {
            setTransactions((prev) =>
              prev.filter((tx) => tx.id !== (payload.old as Transaction).id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="glass-card overflow-hidden">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 h-auto hover:bg-secondary/50 rounded-none"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity className="w-5 h-5 text-primary" />
                {isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
              <span className="font-semibold text-foreground">
                Transações em Tempo Real
              </span>
              <Badge
                variant="outline"
                className={`gap-1 transition-colors ${
                  isLive
                    ? "border-green-500/50 text-green-400"
                    : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                <Radio className={`w-3 h-3 ${isLive ? "animate-pulse" : ""}`} />
                {isLive ? "LIVE" : "Realtime"}
              </Badge>
            </div>
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="border-t border-border">
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mb-2 opacity-50" />
                <p>Nenhuma transação ainda</p>
                <p className="text-sm">As transações aparecerão aqui em tempo real</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          {getTypeIcon(tx.type)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {getTypeLabel(tx.type)}
                            </span>
                            {getStatusBadge(tx.status)}
                          </div>
                          {tx.description && (
                            <p className="text-sm text-muted-foreground">
                              {tx.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(tx.created_at), {
                              addSuffix: true,
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p
                          className={`font-mono font-medium ${
                            tx.type === "reward" || tx.type === "unstake"
                              ? "text-green-400"
                              : tx.type === "stake" || tx.type === "transfer"
                              ? "text-red-400"
                              : "text-foreground"
                          }`}
                        >
                          {tx.type === "reward" || tx.type === "unstake" ? "+" : "-"}
                          {tx.amount.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}{" "}
                          SGL
                        </p>
                        {tx.tx_hash && (
                          <a
                            href={`https://sepolia.etherscan.io/tx/${tx.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
                          >
                            <span className="font-mono">
                              {tx.tx_hash.slice(0, 6)}...{tx.tx_hash.slice(-4)}
                            </span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
