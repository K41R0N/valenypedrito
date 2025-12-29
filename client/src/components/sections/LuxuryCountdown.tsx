import { useEffect, useState, useRef } from "react";

interface LuxuryCountdownContent {
  title?: string;
  weddingDate?: string;
  subtitle?: string;
  backgroundColor?: "white" | "warm" | "subtle" | "accent";
}

interface LuxuryCountdownProps {
  content: LuxuryCountdownContent;
  id?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LuxuryCountdown({ content, id }: LuxuryCountdownProps) {
  const {
    title = "Cuenta Regresiva",
    weddingDate = "2026-09-23T18:00:00",
    subtitle,
    backgroundColor = "accent",
  } = content;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(weddingDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
    accent: "bg-section-accent-light border-t border-b border-[var(--border-light)]",
  }[backgroundColor];

  const formattedDate = new Date(weddingDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <section ref={sectionRef} id={id} className={`py-16 md:py-20 ${bgClass}`}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          {/* Title */}
          {title && (
            <h2
              className={`section-title mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {title}
            </h2>
          )}

          {/* Countdown Grid */}
          <div
            className={`countdown-grid mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {timeUnits.map((unit, index) => (
              <div
                key={unit.label}
                className="countdown-item"
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="countdown-number">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="countdown-label">{unit.label}</div>
              </div>
            ))}
          </div>

          {/* Subtitle / Date */}
          <p
            className={`text-[var(--text-secondary)] text-sm uppercase tracking-wider transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {subtitle || `${formattedDate} — Hasta el gran día`}
          </p>
        </div>
      </div>
    </section>
  );
}
