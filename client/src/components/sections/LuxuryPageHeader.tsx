import { useEffect, useRef, useState } from "react";
import { Heart, Star, MapPin } from "lucide-react";

interface LuxuryPageHeaderContent {
  title: string;
  subtitle?: string;
  icon?: "heart" | "star" | "location";
  backgroundColor?: "white" | "warm" | "subtle" | "accent";
}

interface LuxuryPageHeaderProps {
  content: LuxuryPageHeaderContent;
  id?: string;
}

export function LuxuryPageHeader({ content, id }: LuxuryPageHeaderProps) {
  const {
    title,
    subtitle,
    icon = "heart",
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
    accent: "bg-accent-light",
  }[backgroundColor];

  const IconComponent = {
    heart: Heart,
    star: Star,
    location: MapPin,
  }[icon];

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative py-24 md:py-32 ${bgClass} overflow-hidden`}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--dusty-rose)] opacity-[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--sage-green)] opacity-[0.03] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div
            className={`mb-8 ${isVisible ? "animate-fade-in-down" : "opacity-0"}`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--dusty-rose)] bg-opacity-10">
              <IconComponent className="w-8 h-8 text-[var(--dusty-rose)]" />
            </div>
          </div>

          {/* Title */}
          <h1
            className={`section-title mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            {title}
          </h1>

          {/* Decorative line */}
          <div
            className={`${isVisible ? "animate-scale-in" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="decorative-line" />
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={`section-subtitle mt-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "300ms" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
