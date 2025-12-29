import { MapPin, Clock, Info, Car, Bus, ExternalLink } from "lucide-react";
import { getAsset } from "@/lib/assets";
import type { EventDetailsWeddingContent } from "./types";

interface EventDetailsWeddingProps {
  content: EventDetailsWeddingContent;
  id?: string;
}

export function EventDetailsWedding({ content, id }: EventDetailsWeddingProps) {
  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "white"];

  const hasMap = content.showMap && content.mapLatitude && content.mapLongitude;

  // Generate Google Maps link for directions
  const googleMapsLink = hasMap
    ? `https://www.google.com/maps/search/?api=1&query=${content.mapLatitude},${content.mapLongitude}`
    : null;

  // Generate OpenStreetMap embed URL (free, no API key needed)
  const osmEmbedUrl = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(content.mapLongitude) - 0.01},${parseFloat(content.mapLatitude) - 0.005},${parseFloat(content.mapLongitude) + 0.01},${parseFloat(content.mapLatitude) + 0.005}&layer=mapnik&marker=${content.mapLatitude},${content.mapLongitude}`
    : null;

  return (
    <section id={id} className={`relative py-16 md:py-24 ${bgColor} overflow-hidden`}>
      {/* Decorative Seville skyline - subtle background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url(${getAsset("skyline")})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Decorative azulejo corners */}
      <div
        className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translate(-20%, -20%)"
        }}
      />

      <div
        className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translate(20%, -20%) rotate(90deg)"
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-serif-semibold text-xl text-[var(--sevilla-bronze)]">{content.subtitle}</p>
            )}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
            <div
              className="w-8 h-8 opacity-40"
              style={{
                backgroundImage: `url(${getAsset("azulejoTile")})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
          </div>

          {/* Timeline */}
          {content.timeline && content.timeline.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm border border-[var(--sevilla-bronze)]/30 p-8 md:p-10 mb-10">
              <h3 className="font-serif text-2xl mb-8 text-[var(--soft-charcoal)] text-center">Cronograma</h3>
              <div className="space-y-6">
                {content.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4 md:gap-6 items-start">
                    {/* Time */}
                    <div className="flex-shrink-0 w-16 md:w-20 text-right">
                      <span className="font-serif-semibold text-lg md:text-xl text-[var(--sevilla-bronze)]">{item.time}</span>
                    </div>

                    {/* Divider Line */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-4 h-4 bg-[var(--watercolor-sage)] border-2 border-white shadow-sm" />
                      {index < content.timeline.length - 1 && (
                        <div className="w-px flex-1 min-h-[40px] bg-[var(--sevilla-bronze)]/30 mt-2" />
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 pb-6">
                      <h4 className="font-body-regular text-lg text-[var(--soft-charcoal)] mb-1">{item.event}</h4>
                      {item.description && (
                        <p className="font-body text-sm text-[var(--stone-grey)]">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Venue Information with Map */}
          <div className="bg-white/90 backdrop-blur-sm border border-[var(--sevilla-bronze)]/30 p-8 md:p-10 mb-10">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-6 h-6 text-[var(--watercolor-sage)] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-serif text-xl mb-3 text-[var(--soft-charcoal)]">Ubicación</h3>
                <p className="font-body text-base text-[var(--stone-grey)] whitespace-pre-line mb-4">
                  {content.venueAddress}
                </p>

                {/* Google Maps Button */}
                {googleMapsLink && (
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--watercolor-sage)] hover:bg-[var(--watercolor-sage)]/90 text-white font-body text-sm transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver en Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* OpenStreetMap Embed (free, no API key) */}
            {osmEmbedUrl && (
              <div className="mt-6 overflow-hidden border border-[var(--sevilla-bronze)]/20">
                <iframe
                  title="Ubicación del Evento"
                  width="100%"
                  height="350"
                  frameBorder="0"
                  scrolling="no"
                  src={osmEmbedUrl}
                  style={{ border: 0 }}
                />
                <div className="bg-[var(--warm-beige)] px-4 py-2 text-center">
                  <a
                    href={googleMapsLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs text-[var(--sevilla-bronze)] hover:text-[var(--rooftop-clay)] transition-colors"
                  >
                    Abrir mapa más grande →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Transport & Parking Info */}
          {(content.parkingInfo || content.transportInfo) && (
            <div className="grid md:grid-cols-2 gap-6">
              {content.transportInfo && (
                <div className="bg-white/90 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Bus className="w-5 h-5 text-[var(--watercolor-sage)] flex-shrink-0 mt-0.5" />
                    <h4 className="font-body-regular text-base text-[var(--soft-charcoal)]">Transporte</h4>
                  </div>
                  <p className="font-body text-sm text-[var(--stone-grey)] whitespace-pre-line">{content.transportInfo}</p>
                </div>
              )}

              {content.parkingInfo && (
                <div className="bg-white/90 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Car className="w-5 h-5 text-[var(--watercolor-sage)] flex-shrink-0 mt-0.5" />
                    <h4 className="font-body-regular text-base text-[var(--soft-charcoal)]">Estacionamiento</h4>
                  </div>
                  <p className="font-body text-sm text-[var(--stone-grey)] whitespace-pre-line">{content.parkingInfo}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
