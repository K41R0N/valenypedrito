import { useEffect, useRef, useState } from "react";
import { MapPin, Car, Bus, ExternalLink } from "lucide-react";

interface VenueInfo {
  icon: "location" | "parking" | "transport";
  title: string;
  content: string;
  link?: string;
}

interface VenueSectionContent {
  title?: string;
  venueName?: string;
  venueImage?: string;
  venueImageAlt?: string;
  address?: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
  mapLatitude?: string;
  mapLongitude?: string;
  infoCards?: VenueInfo[];
  backgroundColor?: "white" | "warm" | "subtle";
}

interface VenueSectionProps {
  content: VenueSectionContent;
  id?: string;
}

const iconMap = {
  location: MapPin,
  parking: Car,
  transport: Bus,
};

export function VenueSection({ content, id }: VenueSectionProps) {
  const {
    title = "El Lugar",
    venueName = "Hacienda la Soledad",
    venueImage,
    venueImageAlt = "Venue",
    address = "Carretera Sevilla-Carmona, km 12, Sevilla",
    mapUrl,
    mapEmbedUrl,
    mapLatitude = "37.4219",
    mapLongitude = "-5.9116",
    infoCards = [
      {
        icon: "location",
        title: "Dirección",
        content: "Hacienda la Soledad\nCarretera Sevilla-Carmona, km 12",
      },
      {
        icon: "transport",
        title: "Transporte",
        content: "Autobuses desde Plaza Nueva a las 17:00",
      },
      {
        icon: "parking",
        title: "Estacionamiento",
        content: "Amplio estacionamiento gratuito disponible",
      },
    ],
    backgroundColor = "warm",
  } = content;

  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgClass = {
    white: "bg-section-white",
    warm: "bg-section-warm",
    subtle: "bg-section-subtle",
  }[backgroundColor];

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
          <p className="font-serif text-xl text-accent">{venueName}</p>
        </div>

        {/* Venue Map or Image */}
        <div
          className={`relative w-full h-[400px] md:h-[450px] rounded-lg overflow-hidden mb-12 shadow-luxury transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {venueImage ? (
            <>
              <img
                src={venueImage}
                alt={venueImageAlt}
                className="w-full h-full object-cover"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Address overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-lg">{address}</p>
              </div>
            </>
          ) : (
            <iframe
              src={mapEmbedUrl || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169!2d${mapLongitude}!3d${mapLatitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSGFjaWVuZGEgbGEgU29sZWRhZA!5e0!3m2!1ses!2ses!4v1700000000000`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${venueName}`}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Address below map */}
        {!venueImage && (
          <p className="text-center font-serif text-lg text-[var(--text-secondary)] -mt-8 mb-12">
            {address}
          </p>
        )}

        {/* Info Cards */}
        <div className="info-grid max-w-4xl mx-auto">
          {infoCards.map((card, index) => {
            const Icon = iconMap[card.icon] || MapPin;
            return (
              <div
                key={index}
                className={`info-card transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="info-card-icon">
                  <Icon className="w-8 h-8 mx-auto text-accent" />
                </div>
                <h3>{card.title}</h3>
                <p className="whitespace-pre-line">{card.content}</p>
                {card.link && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-accent hover:underline text-sm font-medium"
                  >
                    Ver más <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Map Link */}
        {mapUrl && (
          <div className="text-center mt-8">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Ver en Google Maps
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
