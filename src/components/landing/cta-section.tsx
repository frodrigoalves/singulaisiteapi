import { Link } from "react-router-dom";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <Section spacing="xl" className="relative">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        {/* Content */}
        <div className="relative px-8 py-16 md:py-24 text-center">
          <h2 className="text-h2 md:text-h1 font-bold text-white mb-6">
            Ready to Own Your Digital Future?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Join thousands of users who are already securing their digital identity and assets on the blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/connect">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 shadow-elevated rounded-asymmetric"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#features">
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 rounded-asymmetric-reverse"
              >
                Explore Features
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
