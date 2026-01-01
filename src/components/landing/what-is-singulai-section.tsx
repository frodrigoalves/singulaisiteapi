import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import penDiagram from "@/assets/pen-diagrama.png";
import { ScanFace, ShieldAlert, Cpu, Accessibility } from "lucide-react";

const features = [
  { 
    icon: ScanFace, 
    title: "Multimodal Auth", 
    description: "Face, fingerprint and gesture recognition in one natural motion" 
  },
  { 
    icon: ShieldAlert, 
    title: "Anti-Fraud Protection", 
    description: "Intruder photo capture, geolocation and on-chain audit logs" 
  },
  { 
    icon: Cpu, 
    title: "Hardware Security", 
    description: "Secure Element with auto-wipe tamper detection" 
  },
  { 
    icon: Accessibility, 
    title: "Inclusive Design", 
    description: "Voice commands, haptic feedback and TTS for accessibility" 
  },
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
              alt="SingulAI Pen Device"
              className="w-full h-auto rounded-2xl"
            />
          </GlassCard>
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 animate-float">
            <GlassCard size="sm" className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">LGPD/GDPR Compliant - Ethereum Secured</span>
            </GlassCard>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-h2 font-bold text-foreground">
              <span className="text-gradient">SingulAI</span> Pen
            </h2>
            <p className="text-body-lg text-muted-foreground italic">
              "Your signature is your key. Your identity, unhackable."
            </p>
            <p className="text-body text-muted-foreground">
              The first portable device that transforms your natural signature gesture into military-grade authentication. Combining facial recognition, 360-degree fingerprint scanning, and gesture analysis - all in an elegant pen that fits in your pocket.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-2 p-4 rounded-xl bg-secondary/50 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{feature.title}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-[52px]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
