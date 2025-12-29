import { useEffect, useRef, useState } from "react";
import { OliveBranchDecoration } from "@/components/illustrations";
import type { ValueCardsContent } from "./types";

interface ValueCardsProps {
  content: ValueCardsContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#F9F7F2]",
  beige: "bg-[#F0EBE0]",
  white: "bg-white",
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

  const bgColor = bgColors[content.backgroundColor as keyof typeof bgColors] || bgColors.cream;
  const columns = columnClasses[content.columns || 4];

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 ${bgColor} relative overflow-hidden`}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-[#7A8B6E] opacity-20">
        <OliveBranchDecoration className="w-32 h-16" />
      </div>
      <div className="absolute bottom-10 right-10 text-[#7A8B6E] opacity-20 rotate-180">
        <OliveBranchDecoration className="w-32 h-16" />
      </div>

      <div className="container relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl text-[#2C2C2C] font-serif uppercase tracking-wider">
            {content.title}
          </h2>
        </div>

        <div className={`grid ${columns} gap-6`}>
          {content.cards.map((card, index) => (
            <div
              key={index}
              className={`group bg-white p-6 shadow-sm border border-[#F0EBE0] transition-all duration-300 hover:-translate-y-3 hover:shadow-lg ${
                isVisible ? "animate-[scaleIn_0.5s_ease-out_forwards]" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
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
  );
}
