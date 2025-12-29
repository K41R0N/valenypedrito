import { useEffect, useRef, useState } from "react";
import { Camera, Instagram, Hash } from "lucide-react";

interface PhotoSharingContent {
  title?: string;
  subtitle?: string;
  hashtag?: string;
  description?: string;
  instagramUrl?: string;
  backgroundColor?: "white" | "warm" | "subtle";
}

interface PhotoSharingProps {
  content: PhotoSharingContent;
  id?: string;
}

export function PhotoSharing({ content, id }: PhotoSharingProps) {
  const {
    title = "Comparte Tus Momentos",
    subtitle = "Queremos ver la boda a través de tus ojos",
    hashtag = "#ValenYPedrito2026",
    description = "Tus fotos aparecerán en nuestra galería digital y podremos revivir juntos todos los momentos especiales de este día.",
    instagramUrl,
    backgroundColor = "subtle",
  } = content;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        <div
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[var(--bg-white)] border border-[var(--border-light)] flex items-center justify-center">
            <Camera className="w-10 h-10 text-accent" />
          </div>

          {/* Title */}
          <h2 className="section-title mb-4">{title}</h2>
          <div className="decorative-line mb-6" />

          {/* Subtitle */}
          {subtitle && (
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              {subtitle}
            </p>
          )}

          {/* Hashtag */}
          <div
            className={`inline-flex items-center gap-2 px-8 py-4 bg-[var(--bg-white)] border border-[var(--dusty-rose)] rounded-full mb-8 transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Hash className="w-5 h-5 text-accent" />
            <span className="font-serif text-2xl text-accent">
              {hashtag.replace("#", "")}
            </span>
          </div>

          {/* Description */}
          {description && (
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              {description}
            </p>
          )}

          {/* Instagram Link */}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-sans-medium">Síguenos en Instagram</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
