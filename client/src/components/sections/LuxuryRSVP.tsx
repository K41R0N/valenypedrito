import { useState, useRef, useEffect } from "react";
import { RSVPForm } from "@/components/RSVPForm";

interface LuxuryRSVPContent {
  title?: string;
  subtitle?: string;
  deadline?: string;
  formIntro?: string;
  askDietaryRestrictions?: boolean;
  askPlusOne?: boolean;
  backgroundColor?: "white" | "warm" | "subtle" | "gradient";
}

interface LuxuryRSVPProps {
  content: LuxuryRSVPContent;
  id?: string;
}

export function LuxuryRSVP({ content, id }: LuxuryRSVPProps) {
  const {
    title = "Confirma Tu Asistencia",
    subtitle = "Por favor ayúdanos a planear este día especial confirmando tu asistencia",
    deadline,
    formIntro = "¡Hola! Cuéntanos si podrás acompañarnos en nuestra boda.",
    askDietaryRestrictions = true,
    askPlusOne = true,
    backgroundColor = "gradient",
  } = content;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      }).toUpperCase()
    : "1 DE AGOSTO";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
    gradient: "bg-section-gradient",
  }[backgroundColor];

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
          <p className="mt-4 text-accent font-sans-semibold text-sm uppercase tracking-wider">
            Responde antes del {formattedDeadline}
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`max-w-xl mx-auto bg-[var(--bg-white)] p-8 md:p-10 rounded-lg border border-[var(--border-light)] shadow-luxury transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <RSVPForm
            formIntro={formIntro}
            askDietaryRestrictions={askDietaryRestrictions}
            askPlusOne={askPlusOne}
          />
        </div>
      </div>
    </section>
  );
}
