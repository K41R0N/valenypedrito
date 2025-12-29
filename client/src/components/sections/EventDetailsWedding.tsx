import { MapPin, Clock, Info } from "lucide-react";
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

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-body text-lg text-[var(--stone-grey)]">{content.subtitle}</p>
            )}
          </div>

          {/* Timeline */}
          {content.timeline && content.timeline.length > 0 && (
            <div className="bg-white border border-[var(--sevilla-bronze)]/30 p-8 md:p-10 rounded-sm mb-10">
              <h3 className="font-serif text-2xl mb-8 text-[var(--soft-charcoal)] text-center">Cronograma</h3>
              <div className="space-y-6">
                {content.timeline.map((item, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    {/* Time */}
                    <div className="flex-shrink-0 w-20 text-right">
                      <Clock className="w-4 h-4 inline-block mr-2 text-[var(--sevilla-bronze)]" />
                      <span className="font-serif text-lg text-[var(--soft-charcoal)]">{item.time}</span>
                    </div>

                    {/* Divider Line */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[var(--watercolor-sage)] border-2 border-white shadow-sm" />
                      {index < content.timeline.length - 1 && (
                        <div className="w-px h-full bg-[var(--sevilla-bronze)]/30 mt-2" />
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 pb-8">
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

          {/* Venue Information */}
          <div className="bg-white border border-[var(--sevilla-bronze)]/30 p-8 md:p-10 rounded-sm mb-10">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[var(--watercolor-sage)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-xl mb-2 text-[var(--soft-charcoal)]">Ubicación</h3>
                <p className="font-body text-base text-[var(--stone-grey)] whitespace-pre-line">
                  {content.venueAddress}
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            {hasMap && (
              <div className="mt-6 rounded-sm overflow-hidden border border-[var(--sevilla-bronze)]/20">
                <iframe
                  title="Venue Location"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${content.mapLatitude},${content.mapLongitude}&zoom=15`}
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Additional Info */}
          {(content.parkingInfo || content.transportInfo) && (
            <div className="grid md:grid-cols-2 gap-6">
              {content.parkingInfo && (
                <div className="bg-[var(--warm-beige)] border border-[var(--sevilla-bronze)]/20 p-6 rounded-sm">
                  <div className="flex items-start gap-2 mb-3">
                    <Info className="w-5 h-5 text-[var(--sevilla-bronze)] flex-shrink-0 mt-0.5" />
                    <h4 className="font-body-regular text-base text-[var(--soft-charcoal)]">Estacionamiento</h4>
                  </div>
                  <p className="font-body text-sm text-[var(--stone-grey)]">{content.parkingInfo}</p>
                </div>
              )}

              {content.transportInfo && (
                <div className="bg-[var(--warm-beige)] border border-[var(--sevilla-bronze)]/20 p-6 rounded-sm">
                  <div className="flex items-start gap-2 mb-3">
                    <Info className="w-5 h-5 text-[var(--sevilla-bronze)] flex-shrink-0 mt-0.5" />
                    <h4 className="font-body-regular text-base text-[var(--soft-charcoal)]">Transporte</h4>
                  </div>
                  <p className="font-body text-sm text-[var(--stone-grey)]">{content.transportInfo}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
