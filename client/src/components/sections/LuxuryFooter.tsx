import { MapPin, Mail, Phone, Instagram, Facebook, Heart } from "lucide-react";

interface QuickLink {
  label: string;
  href: string;
}

interface LuxuryFooterContent {
  brideName?: string;
  groomName?: string;
  location?: string;
  email?: string;
  phone?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  hashtag?: string;
  quickLinks?: QuickLink[];
  copyright?: string;
  showSocialMedia?: boolean;
}

interface LuxuryFooterProps {
  content: LuxuryFooterContent;
  id?: string;
}

export function LuxuryFooter({ content, id }: LuxuryFooterProps) {
  const {
    brideName = "Valentina",
    groomName = "Pedro Juan",
    location = "Sevilla, España",
    email,
    phone,
    instagramUrl,
    facebookUrl,
    hashtag = "#ValenYPedrito2026",
    quickLinks = [
      { label: "Inicio", href: "#" },
      { label: "Detalles", href: "#detalles" },
      { label: "RSVP", href: "#rsvp" },
      { label: "FAQ", href: "#faq" },
    ],
    copyright = "© 2026 Valentina & Pedro Juan",
    showSocialMedia = true,
  } = content;

  const currentYear = new Date().getFullYear();

  return (
    <footer id={id} className="bg-[var(--bg-subtle)] border-t border-[var(--border-light)]">
      <div className="container py-16">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* Couple Names */}
          <h2 className="font-script text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            {brideName} & {groomName}
          </h2>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-[var(--text-secondary)] text-sm mt-6">
            {location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{location}</span>
              </div>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span>{email}</span>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" />
                <span>{phone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Decorative Line */}
        <div className="decorative-line mb-12" />

        {/* Quick Links */}
        {quickLinks.length > 0 && (
          <div className="text-center mb-12">
            <h3 className="text-xs font-sans-semibold uppercase tracking-wider text-[var(--text-light)] mb-4">
              Enlaces Rápidos
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[var(--text-secondary)] hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Social Media */}
        {showSocialMedia && (instagramUrl || facebookUrl) && (
          <div className="text-center mb-12">
            <h3 className="text-xs font-sans-semibold uppercase tracking-wider text-[var(--text-light)] mb-4">
              Síguenos
            </h3>
            <div className="flex justify-center gap-4">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--bg-white)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] hover:text-accent hover:border-[var(--dusty-rose)] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--bg-white)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-secondary)] hover:text-accent hover:border-[var(--dusty-rose)] transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Decorative Line */}
        <div className="decorative-line mb-8" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-[var(--text-light)] text-xs mb-2">
            {copyright || `© ${currentYear} ${brideName} & ${groomName}`}
          </p>
          <p className="text-[var(--text-light)] text-xs flex items-center justify-center gap-1">
            Diseñado con <Heart className="w-3 h-3 text-accent fill-current" /> para nuestra boda
          </p>
          {hashtag && (
            <p className="mt-4 text-accent font-serif text-lg">{hashtag}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
