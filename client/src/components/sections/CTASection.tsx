import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SunIcon, GoatMascot } from "@/components/illustrations";
import type { CTASectionContent } from "./types";

interface CTASectionProps {
  content: CTASectionContent;
  id?: string;
  onCtaClick?: () => void;
}

const bgColors = {
  "dark-green": "bg-[#1B5E20]",
  green: "bg-[#4CAF50]",
  yellow: "bg-[#FFC107]",
};

const titleBgColors = {
  "dark-green": "bg-[#FFC107]",
  green: "bg-[#1B5E20]",
  yellow: "bg-[#1B5E20]",
};

const titleTextColors = {
  "dark-green": "text-[#1B5E20]",
  green: "text-[#FFC107]",
  yellow: "text-[#FFC107]",
};

const descriptionColors = {
  "dark-green": "text-white",
  green: "text-white",
  yellow: "text-[#1B5E20]",
};

export function CTASection({ content, id, onCtaClick }: CTASectionProps) {
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

  const bgColor = bgColors[content.backgroundColor || "dark-green"];
  const titleBgColor = titleBgColors[content.backgroundColor || "dark-green"];
  const titleTextColor = titleTextColors[content.backgroundColor || "dark-green"];
  const descriptionColor = descriptionColors[content.backgroundColor || "dark-green"];

  const handleCtaClick = () => {
    const action = content.ctaButtonAction;

    // Handle explicit action types
    if (action === "modal") {
      // Modal action - use callback if provided
      if (onCtaClick) {
        onCtaClick();
      }
      return;
    }

    if (action === "scroll" && content.ctaButtonLink) {
      // Scroll action - smooth scroll to element
      document.querySelector(content.ctaButtonLink)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (action === "link" && content.ctaButtonLink) {
      // Link action - navigate to URL
      window.location.href = content.ctaButtonLink;
      return;
    }

    // Fallback behavior when no explicit action is set
    if (onCtaClick) {
      onCtaClick();
    } else if (content.ctaButtonLink) {
      if (content.ctaButtonLink.startsWith("#")) {
        document.querySelector(content.ctaButtonLink)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = content.ctaButtonLink;
      }
    }
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 ${bgColor} relative overflow-hidden`}
    >
      {/* Decorative sun */}
      <div className="absolute top-10 right-10 w-32 h-32 text-[#FFC107] opacity-30">
        <SunIcon className="w-full h-full" />
      </div>

      {/* Goat mascot */}
      <div className="absolute bottom-10 left-10 w-24 h-20 opacity-50">
        <GoatMascot className="w-full h-full" />
      </div>

      <div className="container relative text-center">
        <div className={`inline-block ${titleBgColor} rounded-2xl px-8 py-3 mb-6`}>
          <h2 className={`text-2xl md:text-4xl ${titleTextColor} font-heading`}>
            {content.titleEmoji && `${content.titleEmoji} `}{content.title}
          </h2>
        </div>
        <p
          className={`text-lg md:text-xl ${descriptionColor} mb-8 max-w-2xl mx-auto font-body ${
            isVisible ? "animate-[fadeInUp_0.6s_ease-out_forwards]" : "opacity-0"
          }`}
        >
          {content.description}
        </p>

        {/* Use case icons */}
        {content.useCases && content.useCases.length > 0 && (
          <div
            className={`flex flex-wrap justify-center gap-4 md:gap-8 mb-10 ${
              isVisible ? "animate-[fadeInUp_0.6s_ease-out_forwards]" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            {content.useCases.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#4CAF50] rounded-full flex items-center justify-center text-3xl md:text-4xl group-hover:bg-[#FFC107] group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {item.emoji}
                </div>
                <span className="text-white/90 text-sm md:text-base font-semibold font-body">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          size="lg"
          onClick={handleCtaClick}
          className={`bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl border-4 border-white font-heading ${
            isVisible ? "animate-[fadeInUp_0.6s_ease-out_forwards]" : "opacity-0"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          📧 {content.ctaButtonText}
        </Button>
      </div>
    </section>
  );
}
