import { Link } from "react-router-dom";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/app-context";

export function CtaSection() {
  const { t } = useApp();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <Section spacing="xl" className="relative px-4">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        {/* Content */}
        <div className="relative px-4 md:px-8 py-10 md:py-24 text-center">
          <h2 className="text-xl md:text-h2 lg:text-h1 font-bold text-white mb-3 md:mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto mb-6 md:mb-10">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Link to="/connect">
              <Button
                size="default"
                className="bg-white text-primary hover:bg-white/90 shadow-elevated rounded-asymmetric text-sm md:text-base"
              >
                {t("cta.getStarted")}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <a href="#features" onClick={(e) => scrollToSection(e, "#features")}>
              <Button
                variant="outline"
                size="default"
                className="border-white/30 text-white hover:bg-white/10 rounded-asymmetric-reverse text-sm md:text-base"
              >
                {t("cta.explore")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
