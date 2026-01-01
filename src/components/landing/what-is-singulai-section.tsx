import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import penDiagram from "@/assets/pen-diagrama.png";
import { Fingerprint, Network, Lock, Send } from "lucide-react";

const points = [
  { icon: Fingerprint, text: "Decentralized digital identity" },
  { icon: Lock, text: "Self-custody of assets" },
  { icon: Network, text: "Programmable inheritance" },
  { icon: Send, text: "Time-locked messages" },
];

export function WhatIsSingulaiSection() {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -translate-y-1/2" />
      
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="relative order-2 lg:order-1">
          <GlassCard variant="glow" size="lg" className="p-4">
            <img
              src={penDiagram}
              alt="SingulAI Identity Device"
              className="w-full h-auto rounded-2xl"
            />
          </GlassCard>
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 animate-float">
            <GlassCard size="sm" className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">Ethereum Secured</span>
            </GlassCard>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-h2 font-bold text-foreground">
              What is <span className="text-gradient">SingulAI</span>?
            </h2>
            <p className="text-body-lg text-muted-foreground">
              SingulAI is a next-generation platform that combines blockchain technology with digital identity management. We empower individuals to take full control of their digital presence and assets.
            </p>
            <p className="text-body text-muted-foreground">
              Built on Ethereum, our platform ensures your identity and assets are secured by the most battle-tested blockchain network in the world.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((point) => (
              <div
                key={point.text}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-white/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
