import { Link } from "react-router-dom";
import { Container } from "@/components/layout/container";
import logo from "@/assets/logo-singulai.png";
import { Twitter, Github, MessageCircle, FileText, Blocks, Atom, ShieldCheck } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Staking", href: "/dashboard/staking" },
    { label: "Avatar", href: "/dashboard/avatar" },
    { label: "Time Capsule", href: "/dashboard/timecapsule" },
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

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: FileText, href: "#", label: "Docs" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <Container size="xl">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img src={logo} alt="SingulAI" className="h-8 w-auto logo-adaptive" />
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                The future of digital identity on blockchain. Secure, decentralized, and truly yours.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Community</h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="py-6 border-t border-border">
          <div className="flex flex-col gap-4">
            {/* Security Badges */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Blocks className="w-4 h-4" />
                <span className="text-xs">Blockchain</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Atom className="w-4 h-4" />
                <span className="text-xs">Safe Quantum</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Web Security</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                2024 SingulAI Platform. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://rodrigo.run" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Developed by rodrigo.run
                </a>
                <span className="text-muted-foreground/50">|</span>
                <p className="text-sm text-muted-foreground">
                  SGL - Native Currency
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
