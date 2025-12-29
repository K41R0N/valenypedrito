import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

interface OurStoryContent {
  title?: string;
  subtitle?: string;
  story?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: "white" | "warm" | "subtle";
}

interface OurStoryProps {
  content: OurStoryContent;
  id?: string;
}

export function OurStory({ content, id }: OurStoryProps) {
  const {
    title = "Nuestra Historia",
    subtitle = "Dos corazones, un camino, amor infinito",
    story = "Nuestra historia de amor comenzó con un momento que lo cambió todo. Desde aquel primer encuentro hasta esta hermosa celebración, cada momento ha sido un testimonio de nuestro compromiso de construir una vida juntos.\n\nEste septiembre, los invitamos a ser parte de nuestra mayor aventura.",
    image,
    imageAlt = "Nuestra historia",
    imagePosition = "left",
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

  const storyParagraphs = story.split("\n\n").filter(Boolean);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-wrapper ${bgClass}`}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
          {subtitle && <p className="text-accent font-serif text-xl">{subtitle}</p>}
        </div>

        {/* Content Grid */}
        <div
          className={`grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-700`}
        >
          {/* Image */}
          <div
            className={`${imagePosition === "right" ? "md:order-2" : ""} ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "200ms" }}
          >
            {image ? (
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-luxury group">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="aspect-[3/4] rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center">
                <div className="text-center text-[var(--text-light)]">
                  <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Foto de pareja</p>
                </div>
              </div>
            )}
          </div>

          {/* Story Text */}
          <div
            className={`${imagePosition === "right" ? "md:order-1" : ""} ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "400ms" }}
          >
            <div className="space-y-6">
              {storyParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[var(--text-secondary)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Decorative Star */}
            <div className="mt-8 flex justify-center md:justify-start">
              <Star className="w-6 h-6 text-accent fill-current opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
