import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddressDisplay } from "@/components/web3/address-display";
import { useState } from "react";
import { Coins, Send, ExternalLink, Copy, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  { id: 1, type: "receive", from: "0x1234...5678", to: "You", amount: "+500.00 SGL", date: "2024-01-15", hash: "0xabc...123" },
  { id: 2, type: "send", from: "You", to: "0x2345...6789", amount: "-100.00 SGL", date: "2024-01-14", hash: "0xdef...456" },
  { id: 3, type: "receive", from: "0x3456...7890", to: "You", amount: "+250.00 SGL", date: "2024-01-13", hash: "0xghi...789" },
];

export default function TokensPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const tokenInfo = {
    name: "SingulAI Token",
    symbol: "SGL",
    contract: "0x7F3a4B2c8D9E1f6A5B3C2D8E9F1A6B3C8D2E8B2c",
    balance: "2,847.50",
    balanceUsd: "$4,271.25",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Tokens</h1>
        <p className="text-muted-foreground mt-1">Manage your SGL tokens</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Token Info */}
        <GlassCard variant="glow" size="lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{tokenInfo.name}</h3>
              <p className="text-muted-foreground">{tokenInfo.symbol}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
              <AddressDisplay address={tokenInfo.contract} size="sm" />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
              <p className="text-h3 font-bold text-foreground">{tokenInfo.balance} SGL</p>
              <p className="text-sm text-muted-foreground">{tokenInfo.balanceUsd}</p>
            </div>
          </div>
        </GlassCard>

        {/* Transfer */}
        <GlassCard variant="default" size="lg" className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-foreground mb-6">Transfer SGL</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Recipient Address</label>
              <Input
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
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
                  onClick={() => setAmount("2847.50")}
                >
                  MAX
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 text-sm text-muted-foreground">
              Estimated Gas: 0.002 ETH
            </div>

            <Button variant="hero" size="lg" className="w-full gap-2">
              <Send className="w-4 h-4" />
              Transfer
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Transaction History */}
      <GlassCard variant="default" size="default">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
          <Button variant="outline" size="sm">Export CSV</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
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
                <TableCell className={tx.type === "receive" ? "text-green-400 font-mono" : "text-red-400 font-mono"}>
                  {tx.amount}
                </TableCell>
                <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                <TableCell>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-foreground">
                    {tx.hash}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
