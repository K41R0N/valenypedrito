import { useRef } from "react";
import { MapPin, Clock, Car, Bus, ExternalLink, Church, Wine, UtensilsCrossed, Music } from "lucide-react";
import { getAsset } from "@/lib/assets";
import type { EventDetailsWeddingContent } from "./types";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  ScrollReveal,
  Floating,
  useInView
} from "@/lib/animations";

interface EventDetailsWeddingProps {
  content: EventDetailsWeddingContent;
  id?: string;
}

// Timeline Item Component with scroll-triggered animation
function TimelineItem({ item, index, isLast }: { item: { time: string; event: string; description?: string; icon: string }; index: number; isLast: boolean }) {
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

  return (
    <motion.div
      ref={ref}
      className="flex gap-6 md:gap-8 relative"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Time Column */}
      <motion.div
        className="flex-shrink-0 w-20 md:w-24 text-right pt-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
      >
        <span className="font-serif text-xl md:text-2xl text-[var(--sevilla-bronze)]">
          {item.time}
        </span>
      </motion.div>

      {/* Timeline Line and Dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.2 + 0.1,
            type: "spring",
            stiffness: 200
          }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-[var(--watercolor-sage)] flex items-center justify-center shadow-md">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          {/* Decorative ring */}
          <motion.div
            className="absolute inset-0 border-2 border-[var(--watercolor-sage)]/30"
            initial={{ scale: 1, opacity: 0 }}
            animate={isInView ? { scale: 1.3, opacity: [0, 1, 0] } : {}}
            transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
          />
        </motion.div>

        {/* Line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-[var(--sevilla-bronze)]/30 min-h-[60px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
      >
        <h4 className="font-serif text-lg md:text-xl text-[var(--soft-charcoal)] mb-2">
          {item.event}
        </h4>
        {item.description && (
          <p className="font-body text-sm md:text-base text-[var(--stone-grey)] leading-relaxed">
            {item.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export function EventDetailsWedding({ content, id }: EventDetailsWeddingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const skylineY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const decorLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const decorRight = useTransform(scrollYProgress, [0, 1], [30, -30]);

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

  return (
    <section ref={sectionRef} id={id} className={`relative py-24 md:py-32 ${bgColor} overflow-hidden`}>
      {/* Decorative Seville Skyline - Background (Parallax) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 md:h-56 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `url(${getAsset("skyline")})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          y: skylineY
        }}
      />

      {/* Decorative Azulejo - Left */}
      <Floating duration={12} distance={10}>
        <motion.div
          className="absolute top-20 left-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none opacity-10 hidden lg:block"
          style={{
            backgroundImage: `url(${getAsset("azulejoTile")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: decorLeft
          }}
        />
      </Floating>

      {/* Decorative Azulejo - Right */}
      <Floating duration={10} distance={12} delay={1}>
        <motion.div
          className="absolute top-40 right-0 w-28 h-28 md:w-36 md:h-36 pointer-events-none opacity-10 hidden lg:block"
          style={{
            backgroundImage: `url(${getAsset("azulejoTile")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: decorRight,
            rotate: 45
          }}
        />
      </Floating>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-[var(--soft-charcoal)]">
                {content.title}
              </h2>
              {content.subtitle && (
                <p className="font-script text-3xl md:text-4xl text-[var(--sevilla-bronze)]">
                  {content.subtitle}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* Decorative divider */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 mb-16">
              <motion.div
                className="h-px w-20 md:w-32 bg-[var(--sevilla-bronze)]/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: "right" }}
              />
              <Floating duration={5} distance={5}>
                <img
                  src={getAsset("azulejoTile")}
                  alt=""
                  className="w-10 h-10 md:w-12 md:h-12 opacity-50"
                />
              </Floating>
              <motion.div
                className="h-px w-20 md:w-32 bg-[var(--sevilla-bronze)]/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </ScrollReveal>

          {/* Timeline */}
          {content.timeline && content.timeline.length > 0 && (
            <div className="mb-16">
              <ScrollReveal>
                <h3 className="font-serif text-2xl md:text-3xl mb-10 text-[var(--soft-charcoal)] text-center">
                  Cronograma
                </h3>
              </ScrollReveal>

              <div className="max-w-2xl mx-auto">
                {content.timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    isLast={index === content.timeline.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Venue Information Card */}
          <ScrollReveal delay={0.1}>
            <motion.div
              className="bg-white/95 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20 p-8 md:p-10 mb-10 relative overflow-hidden"
              whileHover={{ boxShadow: "0 10px 40px rgba(156, 124, 88, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <img src={getAsset("orangeBranch")} alt="" className="w-full h-full object-contain" />
              </div>

              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  className="p-3 bg-[var(--watercolor-sage)]/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="w-6 h-6 text-[var(--watercolor-sage)]" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl md:text-2xl mb-3 text-[var(--soft-charcoal)]">
                    Ubicación
                  </h3>
                  <p className="font-body text-base md:text-lg text-[var(--stone-grey)] whitespace-pre-line mb-4 leading-relaxed">
                    {content.venueAddress}
                  </p>

                  {googleMapsLink && (
                    <motion.a
                      href={googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--watercolor-sage)] hover:bg-[var(--watercolor-sage)]/90 text-white font-body text-sm transition-all"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver en Google Maps
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Map */}
              {osmEmbedUrl && (
                <ScrollReveal delay={0.2}>
                  <motion.div
                    className="mt-6 overflow-hidden border border-[var(--sevilla-bronze)]/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <iframe
                      title="Ubicación del Evento"
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      src={osmEmbedUrl}
                      style={{ border: 0 }}
                    />
                  </motion.div>
                </ScrollReveal>
              )}
            </motion.div>
          </ScrollReveal>

          {/* Transport & Parking Info Cards */}
          {(content.parkingInfo || content.transportInfo) && (
            <div className="grid md:grid-cols-2 gap-6">
              {content.transportInfo && (
                <ScrollReveal delay={0.1} direction="left">
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20 p-6 md:p-8 h-full"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(156, 124, 88, 0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="p-2 bg-[var(--watercolor-sage)]/10"
                        whileHover={{ rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Bus className="w-5 h-5 text-[var(--watercolor-sage)]" />
                      </motion.div>
                      <h4 className="font-serif text-lg text-[var(--soft-charcoal)]">
                        Transporte
                      </h4>
                    </div>
                    <p className="font-body text-sm md:text-base text-[var(--stone-grey)] whitespace-pre-line leading-relaxed">
                      {content.transportInfo}
                    </p>
                  </motion.div>
                </ScrollReveal>
              )}

              {content.parkingInfo && (
                <ScrollReveal delay={0.2} direction="right">
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20 p-6 md:p-8 h-full"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(156, 124, 88, 0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="p-2 bg-[var(--watercolor-sage)]/10"
                        whileHover={{ rotate: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Car className="w-5 h-5 text-[var(--watercolor-sage)]" />
                      </motion.div>
                      <h4 className="font-serif text-lg text-[var(--soft-charcoal)]">
                        Estacionamiento
                      </h4>
                    </div>
                    <p className="font-body text-sm md:text-base text-[var(--stone-grey)] whitespace-pre-line leading-relaxed">
                      {content.parkingInfo}
                    </p>
                  </motion.div>
                </ScrollReveal>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--sevilla-bronze)]/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
}
