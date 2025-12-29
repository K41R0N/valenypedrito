import { useEffect, useRef, useState } from "react";
import { Plane, Hotel, Car, Sparkles, ExternalLink, Phone, ChevronDown, MapPin } from "lucide-react";

interface Recommendation {
  name: string;
  description: string;
  link?: string;
  phone?: string;
}

interface TravelSection {
  sectionTitle: string;
  icon: "airplane" | "hotel" | "car" | "beauty" | "location";
  content: string;
  recommendations?: Recommendation[];
}

interface TravelGuideContent {
  title?: string;
  subtitle?: string;
  sections: TravelSection[];
  backgroundColor?: "white" | "warm" | "subtle";
}

interface TravelGuideProps {
  content: TravelGuideContent;
  id?: string;
}

function TravelCard({
  section,
  index,
  isExpanded,
  onToggle,
}: {
  section: TravelSection;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const iconMap = {
    airplane: Plane,
    hotel: Hotel,
    car: Car,
    beauty: Sparkles,
    location: MapPin,
  };

  const Icon = iconMap[section.icon] || Plane;

  return (
    <div
      ref={cardRef}
      className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card-luxury p-0 overflow-hidden">
        {/* Header - Clickable */}
        <button
          onClick={onToggle}
          className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-[var(--bg-subtle)] transition-colors"
        >
          <div className="flex items-center gap-5">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-[var(--dusty-rose)] bg-opacity-10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-[var(--dusty-rose)]" />
            </div>

            {/* Title */}
            <div>
              <h3 className="font-serif-semibold text-xl md:text-2xl text-[var(--text-primary)]">
                {section.sectionTitle}
              </h3>
              {section.recommendations && section.recommendations.length > 0 && (
                <p className="text-sm text-[var(--text-light)] mt-1">
                  {section.recommendations.length} recomendaciones
                </p>
              )}
            </div>
          </div>

          {/* Expand icon */}
          <div
            className={`text-[var(--dusty-rose)] transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="w-6 h-6" />
          </div>
        </button>

        {/* Expandable content */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-in-out ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 md:px-8 pb-8">
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent mb-6" />

            {/* Content description */}
            <div className="prose prose-sm max-w-none mb-8">
              {section.content.split("\n\n").map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-[var(--text-secondary)] leading-relaxed mb-4 last:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br />"),
                  }}
                />
              ))}
            </div>

            {/* Recommendations grid */}
            {section.recommendations && section.recommendations.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {section.recommendations.map((rec, recIndex) => (
                  <div
                    key={recIndex}
                    className="p-5 bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-lg hover:border-[var(--dusty-rose)] hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="font-sans-semibold text-base text-[var(--text-primary)] mb-2">
                      {rec.name}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {rec.description}
                    </p>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-4">
                      {rec.link && (
                        <a
                          href={rec.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[var(--dusty-rose)] hover:text-[var(--warm-gold)] font-sans-medium transition-colors"
                        >
                          <span>Visitar sitio</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {rec.phone && (
                        <a
                          href={`tel:${rec.phone}`}
                          className="inline-flex items-center gap-2 text-sm text-[var(--sage-green)] hover:text-[var(--dusty-rose)] font-sans-medium transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {rec.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TravelGuide({ content, id }: TravelGuideProps) {
  const {
    title = "Guía de Viaje",
    subtitle,
    sections = [],
    backgroundColor = "white",
  } = content;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgClass = {
    white: "bg-section-white",
    warm: "bg-section-warm",
    subtle: "bg-section-subtle",
  }[backgroundColor];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="section-header">
            <h2
              className={`section-title ${isHeaderVisible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              {title}
            </h2>
            <div
              className={`${isHeaderVisible ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              <div className="decorative-line" />
            </div>
            {subtitle && (
              <p
                className={`section-subtitle ${isHeaderVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: "200ms" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <TravelCard
                key={index}
                section={section}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
