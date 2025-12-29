import { useEffect, useRef, useState } from "react";
import { MapPin, Camera, Utensils, Music } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Highlight {
  icon: "landmark" | "photo" | "food" | "entertainment";
  title: string;
  description: string;
}

interface DestinationGuideContent {
  title?: string;
  subtitle?: string;
  content: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  highlights?: Highlight[];
  backgroundColor?: "white" | "warm" | "subtle";
}

interface DestinationGuideProps {
  content: DestinationGuideContent;
  id?: string;
}

export function DestinationGuide({ content, id }: DestinationGuideProps) {
  const {
    title = "Descubre el Destino",
    subtitle,
    content: textContent,
    image,
    imageAlt = "Destino",
    imagePosition = "right",
    highlights = [],
    backgroundColor = "warm",
  } = content;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const iconMap = {
    landmark: MapPin,
    photo: Camera,
    food: Utensils,
    entertainment: Music,
  };

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2
            className={`section-title ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {title}
          </h2>
          <div
            className={`${isVisible ? "animate-scale-in" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            <div className="decorative-line" />
          </div>
          {subtitle && (
            <p
              className={`section-subtitle ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "200ms" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${
              isVisible ? "opacity-100" : "opacity-0"
            } transition-opacity duration-700`}
          >
            {/* Image */}
            <div
              className={`${imagePosition === "right" ? "md:order-2" : ""} ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: "300ms" }}
            >
              {image ? (
                <div className="relative">
                  {/* Decorative frame */}
                  <div className="absolute -inset-4 border border-[var(--dusty-rose)] opacity-20 rounded-lg" />
                  <div className="relative rounded-lg overflow-hidden shadow-luxury">
                    <img
                      src={image}
                      alt={imageAlt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center">
                  <div className="text-center text-[var(--text-light)]">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">Imagen del destino</p>
                  </div>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div
              className={`${imagePosition === "right" ? "md:order-1" : ""} ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: "400ms" }}
            >
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="text-[var(--text-secondary)] leading-relaxed mb-6 last:mb-0">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-sans-semibold text-[var(--text-primary)]">
                        {children}
                      </strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2 mb-6">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                        <span className="text-[var(--dusty-rose)] mt-1.5">•</span>
                        <span>{children}</span>
                      </li>
                    ),
                  }}
                >
                  {textContent}
                </ReactMarkdown>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => {
                    const Icon = iconMap[highlight.icon] || MapPin;
                    return (
                      <div
                        key={index}
                        className={`p-4 bg-white rounded-lg border border-[var(--border-light)] hover:border-[var(--dusty-rose)] hover:shadow-md transition-all duration-300 ${
                          isVisible ? "animate-fade-in-up" : ""
                        }`}
                        style={{ animationDelay: `${500 + index * 100}ms` }}
                      >
                        <Icon className="w-5 h-5 text-[var(--dusty-rose)] mb-2" />
                        <h4 className="font-sans-semibold text-sm text-[var(--text-primary)] mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {highlight.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
