import { useEffect, useRef, useState } from "react";
import { OliveBranchDecoration } from "@/components/illustrations";
import type { ContentImageContent } from "./types";

interface ContentImageProps {
  content: ContentImageContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#F9F7F2]",
  beige: "bg-[#F0EBE0]",
  white: "bg-white",
};

export function ContentImage({ content, id }: ContentImageProps) {
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
  const isImageLeft = content.imagePosition === "left";

  const textContent = (
    <div
      className={`${isVisible ? (isImageLeft ? "animate-[slideInRight_0.8s_ease-out_forwards]" : "animate-[slideInLeft_0.8s_ease-out_forwards]") : "opacity-0"}`}
    >
      <h2 className="text-2xl md:text-3xl text-[#2C2C2C] font-serif uppercase tracking-wider mb-6">
        {content.title}
      </h2>
      {(content.description || content.content) && (
        <div className="text-lg text-[#595959] mb-6 leading-relaxed font-body">
          {content.description || content.content}
        </div>
      )}
      {content.features && content.features.length > 0 && (
        <div className="space-y-3">
          {content.features.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 bg-[#F0EBE0] p-3 hover:bg-[#F9F7F2] transition-all duration-300 hover:translate-x-2 ${
                isVisible ? "animate-[fadeInUp_0.5s_ease-out_forwards]" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-[#2C2C2C] font-medium font-body">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const imageContent = (
    <div
      className={`relative ${isVisible ? (isImageLeft ? "animate-[slideInLeft_0.8s_ease-out_forwards]" : "animate-[slideInRight_0.8s_ease-out_forwards]") : "opacity-0"}`}
    >
      <div>
        <img
          src={content.image}
          alt={content.imageAlt}
          className="w-full h-auto filter drop-shadow-lg"
          loading="lazy"
        />
      </div>
      {/* Decorative olive branch elements */}
      {isImageLeft ? (
        <div className="absolute -bottom-4 -left-4 text-[#7A8B6E] opacity-50">
          <OliveBranchDecoration className="w-24 h-12" />
        </div>
      ) : (
        <div className="absolute -top-4 -right-4 text-[#7A8B6E] opacity-50 rotate-180">
          <OliveBranchDecoration className="w-24 h-12" />
        </div>
      )}
    </div>
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-20 ${bgColor} relative`}
    >
      {/* Decorative element at top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[#9C7C58] opacity-20 w-64">
        <OliveBranchDecoration className="w-full" />
      </div>

      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {isImageLeft ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
