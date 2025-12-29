import { useEffect, useRef, useState } from "react";
import { Info, Heart, Star, Sun, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface LuxuryInfoCardContent {
  title: string;
  content: string;
  icon?: "info" | "heart" | "star" | "sun" | "contact";
  style?: "normal" | "highlight" | "accent";
  backgroundColor?: "white" | "warm" | "subtle";
}

interface LuxuryInfoCardProps {
  content: LuxuryInfoCardContent;
  id?: string;
}

export function LuxuryInfoCard({ content, id }: LuxuryInfoCardProps) {
  const {
    title,
    content: cardContent,
    icon = "info",
    style = "normal",
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
  }[backgroundColor];

  const iconMap = {
    info: Info,
    heart: Heart,
    star: Star,
    sun: Sun,
    contact: Mail,
  };

  const Icon = iconMap[icon];

  const styleClasses = {
    normal: {
      card: "bg-white border-[var(--border-light)]",
      iconBg: "bg-[var(--sage-green)] bg-opacity-10",
      iconColor: "text-[var(--sage-green)]",
    },
    highlight: {
      card: "bg-[var(--dusty-rose)] bg-opacity-5 border-[var(--dusty-rose)]",
      iconBg: "bg-[var(--dusty-rose)]",
      iconColor: "text-white",
    },
    accent: {
      card: "bg-[var(--warm-gold)] bg-opacity-5 border-[var(--warm-gold)]",
      iconBg: "bg-[var(--warm-gold)]",
      iconColor: "text-white",
    },
  }[style];

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div
            className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div
              className={`p-8 md:p-10 border-2 rounded-lg ${styleClasses.card}`}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-full ${styleClasses.iconBg} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${styleClasses.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif-semibold text-2xl md:text-3xl mb-4 text-[var(--text-primary)]">
                    {title}
                  </h3>
                  <div className="prose prose-sm md:prose-base max-w-none text-[var(--text-secondary)]">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-sans-semibold text-[var(--text-primary)]">
                            {children}
                          </strong>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-[var(--dusty-rose)] hover:text-[var(--warm-gold)] underline transition-colors"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {cardContent}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
