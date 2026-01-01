import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Clock, Lock, Unlock, Plus, CalendarDays } from "lucide-react";

const capsules = [
  { id: 1, status: "locked", unlockDate: "2025-01-01", created: "2024-01-01", recipient: "Self", daysLeft: 365 },
  { id: 2, status: "locked", unlockDate: "2024-06-01", created: "2024-01-05", recipient: "0x1234...5678", daysLeft: 152 },
  { id: 3, status: "unlocked", unlockDate: "2024-01-10", created: "2023-06-01", recipient: "Self", daysLeft: 0 },
];

export default function TimeCapsulePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Time Capsule</h1>
        <p className="text-muted-foreground mt-1">Send messages to the future with blockchain security</p>
      </div>

      {/* Create Capsule */}
      <GlassCard variant="glow" size="lg">
        <h2 className="text-lg font-semibold text-foreground mb-6">Create New Capsule</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Your Message</label>
            <Textarea
              placeholder="Write your message for the future..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground mt-1">Your message will be encrypted and stored on-chain</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Unlock Date</label>
              <Input type="date" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Recipient (Optional)</label>
              <Input placeholder="0x... or leave empty for yourself" className="font-mono" />
            </div>
          </div>

          <Button variant="hero" size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Time Capsule
          </Button>
        </div>
      </GlassCard>

      {/* My Capsules */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">My Capsules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule) => (
            <GlassCard
              key={capsule.id}
              variant={capsule.status === "unlocked" ? "glow" : "default"}
              size="default"
              hover="lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  capsule.status === "locked" ? "bg-yellow-500/20" : "bg-green-500/20"
                }`}>
                  {capsule.status === "locked" ? (
                    <Lock className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Unlock className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  capsule.status === "locked" 
                    ? "bg-yellow-500/20 text-yellow-400" 
                    : "bg-green-500/20 text-green-400"
                }`}>
                  {capsule.status === "locked" ? "Locked" : "Unlocked"}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Capsule #{capsule.id}</p>
                  {capsule.status === "locked" && (
                    <p className="text-lg font-semibold text-foreground">{capsule.daysLeft} days left</p>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-foreground">{capsule.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unlock Date</span>
                    <span className="text-foreground">{capsule.unlockDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipient</span>
                    <span className="text-foreground font-mono text-xs">{capsule.recipient}</span>
                  </div>
                </div>

                {capsule.status === "unlocked" && (
                  <Button variant="default" className="w-full mt-4">
                    Open Capsule
                  </Button>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
