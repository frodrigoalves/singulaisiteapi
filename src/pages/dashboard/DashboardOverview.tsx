import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import {
  Coins,
  Lock,
  Gift,
  User,
  Send,
  TrendingUp,
  Plus,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWalletAddress, useWalletInfo, useSglBalance, useAvatarBalance, useUserProfile, useUserAirdrop } from "@/hooks/use-blockchain";
import { useUserStaking } from "@/hooks/use-staking";
import lauraAvatar from "@/assets/avatars/laura.png";
import petraAvatar from "@/assets/avatars/leticia.png";
import pedroAvatar from "@/assets/avatars/pedro.png";
import { Skeleton } from "@/components/ui/skeleton";
import { RealtimeTransactionsPanel } from "@/components/dashboard/realtime-transactions-panel";

// Fallback avatars for display
const fallbackAvatars = [
  { id: 1, image: lauraAvatar },
  { id: 2, image: petraAvatar },
  { id: 3, image: pedroAvatar },
];

// Mock recent activity (this would come from a tx history endpoint)
const recentActivity = [
  {
    id: 1,
    type: "receive",
    description: "Received SGL",
    amount: "+500.00 SGL",
    time: "2 hours ago",
    status: "completed",
    txHash: "0x1234...5678",
  },
  {
    id: 2,
    type: "stake",
    description: "Staked SGL",
    amount: "-1,000.00 SGL",
    time: "1 day ago",
    status: "completed",
    txHash: "0x2345...6789",
  },
  {
    id: 3,
    type: "reward",
    description: "Staking Reward",
    amount: "+24.75 SGL",
    time: "2 days ago",
    status: "completed",
    txHash: "0x3456...7890",
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "receive":
      return <ArrowDownLeft className="w-4 h-4 text-green-400" />;
    case "send":
      return <ArrowUpRight className="w-4 h-4 text-red-400" />;
    case "stake":
      return <Lock className="w-4 h-4 text-primary" />;
    case "reward":
      return <Gift className="w-4 h-4 text-yellow-400" />;
    case "mint":
      return <User className="w-4 h-4 text-accent" />;
    default:
      return <Coins className="w-4 h-4" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case "pending":
      return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-red-400" />;
    default:
      return null;
  }
};

function formatBalance(balance: string | undefined): string {
  if (!balance) return "0.00";
  const num = parseFloat(balance);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function DashboardOverview() {
  const web3Address = useWalletAddress();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: airdrops, isLoading: airdropLoading } = useUserAirdrop();
  
  // Use profile wallet address if web3 is not connected
  const address = web3Address || profile?.wallet_address || null;
  
  const { data: walletInfo, isLoading: walletLoading } = useWalletInfo(address);
  const { data: sglBalance, isLoading: sglLoading } = useSglBalance(address);
  const { data: avatarData, isLoading: avatarLoading } = useAvatarBalance(address);
  const { data: stakingData, isLoading: stakingLoading } = useUserStaking(address);

  const isLoading = walletLoading || sglLoading || avatarLoading || stakingLoading || profileLoading || airdropLoading;

  // Calculate airdrop total
  const airdropTotal = airdrops?.reduce((acc, airdrop) => {
    if (airdrop.status === 'completed' || airdrop.status === 'pending') {
      return acc + Number(airdrop.amount);
    }
    return acc;
  }, 0) || 0;

  // Calculate values
  const apiBalance = sglBalance?.formatted || walletInfo?.sglBalance || "0";
  // Add airdrop balance to show pending tokens
  const balance = airdropTotal > 0 && parseFloat(apiBalance) === 0 
    ? airdropTotal.toString() 
    : apiBalance;
  const balanceUsd = `$${(parseFloat(balance.replace(/,/g, '') || '0') * 1.5).toFixed(2)}`;
  const staked = stakingData?.totalStaked || "0";
  const rewards = stakingData?.pendingRewards || "0";
  const avatarCount = avatarData?.balance || 0;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-h3 font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your SingulAI dashboard</p>
      </div>

      {/* Wallet Address Display */}
      {address && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Coins className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Wallet Conectada</p>
            <p className="text-sm font-mono text-foreground truncate">{address}</p>
          </div>
          <a
            href={`https://sepolia.etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Airdrop Banner */}
      {airdropTotal > 0 && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                🎉 Airdrop de Boas-vindas!
              </h3>
              <p className="text-sm text-muted-foreground">
                Você recebeu <span className="font-bold text-green-400">{airdropTotal.toLocaleString()} SGL</span> tokens na rede Sepolia
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-green-400">
                {airdrops?.[0]?.status === 'completed' ? 'Confirmado' : 'Pendente'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatCard
              title="SGL Balance"
              value={formatBalance(balance)}
              subtitle={airdropTotal > 0 ? `${balanceUsd} • Inclui ${airdropTotal.toLocaleString()} SGL airdrop` : balanceUsd}
              icon={Coins}
              trend={airdropTotal > 0 ? { value: 100, isPositive: true } : { value: 12.5, isPositive: true }}
            />
            <StatCard
              title="Staked Amount"
              value={formatBalance(staked)}
              subtitle="12% APY"
              icon={Lock}
            />
            <StatCard
              title="Pending Rewards"
              value={formatBalance(rewards)}
              icon={Gift}
              action={
                <Button variant="default" size="sm" className="w-full">
                  Claim Rewards
                </Button>
              }
            />
            <StatCard
              title="NFT Avatars"
              value={avatarCount.toString()}
              icon={User}
              action={
                <div className="flex -space-x-3">
                  {fallbackAvatars.slice(0, Math.min(avatarCount || 3, 3)).map((avatar) => (
                    <div
                      key={avatar.id}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    >
                      <img
                        src={avatar.image}
                        alt={`Avatar ${avatar.id}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              }
            />
          </>
        )}
      </div>

      {/* Quick actions */}
      <GlassCard variant="default" size="default">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/tokens">
            <Button variant="outline" className="gap-2">
              <Send className="w-4 h-4" />
              Transfer
            </Button>
          </Link>
          <Link to="/dashboard/staking">
            <Button variant="outline" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Stake
            </Button>
          </Link>
          <Link to="/dashboard/avatar">
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Mint Avatar
            </Button>
          </Link>
          <Link to="/dashboard/timecapsule">
            <Button variant="outline" className="gap-2">
              <Clock className="w-4 h-4" />
              Create Capsule
            </Button>
          </Link>
        </div>
      </GlassCard>

      {/* Realtime Transactions Panel */}
      <RealtimeTransactionsPanel />

      {/* Recent activity */}
      <GlassCard variant="default" size="default">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id} className="border-white/10">
                  <TableCell>
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {activity.description}
                  </TableCell>
                  <TableCell
                    className={
                      activity.amount.startsWith("+")
                        ? "text-green-400 font-mono"
                        : "text-red-400 font-mono"
                    }
                  >
                    {activity.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {activity.time}
                  </TableCell>
                  <TableCell>{getStatusIcon(activity.status)}</TableCell>
                  <TableCell>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${activity.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {activity.txHash}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </GlassCard>
    </div>
  );
}
