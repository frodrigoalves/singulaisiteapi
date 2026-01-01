import { GlassCard } from "@/components/ui/glass-card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { TrendingUp, Lock, Clock, Gift, Coins } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stakingPools = [
  { period: "30 Days", apy: 5, multiplier: "1x", minStake: 100, maxStake: 10000 },
  { period: "90 Days", apy: 10, multiplier: "1.5x", minStake: 100, maxStake: 25000 },
  { period: "180 Days", apy: 15, multiplier: "2x", minStake: 100, maxStake: 50000 },
  { period: "365 Days", apy: 25, multiplier: "3x", minStake: 100, maxStake: 100000 },
];

const activePositions = [
  { id: 1, amount: "1,000 SGL", period: "90 Days", startDate: "2024-01-01", unlockDate: "2024-04-01", rewards: "25.50 SGL", status: "locked" },
  { id: 2, amount: "500 SGL", period: "30 Days", startDate: "2024-01-10", unlockDate: "2024-02-10", rewards: "6.25 SGL", status: "unlocked" },
];

export default function StakingPage() {
  const [stakeAmount, setStakeAmount] = useState(1000);
  const [selectedPeriod, setSelectedPeriod] = useState(90);

  const calculateRewards = (amount: number, days: number) => {
    const pool = stakingPools.find(p => parseInt(p.period) === days);
    if (!pool) return 0;
    return ((amount * pool.apy) / 100 / 365) * days;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Staking</h1>
        <p className="text-muted-foreground mt-1">Earn rewards by staking your SGL tokens</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Staked"
          value="1,500.00"
          subtitle="SGL"
          icon={Lock}
        />
        <StatCard
          title="Current APY"
          value="12%"
          subtitle="Weighted Average"
          icon={TrendingUp}
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatCard
          title="Next Reward"
          value="2d 14h"
          subtitle="Countdown"
          icon={Clock}
        />
      </div>

      {/* Staking Pools */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Staking Pools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stakingPools.map((pool) => (
            <GlassCard
              key={pool.period}
              variant="default"
              size="default"
              hover="glow"
              className="text-center"
            >
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {pool.period}
                </div>
                <div>
                  <p className="text-h2 font-bold text-foreground">{pool.apy}%</p>
                  <p className="text-sm text-muted-foreground">APY</p>
                </div>
                <div className="inline-block px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium">
                  {pool.multiplier} Rewards
                </div>
                <div className="text-xs text-muted-foreground">
                  Min: {pool.minStake} SGL / Max: {pool.maxStake.toLocaleString()} SGL
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Stake
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Staking Calculator */}
      <GlassCard variant="default" size="lg">
        <h2 className="text-lg font-semibold text-foreground mb-6">Staking Calculator</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Amount to Stake: <span className="text-foreground font-semibold">{stakeAmount.toLocaleString()} SGL</span>
              </label>
              <Slider
                value={[stakeAmount]}
                onValueChange={(value) => setStakeAmount(value[0])}
                max={10000}
                min={100}
                step={100}
                className="mt-4"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Lock Period</label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 90, 180, 365].map((days) => (
                  <Button
                    key={days}
                    variant={selectedPeriod === days ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod(days)}
                  >
                    {days}d
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <GlassCard variant="subtle" size="default">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Stake Amount</span>
                <span className="font-semibold text-foreground">{stakeAmount.toLocaleString()} SGL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lock Period</span>
                <span className="font-semibold text-foreground">{selectedPeriod} Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">APY</span>
                <span className="font-semibold text-green-400">
                  {stakingPools.find(p => parseInt(p.period) === selectedPeriod)?.apy || 0}%
                </span>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projected Rewards</span>
                  <span className="text-h4 font-bold text-accent">
                    +{calculateRewards(stakeAmount, selectedPeriod).toFixed(2)} SGL
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <Button variant="hero" size="lg" className="mt-6 w-full md:w-auto gap-2">
          <Lock className="w-4 h-4" />
          Stake {stakeAmount.toLocaleString()} SGL
        </Button>
      </GlassCard>

      {/* Active Positions */}
      <GlassCard variant="default" size="default">
        <h2 className="text-lg font-semibold text-foreground mb-6">Active Positions</h2>
        
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Amount</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Unlock Date</TableHead>
              <TableHead>Rewards</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activePositions.map((position) => (
              <TableRow key={position.id} className="border-white/10">
                <TableCell className="font-semibold text-foreground">{position.amount}</TableCell>
                <TableCell className="text-muted-foreground">{position.period}</TableCell>
                <TableCell className="text-muted-foreground">{position.startDate}</TableCell>
                <TableCell className="text-muted-foreground">{position.unlockDate}</TableCell>
                <TableCell className="text-green-400 font-mono">{position.rewards}</TableCell>
                <TableCell>
                  {position.status === "unlocked" ? (
                    <Button variant="default" size="sm" className="gap-1">
                      <Gift className="w-3 h-3" />
                      Claim
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" disabled className="gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  );
}
