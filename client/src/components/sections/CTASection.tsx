import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { OliveBranchDecoration } from "@/components/illustrations";
import type { CTASectionContent } from "./types";

interface CTASectionProps {
  content: CTASectionContent;
  id?: string;
  onCtaClick?: () => void;
}

const bgColors = {
  bronze: "bg-[#9C7C58]",
  sage: "bg-[#7A8B6E]",
  cream: "bg-[#F9F7F2]",
  beige: "bg-[#F0EBE0]",
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

  const bgColor = bgColors[content.backgroundColor as keyof typeof bgColors] || bgColors.bronze;
  const isLightBg = content.backgroundColor === "cream" || content.backgroundColor === "beige";

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
      {/* Decorative elements */}
      <div className={`absolute top-10 right-10 ${isLightBg ? 'text-[#9C7C58]' : 'text-white'} opacity-20`}>
        <OliveBranchDecoration className="w-32 h-16" />
      </div>
      <div className={`absolute bottom-10 left-10 ${isLightBg ? 'text-[#9C7C58]' : 'text-white'} opacity-20 rotate-180`}>
        <OliveBranchDecoration className="w-32 h-16" />
      </div>

      <div className="container relative text-center">
        <h2 className={`text-2xl md:text-4xl ${isLightBg ? 'text-[#2C2C2C]' : 'text-white'} font-serif uppercase tracking-wider mb-6`}>
          {content.title}
        </h2>
        <p
          className={`text-lg md:text-xl ${isLightBg ? 'text-[#595959]' : 'text-white/90'} mb-8 max-w-2xl mx-auto font-body ${
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
                <div className={`w-16 h-16 md:w-20 md:h-20 ${isLightBg ? 'bg-[#9C7C58]' : 'bg-white/20'} flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  {item.emoji}
                </div>
                <span className={`${isLightBg ? 'text-[#595959]' : 'text-white/90'} text-sm md:text-base font-medium font-body`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          size="lg"
          onClick={handleCtaClick}
          className={`${isLightBg ? 'bg-[#9C7C58] hover:bg-[#7A8B6E] text-white' : 'bg-white hover:bg-[#F9F7F2] text-[#2C2C2C]'} font-medium px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-body ${
            isVisible ? "animate-[fadeInUp_0.6s_ease-out_forwards]" : "opacity-0"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          {content.ctaButtonText}
        </Button>
      </div>
    </section>
  );
}
