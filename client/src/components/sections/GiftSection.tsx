import { useEffect, useRef, useState } from "react";
import { Gift, Heart, ExternalLink } from "lucide-react";

interface RegistryLink {
  name: string;
  url: string;
  logo?: string;
}

interface GiftSectionContent {
  title?: string;
  message?: string;
  registryLinks?: RegistryLink[];
  showHoneymoonFund?: boolean;
  honeymoonMessage?: string;
  backgroundColor?: "white" | "warm" | "subtle";
}

interface GiftSectionProps {
  content: GiftSectionContent;
  id?: string;
}

export function GiftSection({ content, id }: GiftSectionProps) {
  const {
    title = "Regalo Especial",
    message = "Vuestra presencia es el mejor regalo que podríamos recibir.\n\nSi deseáis hacernos un obsequio, hemos preparado algunas sugerencias:",
    registryLinks = [],
    showHoneymoonFund = true,
    honeymoonMessage = "O contribuir a nuestra luna de miel. Contáctanos directamente para esta opción.",
    backgroundColor = "white",
  } = content;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgClass = {
    white: "bg-section-white",
    warm: "bg-section-warm",
    subtle: "bg-section-subtle",
  }[backgroundColor];

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
        </div>

        {/* Content */}
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Message */}
          <div className="mb-10">
            {message.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-[var(--text-secondary)] leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Registry Links */}
          {registryLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {registryLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--bg-white)] border border-[var(--border-light)] rounded-lg hover:border-[var(--dusty-rose)] hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {link.logo ? (
                    <img
                      src={link.logo}
                      alt={link.name}
                      className="h-6 w-auto"
                    />
                  ) : (
                    <Gift className="w-5 h-5 text-accent" />
                  )}
                  <span className="font-sans-medium text-[var(--text-primary)]">
                    {link.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[var(--text-light)]" />
                </a>
              ))}
            </div>
          )}

          {/* Honeymoon Fund */}
          {showHoneymoonFund && honeymoonMessage && (
            <div className="pt-8 border-t border-[var(--border-light)]">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {honeymoonMessage}
              </p>
            </div>
          )}

          {/* Decorative Element */}
          <div className="mt-10">
            <Heart className="w-6 h-6 mx-auto text-accent fill-current opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
