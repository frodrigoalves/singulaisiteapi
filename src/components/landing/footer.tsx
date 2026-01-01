import { Link } from "react-router-dom";
import { Container } from "@/components/layout/container";
import logo from "@/assets/logo-singulai.png";
import { Twitter, Github, MessageCircle, FileText, Blocks, Atom, ShieldCheck } from "lucide-react";
import { useApp } from "@/contexts/app-context";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: FileText, href: "#", label: "Docs" },
];

export function Footer() {
  const { t } = useApp();

  const footerLinks = {
    product: [
      { label: t("sidebar.overview"), href: "/dashboard" },
      { label: t("sidebar.staking"), href: "/dashboard/staking" },
      { label: t("sidebar.avatar"), href: "/dashboard/avatar" },
      { label: t("sidebar.timeCapsule"), href: "/dashboard/timecapsule" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Whitepaper", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "FAQ", href: "#" },
    ],
    community: [
      { label: "Discord", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    legal: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <Container size="xl" className="px-4 md:px-6">
        <div className="py-10 md:py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-3 md:mb-4">
                <img src={logo} alt="SingulAI" className="h-6 md:h-8 w-auto logo-adaptive" />
              </Link>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 max-w-xs">
                {t("footer.description")}
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-1.5 md:p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">{t("footer.product")}</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">{t("footer.resources")}</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">{t("footer.community")}</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">{t("footer.legal")}</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 md:py-6 border-t border-border">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
                <Blocks className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs">Blockchain</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
                <Atom className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs">Safe Quantum</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs">Web Security</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3">
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  2024 SingulAI Platform. {t("footer.rights")}
                </p>
                <span className="hidden md:inline text-muted-foreground/30">|</span>
                <p className="text-[10px] md:text-xs text-muted-foreground/60">
                  INPI 942284933
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4">
                <a 
                  href="https://rodrigo.run" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.developedBy")} rodrigo.run
                </a>
                <span className="text-muted-foreground/50">|</span>
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  {t("footer.nativeCurrency")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
