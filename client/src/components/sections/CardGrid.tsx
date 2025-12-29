import { useEffect, useRef, useState } from "react";
import { WavyDivider } from "@/components/illustrations";
import type { CardGridContent } from "./types";

interface CardGridProps {
  content: CardGridContent;
  id?: string;
  showDividers?: boolean;
}

const bgColors = {
  cream: "bg-[#F9F7F2]",
  beige: "bg-[#F0EBE0]",
  white: "bg-white",
  bronze: "bg-[#9C7C58]",
};

// Raw color values for WavyDivider component
const dividerColors: Record<string, string> = {
  cream: "#F9F7F2",
  beige: "#F0EBE0",
  white: "#FFFFFF",
  bronze: "#9C7C58",
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function CardGrid({ content, id, showDividers = true }: CardGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgColor = bgColors[content.backgroundColor as keyof typeof bgColors] || bgColors.cream;
  const columns = columnClasses[content.columns || 4];

  return (
    <>
      <section
        id={id}
        ref={sectionRef}
        className={`py-20 ${bgColor} relative`}
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl text-[#2C2C2C] font-serif uppercase tracking-wider mb-4">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-lg text-[#595959] max-w-2xl mx-auto font-body">
                {content.subtitle}
              </p>
            )}
          </div>

          <div className={`grid ${columns} gap-6`}>
            {content.cards.map((card, index) => (
              <div
                key={index}
                className={`group bg-white p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl border border-[#F0EBE0] relative overflow-hidden ${
                  isVisible ? "animate-[scaleIn_0.5s_ease-out_forwards]" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {card.badgeText && (
                  <div className="absolute -right-8 top-4 bg-[#9C7C58] text-white text-xs font-medium py-1 px-8 rotate-45 shadow-md">
                    {card.badgeText}
                  </div>
                )}
                <div
                  className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  {card.emoji}
                </div>
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-3 font-serif uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-[#595959] font-body">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy Divider after section */}
      {showDividers && (
        <WavyDivider
          flip
          color={dividerColors[content.backgroundColor as keyof typeof dividerColors] || "#F9F7F2"}
        />
      )}
    </>
  );
}
