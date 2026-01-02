import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Wallet, UserCircle, Rocket } from "lucide-react";
import { useApp } from "@/contexts/app-context";

export function HowItWorksSection() {
  const { t } = useApp();

  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: t("how.step1"),
      description: t("how.step1Desc"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      icon: UserCircle,
      title: t("how.step2"),
      description: t("how.step2Desc"),
      gradient: "from-primary to-accent",
    },
    {
      number: "03",
      icon: Rocket,
      title: t("how.step3"),
      description: t("how.step3Desc"),
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <Section id="how-it-works" spacing="xl" className="relative">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-[128px] -translate-y-1/2" />

      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-xl md:text-h2 font-bold text-foreground mb-2 md:mb-4">
          {t("how.title1")} <span className="text-gradient">{t("how.title2")}</span>
        </h2>
        <p className="text-sm md:text-body-lg text-muted-foreground max-w-2xl mx-auto px-4">
          {t("how.description")}
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <GlassCard
                variant="default"
                size="lg"
                hover="glow"
                className="h-full text-center group p-4 md:p-6"
              >
                {/* Step number */}
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-xs md:text-sm font-bold text-white shadow-glow-sm`}>
                    {step.number}
                  </div>
                </div>

                <div className="pt-4 md:pt-8 space-y-2 md:space-y-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-sm md:text-h4 font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs md:text-body text-muted-foreground">{step.description}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
