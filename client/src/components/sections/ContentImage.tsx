import { useEffect, useRef, useState } from "react";
import { SunIcon, LeafDecoration, VineDecoration } from "@/components/illustrations";
import type { ContentImageContent } from "./types";

interface ContentImageProps {
  content: ContentImageContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#FFFEF5]",
  green: "bg-[#4CAF50]",
  yellow: "bg-[#FFC107]",
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

  const bgColor = bgColors[content.backgroundColor || "cream"];
  const isImageLeft = content.imagePosition === "left";

  const textContent = (
    <div
      className={`${isVisible ? (isImageLeft ? "animate-[slideInRight_0.8s_ease-out_forwards]" : "animate-[slideInLeft_0.8s_ease-out_forwards]") : "opacity-0"}`}
    >
      <div className="inline-block bg-[#1B5E20] rounded-2xl px-6 py-2 mb-6">
        <h2 className="text-2xl md:text-3xl text-[#FFC107] font-heading">
          {content.titleEmoji && `${content.titleEmoji} `}{content.title}
        </h2>
      </div>
      {(content.description || content.content) && (
        <div className="text-lg text-[var(--stone-grey)] mb-6 leading-relaxed font-body prose prose-sm max-w-none">
          {content.description || content.content}
        </div>
      )}
      {content.features && content.features.length > 0 && (
        <div className="space-y-3">
          {content.features.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 bg-[#E8F5E9] rounded-xl p-3 hover:bg-[#C8E6C9] transition-all duration-300 hover:translate-x-2 ${
                isVisible ? "animate-[fadeInUp_0.5s_ease-out_forwards]" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-[#1B5E20] font-semibold font-body">{item.text}</p>
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
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {/* Decorative elements */}
      {isImageLeft ? (
        <div className="absolute -bottom-4 -left-4 text-[#4CAF50]">
          <LeafDecoration className="w-12 h-12" />
        </div>
      ) : (
        <div className="absolute -top-6 -right-6 w-16 h-16 text-[#FFC107]">
          <SunIcon className="w-full h-full" />
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
      {/* Decorative vine at top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[#4CAF50] opacity-30 w-64">
        <VineDecoration className="w-full" />
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
