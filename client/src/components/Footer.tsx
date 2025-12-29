import { Button } from "@/components/ui/button";
import { VineDecoration } from "@/components/illustrations";

// Global content imports
import footerContent from "@/content/footer.json";
import settingsContent from "@/content/settings.json";

interface FooterProps {
  onNewsletterClick?: () => void;
  onPartnershipClick?: () => void;
}

export function Footer({ onNewsletterClick, onPartnershipClick }: FooterProps) {
  const scrollToEmailForm = () => {
    if (onNewsletterClick) {
      onNewsletterClick();
    } else {
      document.getElementById("email-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1B5E20] text-white py-12 relative overflow-hidden">
      {/* Decorative vine */}
      <div className="absolute top-0 left-0 right-0 text-[#4CAF50] opacity-20">
        <VineDecoration className="w-full" />
      </div>

      <div className="container relative">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Contact */}
          <div>
            <div className="bg-[#2E7D32] rounded-xl px-4 py-2 inline-block mb-4">
              <span className="text-[#FFC107] text-xl font-bold font-heading">
                GREENLAND
              </span>
              <span className="text-white text-lg ml-1 font-heading">VILLAGE</span>
            </div>
            <p className="text-white/80 mb-2 font-body">📍 {settingsContent.location}</p>
            <p className="text-white/80 font-body">
              ✉️ {settingsContent.contactEmail}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#FFC107] font-heading">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body">
              {footerContent.quickLinks.map((link, index) => (
                <li key={index}>
                  {link.href === "#partnerships" && onPartnershipClick ? (
                    <button
                      onClick={onPartnershipClick}
                      className="text-white/80 hover:text-[#FFC107] transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-[#FFC107] transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media - Placeholder */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#FFC107] font-heading">
              Follow Us
            </h3>
            <p className="text-white/60 text-sm mb-4 font-body">
              Social media coming soon! 🌿
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#FFC107] font-heading">
              {footerContent.newsletterTitle}
            </h3>
            <p className="text-white/80 text-sm mb-4 font-body">
              {footerContent.newsletterDescription} 🌿
            </p>
            <Button
              onClick={scrollToEmailForm}
              className="bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold rounded-full border-2 border-white font-heading"
            >
              {footerContent.newsletterButtonText}
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm font-body">
          <p>{footerContent.copyright} 🐐💚</p>
        </div>
      </div>
    </footer>
  );
}
