import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useRSVP } from "@/components/RSVPContext";

interface LuxuryHeroContent {
  announcement?: string;
  brideName?: string;
  groomName?: string;
  subtitle?: string;
  weddingDate?: string;
  venue?: string;
  location?: string;
  backgroundImage?: string;
  showScrollIndicator?: boolean;
}

interface LuxuryHeroProps {
  content: LuxuryHeroContent;
  id?: string;
}

export function LuxuryHero({ content, id }: LuxuryHeroProps) {
  const {
    announcement = "¡NOS CASAMOS!",
    brideName = "Valentina",
    groomName = "Pedro Juan",
    subtitle,
    weddingDate,
    location = "Sevilla, España",
    backgroundImage,
    showScrollIndicator = true,
  } = content;

  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { openModal } = useRSVP();

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Format the wedding date
  const formattedDate = weddingDate
    ? new Date(weddingDate).toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  // Scroll to next section
  const scrollToNext = () => {
    if (heroRef.current) {
      const nextSection = heroRef.current.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Build subtitle text
  const subtitleText =
    subtitle ||
    `Celebrando nuestro amor en el corazón de ${location}${formattedDate ? `, ${formattedDate}` : ""}`;

  return (
    <section
      ref={heroRef}
      id={id}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-section-gradient"
    >
      {/* Background with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        ) : (
          <div
            className="w-full h-full opacity-10"
            style={{
              backgroundImage: `url('/images/watercolor/seville-skyline.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Announcement */}
        <p className="section-label mb-6">{announcement}</p>

        {/* Decorative line */}
        <div className="decorative-line mb-8" />

        {/* Couple Names */}
        <h1 className="couple-names mb-4">
          {brideName}
          <span className="block text-accent text-[0.5em] my-2">&</span>
          {groomName}
        </h1>

        {/* Decorative line */}
        <div className="decorative-line mt-8 mb-8" />

        {/* Subtitle */}
        <p className="section-subtitle mb-8">{subtitleText}</p>

        {/* RSVP Button - Prominent CTA */}
        <button
          onClick={openModal}
          className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Confirmar Asistencia
        </button>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--text-light)] hover:text-[var(--dusty-rose)] transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-sans-semibold uppercase tracking-widest">
            Continuar
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-warm)] to-transparent z-[5]" />
    </section>
  );
}
