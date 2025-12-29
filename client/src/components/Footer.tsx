import { Button } from "@/components/ui/button";
import { OliveBranchDecoration } from "@/components/illustrations";

// Global content imports
import footerContent from "@/content/footer.json";
import settingsContent from "@/content/settings.json";

interface FooterProps {
  onNewsletterClick?: () => void;
}

export function Footer({ onNewsletterClick }: FooterProps) {
  const scrollToEmailForm = () => {
    if (onNewsletterClick) {
      onNewsletterClick();
    } else {
      document.getElementById("email-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#2C2C2C] text-white py-12 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 text-[#9C7C58] opacity-10">
        <OliveBranchDecoration className="w-full" />
      </div>

      <div className="container relative">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Contact */}
          <div>
            <div className="mb-4">
              <span className="font-script text-3xl text-[#D6966C]">
                Valentina & Pedro Juan
              </span>
            </div>
            <p className="text-white/80 mb-2 font-body">📍 {settingsContent.location}</p>
            <p className="text-white/80 font-body">
              ✉️ {settingsContent.contactEmail}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif uppercase tracking-wide text-lg mb-4 text-[#D6966C]">
              Enlaces
            </h3>
            <ul className="space-y-2 font-body">
              {footerContent.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-[#D6966C] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hashtag */}
          <div>
            <h3 className="font-serif uppercase tracking-wide text-lg mb-4 text-[#D6966C]">
              Síguenos
            </h3>
            <p className="text-white/60 text-sm mb-4 font-body">
              #ValenYPedrito2026
            </p>
          </div>

          {/* RSVP */}
          <div>
            <h3 className="font-serif uppercase tracking-wide text-lg mb-4 text-[#D6966C]">
              {footerContent.newsletterTitle}
            </h3>
            <p className="text-white/80 text-sm mb-4 font-body">
              {footerContent.newsletterDescription}
            </p>
            <Button
              onClick={scrollToEmailForm}
              className="bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-body"
            >
              {footerContent.newsletterButtonText}
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm font-body">
          <p>{footerContent.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
