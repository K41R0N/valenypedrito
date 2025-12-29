import { useEffect, useRef, useState } from "react";
import { Shirt, Baby, X } from "lucide-react";

interface DetailCard {
  icon?: "dresscode" | "children" | "custom";
  title: string;
  content: string;
  restrictions?: string[];
}

interface DetailsCardsContent {
  title?: string;
  subtitle?: string;
  cards?: DetailCard[];
  backgroundColor?: "white" | "warm" | "subtle";
}

interface DetailsCardsProps {
  content: DetailsCardsContent;
  id?: string;
}

const iconMap = {
  dresscode: Shirt,
  children: Baby,
  custom: Shirt,
};

export function DetailsCards({ content, id }: DetailsCardsProps) {
  const {
    title = "Detalles Importantes",
    subtitle,
    cards = [
      {
        icon: "dresscode",
        title: "Código de Vestimenta",
        content: "Formal / Cocktail\n\nRopa formal pero cómoda para disfrutar de toda la celebración.",
        restrictions: ["Blanco", "Marfil", "Beige claro"],
      },
      {
        icon: "children",
        title: "Información Sobre Niños",
        content: "Queremos que todos disfruten de la celebración.\n\nSi necesitas ayuda organizando el cuidado de los pequeños, contáctanos y te daremos opciones de niñeras de confianza.",
      },
    ],
    backgroundColor = "warm",
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
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon || "custom"];
            return (
              <div
                key={index}
                className={`card-luxury text-center transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center">
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl uppercase tracking-wide mb-4">
                  {card.title}
                </h3>

                {/* Content */}
                <div className="text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-line mb-4">
                  {card.content}
                </div>

                {/* Restrictions */}
                {card.restrictions && card.restrictions.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[var(--border-light)]">
                    <p className="text-xs uppercase tracking-wider text-[var(--text-light)] mb-3">
                      Por favor evita
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {card.restrictions.map((restriction, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs rounded-full"
                        >
                          <X className="w-3 h-3 text-accent" />
                          {restriction}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
