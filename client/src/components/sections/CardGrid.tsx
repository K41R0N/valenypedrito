import { useEffect, useRef, useState } from "react";
import { WavyDivider } from "@/components/illustrations";
import type { CardGridContent } from "./types";

interface CardGridProps {
  content: CardGridContent;
  id?: string;
  showDividers?: boolean;
}

const bgColors = {
  green: "bg-[#4CAF50]",
  cream: "bg-[#FFFEF5]",
  yellow: "bg-[#FFC107]",
  "dark-green": "bg-[#1B5E20]",
};

// Raw color values for WavyDivider component
const dividerColors: Record<string, string> = {
  green: "#4CAF50",
  cream: "#FFFEF5",
  yellow: "#FFC107",
  "dark-green": "#1B5E20",
};

const titleColors = {
  green: "text-[#FFC107]",
  cream: "text-[#FFC107]",
  yellow: "text-[#1B5E20]",
  "dark-green": "text-[#FFC107]",
};

const subtitleColors = {
  green: "text-white",
  cream: "text-[#1B5E20]",
  yellow: "text-[#1B5E20]",
  "dark-green": "text-white",
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

  const bgColor = bgColors[content.backgroundColor || "green"];
  const titleColor = titleColors[content.backgroundColor || "green"];
  const subtitleColor = subtitleColors[content.backgroundColor || "green"];
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
            <div className="inline-block bg-[#1B5E20] rounded-2xl px-8 py-3 mb-4">
              <h2 className={`text-2xl md:text-4xl ${titleColor} font-heading`}>
                {content.titleEmoji && `${content.titleEmoji} `}{content.title}
              </h2>
            </div>
            {content.subtitle && (
              <p className={`text-lg ${subtitleColor} max-w-2xl mx-auto font-body`}>
                {content.subtitle}
              </p>
            )}
          </div>

          <div className={`grid ${columns} gap-6`}>
            {content.cards.map((card, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl border-4 border-[#1B5E20] relative overflow-hidden ${
                  isVisible ? "animate-[scaleIn_0.5s_ease-out_forwards]" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {card.badgeText && (
                  <div className="absolute -right-8 top-4 bg-[#FFC107] text-[#1B5E20] text-xs font-bold py-1 px-8 rotate-45 shadow-md font-heading">
                    {card.badgeText}
                  </div>
                )}
                <div
                  className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300 group-hover:animate-bounce"
                  style={{ animationDuration: "0.5s" }}
                >
                  {card.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-3 font-heading">
                  {card.title}
                </h3>
                <p className="text-[#2E7D32] font-body">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy Divider after section */}
      {showDividers && (
        <WavyDivider
          flip
          color={dividerColors[content.backgroundColor || "green"] || "#4CAF50"}
        />
      )}
    </>
  );
}
