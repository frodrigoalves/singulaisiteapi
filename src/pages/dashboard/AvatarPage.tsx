import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Plus, ExternalLink, Eye } from "lucide-react";
import lauraAvatar from "@/assets/avatars/laura.png";
import leticiaAvatar from "@/assets/avatars/leticia.png";
import pedroAvatar from "@/assets/avatars/pedro.png";

const avatars = [
  { id: 1, name: "Laura", image: lauraAvatar, tokenId: "#0001", created: "2024-01-01" },
  { id: 2, name: "Leticia", image: leticiaAvatar, tokenId: "#0002", created: "2024-01-05" },
  { id: 3, name: "Pedro", image: pedroAvatar, tokenId: "#0003", created: "2024-01-10" },
];

export default function AvatarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">Digital Avatar</h1>
        <p className="text-muted-foreground mt-1">Create and manage your blockchain identity</p>
      </div>

      {/* Your Avatars */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Avatars</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {avatars.map((avatar) => (
            <GlassCard
              key={avatar.id}
              variant="default"
              size="default"
              hover="lift"
              className="group overflow-hidden"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <Button variant="glass" size="sm" className="gap-1">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{avatar.name}</h3>
                  <span className="text-sm font-mono text-muted-foreground">{avatar.tokenId}</span>
                </div>
                <p className="text-xs text-muted-foreground">Created: {avatar.created}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Mint New Avatar */}
      <GlassCard variant="glow" size="lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-6">Mint New Avatar</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Avatar Name (Optional)</label>
                <Input placeholder="Enter a name for your avatar" />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                <Input placeholder="Add a description" />
              </div>

              <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mint Cost</span>
                  <span className="text-foreground font-semibold">50 SGL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Fee (Est.)</span>
                  <span className="text-foreground font-mono">0.005 ETH</span>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Mint Avatar
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 rounded-3xl border-2 border-dashed border-white/20 flex items-center justify-center">
              <div className="text-center">
                <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Avatar Preview</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
