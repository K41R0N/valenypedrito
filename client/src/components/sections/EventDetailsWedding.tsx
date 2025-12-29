import { useRef } from "react";
import { MapPin, ExternalLink, Church, Wine, UtensilsCrossed, Music, Clock, Car, Bus } from "lucide-react";
import { getAsset } from "@/lib/assets";
import type { EventDetailsWeddingContent } from "./types";
import {
  motion,
  useScroll,
  useTransform,
  useInView
} from "@/lib/animations";

interface EventDetailsWeddingProps {
  content: EventDetailsWeddingContent;
  id?: string;
}

// Scene component for each event in the horizontal scroll
function EventScene({
  item,
  index,
  total
}: {
  item: { time: string; event: string; description?: string; icon: string };
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const iconMap: Record<string, React.ElementType> = {
    church: Church,
    champagne: Wine,
    dinner: UtensilsCrossed,
    music: Music,
    custom: Clock
  };

  const Icon = iconMap[item.icon] || Clock;

  // Gradient backgrounds for each scene
  const gradients = [
    "from-[var(--watercolor-sage)]/10 to-transparent",
    "from-[var(--rooftop-clay)]/10 to-transparent",
    "from-[var(--sevilla-bronze)]/10 to-transparent",
    "from-[var(--watercolor-sage)]/10 to-transparent",
  ];

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex items-center justify-center px-8"
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className={`relative w-full h-[80%] bg-gradient-to-br ${gradients[index % gradients.length]} border border-[var(--sevilla-bronze)]/20 p-8 md:p-12 flex flex-col justify-center`}>
        {/* Scene number */}
        <motion.div
          className="absolute top-6 right-6 font-serif text-6xl md:text-8xl text-[var(--sevilla-bronze)]/10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Time pill */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--sevilla-bronze)]/30 mb-6 self-start"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Clock className="w-4 h-4 text-[var(--sevilla-bronze)]" />
          <span className="font-serif text-lg md:text-xl text-[var(--sevilla-bronze)]">{item.time}</span>
        </motion.div>

        {/* Icon and content */}
        <div className="flex items-start gap-6 md:gap-8">
          <motion.div
            className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white border border-[var(--sevilla-bronze)]/30 flex items-center justify-center"
            initial={{ opacity: 0, rotate: -45 }}
            animate={isInView ? { opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-[var(--watercolor-sage)]" />
          </motion.div>

          <div className="flex-1">
            <motion.h3
              className="font-serif text-2xl md:text-3xl lg:text-4xl text-[var(--soft-charcoal)] mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {item.event}
            </motion.h3>
            {item.description && (
              <motion.p
                className="font-body text-base md:text-lg text-[var(--stone-grey)] leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {item.description}
              </motion.p>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-6 left-8 right-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 ${i <= index ? "bg-[var(--sevilla-bronze)]" : "bg-[var(--sevilla-bronze)]/20"} transition-colors duration-500`}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function EventDetailsWedding({ content, id }: EventDetailsWeddingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Horizontal scroll linked to vertical scroll
  const x = useTransform(
    scrollYProgress,
    [0.1, 0.9],
    ["0%", `-${((content.timeline?.length || 1) - 1) * 100}%`]
  );

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "white"];

  const hasMap = content.showMap && content.mapLatitude && content.mapLongitude;

  const googleMapsLink = hasMap
    ? `https://www.google.com/maps/search/?api=1&query=${content.mapLatitude},${content.mapLongitude}`
    : null;

  const osmEmbedUrl = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(content.mapLongitude!) - 0.01},${parseFloat(content.mapLatitude!) - 0.005},${parseFloat(content.mapLongitude!) + 0.01},${parseFloat(content.mapLatitude!) + 0.005}&layer=mapnik&marker=${content.mapLatitude},${content.mapLongitude}`
    : null;

  const timelineCount = content.timeline?.length || 0;

  return (
    <section ref={sectionRef} id={id} className={`relative ${bgColor}`}>
      {/* Fixed Header */}
      <div ref={headerRef} className="sticky top-0 z-20 py-8 md:py-12 bg-inherit">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.span
                className="font-serif text-xs tracking-[0.5em] text-[var(--stone-grey)] uppercase block mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                El día de la boda
              </motion.span>
              <motion.h2
                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--soft-charcoal)]"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {content.title}
              </motion.h2>
            </div>
            <motion.p
              className="font-script text-2xl md:text-3xl text-[var(--sevilla-bronze)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.subtitle}
            </motion.p>
          </div>

          {/* Scroll hint */}
          <motion.div
            className="mt-6 flex items-center gap-3 text-[var(--stone-grey)]"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="w-8 h-px bg-[var(--sevilla-bronze)]"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "left" }}
            />
            <span className="font-body text-xs tracking-widest uppercase">Scroll para explorar</span>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      {content.timeline && content.timeline.length > 0 && (
        <div
          className="relative"
          style={{ height: `${100 + timelineCount * 50}vh` }}
        >
          <div className="sticky top-24 h-[70vh] overflow-hidden">
            <motion.div
              ref={scrollContainerRef}
              className="flex h-full"
              style={{ x }}
            >
              {content.timeline.map((item, index) => (
                <EventScene
                  key={index}
                  item={item}
                  index={index}
                  total={content.timeline.length}
                />
              ))}

              {/* Final scene - Venue card */}
              <div className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] h-full flex items-center justify-center px-8">
                <motion.div
                  className="w-full h-[80%] bg-white border border-[var(--sevilla-bronze)]/20 p-8 md:p-12 flex flex-col"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[var(--watercolor-sage)]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[var(--watercolor-sage)]" />
                    </div>
                    <div>
                      <span className="font-serif text-xs tracking-[0.3em] text-[var(--stone-grey)] uppercase">Ubicación</span>
                      <h3 className="font-serif text-xl md:text-2xl text-[var(--soft-charcoal)]">El Lugar</h3>
                    </div>
                  </div>

                  {/* Address */}
                  <p className="font-body text-base md:text-lg text-[var(--stone-grey)] leading-relaxed mb-6 flex-1 whitespace-pre-line">
                    {content.venueAddress}
                  </p>

                  {/* Map */}
                  {osmEmbedUrl && (
                    <div className="relative h-48 md:h-64 mb-6 border border-[var(--sevilla-bronze)]/20 overflow-hidden">
                      <iframe
                        title="Ubicación del Evento"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        src={osmEmbedUrl}
                        style={{ border: 0 }}
                      />
                    </div>
                  )}

                  {/* CTA */}
                  {googleMapsLink && (
                    <motion.a
                      href={googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--watercolor-sage)] text-white font-body text-sm self-start"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir en Google Maps
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Transport Info - Full width below the scroll */}
      {(content.parkingInfo || content.transportInfo) && (
        <div className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {content.transportInfo && (
                <motion.div
                  className="p-8 bg-white/80 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Bus className="w-5 h-5 text-[var(--watercolor-sage)]" />
                    <h4 className="font-serif text-lg text-[var(--soft-charcoal)]">Transporte</h4>
                  </div>
                  <p className="font-body text-sm text-[var(--stone-grey)] whitespace-pre-line leading-relaxed">
                    {content.transportInfo}
                  </p>
                </motion.div>
              )}

              {content.parkingInfo && (
                <motion.div
                  className="p-8 bg-white/80 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="w-5 h-5 text-[var(--watercolor-sage)]" />
                    <h4 className="font-serif text-lg text-[var(--soft-charcoal)]">Estacionamiento</h4>
                  </div>
                  <p className="font-body text-sm text-[var(--stone-grey)] whitespace-pre-line leading-relaxed">
                    {content.parkingInfo}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Decorative Seville Skyline - Very subtle */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url(${getAsset("skyline")})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat"
        }}
      />
    </section>
  );
}
