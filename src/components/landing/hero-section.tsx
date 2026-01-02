import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Shield, Coins, Clock, Heart, Briefcase, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useApp } from "@/contexts/app-context";
import lauraAvatar from "@/assets/avatars/laura.png";
import leticiaAvatar from "@/assets/avatars/leticia.png";
import pedroAvatar from "@/assets/avatars/pedro.png";

export function HeroSection() {
  const { t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const stats = [
    { label: t("hero.tvl"), value: "$2.4M" },
    { label: t("hero.avatars"), value: "12,847" },
    { label: t("hero.tokens"), value: "847M" },
    { label: t("hero.legacy"), value: "3,291" },
  ];

  const avatarCards = [
    {
      id: 1,
      avatar: lauraAvatar,
      name: "Laura.singulai",
      wallet: "0x7F3a...8B2c",
      icon: Heart,
      title: t("avatar.familyLegacy"),
      description: t("avatar.familyDesc"),
      tag: t("avatar.personal"),
      tagColor: "bg-pink-500/20 text-pink-400",
      tokens: "2,847",
      nfts: "3",
      apy: "12%",
    },
    {
      id: 2,
      avatar: leticiaAvatar,
      name: "Leticia.singulai",
      wallet: "0x4D2e...9A1f",
      icon: Briefcase,
      title: t("avatar.mentor"),
      description: t("avatar.mentorDesc"),
      tag: t("avatar.business"),
      tagColor: "bg-blue-500/20 text-blue-400",
      tokens: "15,420",
      nfts: "8",
      apy: "18%",
    },
    {
      id: 3,
      avatar: pedroAvatar,
      name: "Pedro.singulai",
      wallet: "0x9C8b...3E7d",
      icon: Star,
      title: t("avatar.fanExp"),
      description: t("avatar.fanDesc"),
      tag: t("avatar.creator"),
      tagColor: "bg-yellow-500/20 text-yellow-400",
      tokens: "42,100",
      nfts: "24",
      apy: "25%",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % 3);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentCard = avatarCards[currentIndex];
  const IconComponent = currentCard.icon;

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <Container size="xl" className="py-8 md:py-32">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          {/* Content + Mobile Avatar */}
          <div className="space-y-4 md:space-y-8">
            {/* Mobile: Title + Avatar side by side */}
            <div className="flex gap-4 md:block">
              {/* Text content */}
              <div className="flex-1 space-y-3 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-sm font-medium">
                  <Shield className="w-3 h-3 md:w-4 md:h-4" />
                  {t("hero.badge")}
                </div>
                
                <h1 className="text-xl sm:text-3xl md:text-h1 lg:text-display font-bold text-foreground leading-tight">
                  {t("hero.title1")}{" "}
                  <span className="text-gradient">{t("hero.title2")}</span>{" "}
                  {t("hero.title3")}
                </h1>
                
                <p className="text-xs md:text-body-lg text-muted-foreground max-w-xl hidden md:block">
                  {t("hero.description")}
                </p>
              </div>

              {/* Mobile Avatar - inline with title */}
              <div className="flex-shrink-0 md:hidden">
                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-glow">
                      <img
                        src={currentCard.avatar}
                        alt={`${currentCard.name} Avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-[10px] font-medium text-center text-foreground mt-2 truncate w-24">{currentCard.name}</p>
                  {/* Indicators */}
                  <div className="flex justify-center gap-1 mt-1">
                    {avatarCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAnimating(true);
                          setTimeout(() => {
                            setCurrentIndex(index);
                            setIsAnimating(false);
                          }, 300);
                        }}
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'bg-primary w-2' 
                            : 'bg-muted-foreground/30'
                        }`}
                        aria-label={`Go to avatar ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile description */}
            <p className="text-xs text-muted-foreground max-w-xl md:hidden">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-2 md:gap-4">
              <Link to="/connect">
                <Button variant="hero" size="default" className="text-sm md:text-base">
                  {t("hero.launchApp")}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <a href="#whitepaper">
                <Button variant="hero-outline" size="default" className="text-sm md:text-base">
                  {t("hero.whitepaper")}
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 md:pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-0.5 md:space-y-1">
                  <p className="text-lg md:text-h4 font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs md:text-caption text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual - Avatar Carousel - Desktop */}
          <div className="relative lg:pl-8 hidden md:block">
            {/* Main avatar card */}
            <GlassCard variant="glow" size="lg" className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              
              <div className={`flex flex-col items-center text-center space-y-6 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {/* Tag */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-semibold ${currentCard.tagColor}`}>
                  {currentCard.tag}
                </div>

                <div className="relative">
                  <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-glow">
                    <img
                      src={currentCard.avatar}
                      alt={`${currentCard.name} Avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-h4 font-bold text-foreground">{currentCard.name}</h3>
                  <p className="font-mono text-sm text-muted-foreground">{currentCard.wallet}</p>
                </div>

                {/* Feature Info */}
                <div className="space-y-3 px-4">
                  <h4 className="text-lg font-bold text-foreground flex items-center justify-center gap-2">
                    <IconComponent className="w-5 h-5 text-primary" />
                    {currentCard.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentCard.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-h4 font-bold text-foreground">{currentCard.tokens}</p>
                    <p className="text-caption text-muted-foreground">SGL</p>
                  </div>
                  <div className="text-center">
                    <p className="text-h4 font-bold text-foreground">{currentCard.nfts}</p>
                    <p className="text-caption text-muted-foreground">NFTs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-h4 font-bold text-foreground">{currentCard.apy}</p>
                    <p className="text-caption text-muted-foreground">APY</p>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {avatarCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsAnimating(false);
                      }, 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to avatar ${index + 1}`}
                  />
                ))}
              </div>
            </GlassCard>

            {/* Floating elements - hidden on mobile */}
            <div className="absolute -top-4 -left-4 animate-float hidden lg:block" style={{ animationDelay: "0.5s" }}>
              <GlassCard size="sm" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+124 SGL</p>
                  <p className="text-xs text-muted-foreground">{t("hero.stakingReward")}</p>
                </div>
              </GlassCard>
            </div>

            <div className="absolute -bottom-4 -right-4 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
              <GlassCard size="sm" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t("hero.timeCapsule")}</p>
                  <p className="text-xs text-muted-foreground">{t("hero.opensIn")}</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
