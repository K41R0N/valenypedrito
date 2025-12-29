import { useEffect, useRef, useState } from "react";
import { LeafDecoration } from "@/components/illustrations";
import type { ValueCardsContent } from "./types";

interface ValueCardsProps {
  content: ValueCardsContent;
  id?: string;
}

const bgColors = {
  yellow: "bg-[#FFC107]",
  green: "bg-[#4CAF50]",
  cream: "bg-[#FFFEF5]",
};

const titleBgColors = {
  yellow: "bg-[#1B5E20]",
  green: "bg-[#1B5E20]",
  cream: "bg-[#1B5E20]",
};

const titleTextColors = {
  yellow: "text-[#FFC107]",
  green: "text-[#FFC107]",
  cream: "text-[#FFC107]",
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ValueCards({ content, id }: ValueCardsProps) {
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

  const bgColor = bgColors[content.backgroundColor || "yellow"];
  const titleBgColor = titleBgColors[content.backgroundColor || "yellow"];
  const titleTextColor = titleTextColors[content.backgroundColor || "yellow"];
  const columns = columnClasses[content.columns || 4];

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 ${bgColor} relative overflow-hidden`}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-[#1B5E20] opacity-20">
        <LeafDecoration className="w-20 h-20" />
      </div>
      <div className="absolute bottom-10 right-10 text-[#1B5E20] opacity-20">
        <LeafDecoration className="w-16 h-16 rotate-180" />
      </div>

      <div className="container relative">
        <div className="text-center mb-12">
          <div className={`inline-block ${titleBgColor} rounded-2xl px-8 py-3 mb-4`}>
            <h2 className={`text-2xl md:text-4xl ${titleTextColor} font-heading`}>
              {content.titleEmoji && `${content.titleEmoji} `}{content.title}
            </h2>
          </div>
        </div>

        <div className={`grid ${columns} gap-6`}>
          {content.cards.map((card, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-6 shadow-lg border-4 border-[#1B5E20] transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${
                isVisible ? "animate-[scaleIn_0.5s_ease-out_forwards]" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
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
  );
}
