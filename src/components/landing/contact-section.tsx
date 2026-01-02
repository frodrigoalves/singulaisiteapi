import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/app-context";

export function ContactSection() {
  const { toast } = useToast();
  const { t } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: t("contact.sent"),
      description: t("contact.sentDesc"),
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Section id="contact" className="py-12 md:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-h2 font-bold text-foreground mb-2 md:mb-4">
            {t("contact.title1")} <span className="text-gradient">{t("contact.title2")}</span>
          </h2>
          <p className="text-sm md:text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <GlassCard variant="glow" size="lg" className="p-4 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Name */}
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="name" className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
                  <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  {t("contact.name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  required
                  className="bg-secondary/50 border-border text-sm md:text-base"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="email" className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  {t("contact.email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                  required
                  className="bg-secondary/50 border-border text-sm md:text-base"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="phone" className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  {t("contact.phone")}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("contact.phonePlaceholder")}
                  className="bg-secondary/50 border-border text-sm md:text-base"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="subject" className="text-xs md:text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  {t("contact.subject")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("contact.subjectPlaceholder")}
                  required
                  className="bg-secondary/50 border-border text-sm md:text-base"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="message" className="text-xs md:text-sm font-medium text-foreground">
                {t("contact.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.messagePlaceholder")}
                rows={4}
                required
                className="bg-secondary/50 border-border resize-none text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
              <p className="text-xs md:text-sm text-muted-foreground text-center sm:text-left">
                {t("contact.emailUs")}{" "}
                <a href="mailto:hello@singulai.site" className="text-primary hover:underline">
                  hello@singulai.site
                </a>
              </p>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px] md:min-w-[140px] text-sm md:text-base">
                {isSubmitting ? (
                  t("contact.sending")
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                    {t("contact.send")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </Section>
  );
}
