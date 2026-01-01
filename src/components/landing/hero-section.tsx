import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Shield, Users, Coins, Clock } from "lucide-react";
import lauraAvatar from "@/assets/avatars/laura.png";

const stats = [
  { label: "Total Value Locked", value: "$2.4M" },
  { label: "Active Avatars", value: "12,847" },
  { label: "Tokens Distributed", value: "847M" },
  { label: "Legacy Plans Created", value: "3,291" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-purple-950/20" />
        
        {/* Radial gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <Container size="xl" className="py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Shield className="w-4 h-4" />
                Secured by Ethereum
              </div>
              
              <h1 className="text-h1 md:text-display font-bold text-foreground">
                The Future of{" "}
                <span className="text-gradient">Digital Identity</span>{" "}
                on Blockchain
              </h1>
              
              <p className="text-body-lg text-muted-foreground max-w-xl">
                SingulAI empowers you to own your digital identity, manage your assets with full custody, and create programmable legacies for the future.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/connect">
                <Button variant="hero" size="xl">
                  Launch App
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="#whitepaper">
                <Button variant="hero-outline" size="xl">
                  Read Whitepaper
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-h4 font-bold text-foreground">{stat.value}</p>
                  <p className="text-caption text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-8">
            {/* Main avatar card */}
            <GlassCard variant="glow" size="lg" className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-glow">
                    <img
                      src={lauraAvatar}
                      alt="SingulAI Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-h4 font-bold text-foreground">Laura.singulai</h3>
                  <p className="font-mono text-sm text-muted-foreground">0x7F3a...8B2c</p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-h4 font-bold text-foreground">2,847</p>
                    <p className="text-caption text-muted-foreground">SGL</p>
                  </div>
                  <div className="text-center">
                    <p className="text-h4 font-bold text-foreground">3</p>
                    <p className="text-caption text-muted-foreground">NFTs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-h4 font-bold text-foreground">12%</p>
                    <p className="text-caption text-muted-foreground">APY</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 animate-float" style={{ animationDelay: "0.5s" }}>
              <GlassCard size="sm" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+124 SGL</p>
                  <p className="text-xs text-muted-foreground">Staking Reward</p>
                </div>
              </GlassCard>
            </div>

            <div className="absolute -bottom-4 -right-4 animate-float" style={{ animationDelay: "1s" }}>
              <GlassCard size="sm" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Time Capsule</p>
                  <p className="text-xs text-muted-foreground">Opens in 365d</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
