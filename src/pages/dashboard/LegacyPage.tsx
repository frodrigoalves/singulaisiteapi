import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Plus, Users, Coins, AlertTriangle, Edit, Trash2 } from "lucide-react";

const legacyPlans = [
  {
    id: 1,
    beneficiaries: 2,
    totalAssets: "5,000 SGL",
    inactivityPeriod: "365 days",
    lastActivity: "2024-01-15",
    status: "active",
  },
];

const beneficiaryAsPlans = [
  {
    id: 1,
    from: "0x9876...5432",
    allocation: "25%",
    status: "pending",
  },
];

export default function LegacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Digital Legacy</h1>
        <p className="text-muted-foreground mt-1">Plan your digital inheritance on the blockchain</p>
      </div>

      {/* Warning */}
      <GlassCard variant="subtle" size="default" className="border-yellow-500/30">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
              Legacy plans are automatically executed based on wallet inactivity. Make sure to configure appropriate inactivity periods and keep your wallet active to prevent unintended transfers.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Create Legacy Plan */}
      <GlassCard variant="glow" size="lg">
        <h2 className="text-lg font-semibold text-foreground mb-6">Create Legacy Plan</h2>
        
        <div className="space-y-6">
          {/* Beneficiary */}
          <div className="p-4 rounded-xl bg-secondary/30 space-y-4">
            <h3 className="font-medium text-foreground">Add Beneficiary</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-sm text-muted-foreground mb-2 block">Wallet Address</label>
                <Input placeholder="0x..." className="font-mono" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Allocation %</label>
                <Input type="number" placeholder="25" max={100} min={1} />
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="w-4 h-4" />
              Add Beneficiary
            </Button>
          </div>

          {/* Trigger */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Inactivity Trigger</label>
            <Select defaultValue="365">
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Select inactivity period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="180">180 Days</SelectItem>
                <SelectItem value="365">365 Days</SelectItem>
                <SelectItem value="730">2 Years</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              If your wallet is inactive for this period, the legacy plan will be executed
            </p>
          </div>

          <Button variant="hero" size="lg" className="gap-2">
            <Shield className="w-4 h-4" />
            Create Legacy Plan
          </Button>
        </div>
      </GlassCard>

      {/* Active Plans */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Legacy Plans</h2>
        <div className="grid gap-4">
          {legacyPlans.map((plan) => (
            <GlassCard key={plan.id} variant="default" size="default">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Legacy Plan #{plan.id}</h3>
                    <p className="text-sm text-muted-foreground">Created for {plan.beneficiaries} beneficiaries</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Total Assets</p>
                    <p className="font-semibold text-foreground">{plan.totalAssets}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Trigger</p>
                    <p className="font-semibold text-foreground">{plan.inactivityPeriod}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Last Activity</p>
                    <p className="font-semibold text-foreground">{plan.lastActivity}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon-sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon-sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* As Beneficiary */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">As Beneficiary</h2>
        <div className="grid gap-4">
          {beneficiaryAsPlans.map((plan) => (
            <GlassCard key={plan.id} variant="subtle" size="default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">From: {plan.from}</h3>
                    <p className="text-sm text-muted-foreground">You are allocated {plan.allocation}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                  {plan.status}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
