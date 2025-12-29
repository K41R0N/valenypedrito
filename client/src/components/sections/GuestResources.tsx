import { Plane, Hotel, Car, Info, ExternalLink, Phone, ChevronDown } from "lucide-react";
import { getAsset } from "@/lib/assets";
import type { GuestResourcesContent } from "./types";
import { motion, useInView, ScrollReveal, Parallax, Floating } from "@/lib/animations";
import { useRef, useState } from "react";

interface GuestResourcesProps {
  content: GuestResourcesContent;
  id?: string;
}

// Animated resource card that expands on hover
function ResourceCard({
  section,
  index,
  isExpanded,
  onToggle
}: {
  section: GuestResourcesContent['sections'][0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const iconMap: Record<string, typeof Plane> = {
    hotel: Hotel,
    airplane: Plane,
    car: Car,
    info: Info,
  };

  const Icon = iconMap[section.icon] || Info;

  // Alternate animation direction based on index
  const direction = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative"
    >
      {/* Main card container */}
      <motion.div
        className="relative bg-white border border-[var(--sevilla-bronze)]/20 overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated accent line */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[var(--sevilla-bronze)] via-[var(--rooftop-clay)] to-[var(--watercolor-sage)]"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        />

        {/* Section Header - Clickable */}
        <button
          onClick={onToggle}
          className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-[var(--warm-beige)]/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            {/* Animated icon container */}
            <motion.div
              className="relative w-14 h-14 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Icon background with gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[var(--watercolor-sage)]/20 to-[var(--rooftop-clay)]/10"
                animate={{
                  rotate: isExpanded ? 0 : 0
                }}
              />
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 border-2 border-[var(--sevilla-bronze)]/20"
                animate={{
                  scale: isExpanded ? [1, 1.1, 1] : 1,
                  opacity: isExpanded ? [0.5, 0.2, 0.5] : 0.3
                }}
                transition={{ duration: 1.5, repeat: isExpanded ? Infinity : 0 }}
              />
              <Icon className="w-6 h-6 text-[var(--watercolor-sage)] relative z-10" />
            </motion.div>

            <div>
              <h3 className="font-serif text-xl md:text-2xl text-[var(--soft-charcoal)] tracking-wide">
                {section.sectionTitle}
              </h3>
              <p className="font-body text-sm text-[var(--stone-grey)] mt-1 opacity-70">
                {section.recommendations?.length || 0} recomendaciones
              </p>
            </div>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[var(--sevilla-bronze)]"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>

        {/* Expandable content */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{
            height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3 }
          }}
          className="overflow-hidden"
        >
          <div className="px-6 md:px-8 pb-8">
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--sevilla-bronze)]/30 to-transparent mb-6" />

            {/* Content description */}
            <motion.div
              className="font-body text-[var(--stone-grey)] leading-relaxed mb-8 prose prose-sm max-w-none"
              initial={{ y: 10, opacity: 0 }}
              animate={isExpanded ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, "<br />") }} />
            </motion.div>

            {/* Recommendations grid */}
            {section.recommendations && section.recommendations.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {section.recommendations.map((rec, recIndex) => (
                  <motion.div
                    key={recIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.15 + recIndex * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative p-5 bg-gradient-to-br from-[var(--warm-beige)]/60 to-transparent border border-[var(--sevilla-bronze)]/10 group/rec"
                  >
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-[var(--watercolor-sage)]/5 opacity-0 group-hover/rec:opacity-100 transition-opacity"
                    />

                    <div className="relative z-10">
                      <h4 className="font-serif-semibold text-lg text-[var(--soft-charcoal)] mb-2 tracking-wide">
                        {rec.name}
                      </h4>
                      <p className="font-body text-sm text-[var(--stone-grey)] mb-4 leading-relaxed">
                        {rec.description}
                      </p>

                      {/* Links row with animated icons */}
                      <div className="flex flex-wrap items-center gap-4">
                        {rec.link && (
                          <motion.a
                            href={rec.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[var(--watercolor-sage)] hover:text-[var(--rooftop-clay)] font-body-regular transition-colors"
                            whileHover={{ x: 3 }}
                          >
                            <span>Visitar sitio</span>
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                        {rec.phone && (
                          <span className="inline-flex items-center gap-2 text-sm text-[var(--sevilla-bronze)] font-body">
                            <Phone className="w-4 h-4" />
                            {rec.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function GuestResources({ content, id }: GuestResourcesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First one open by default
  const sectionRef = useRef(null);
  const isHeaderInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "cream"];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id={id} className={`relative py-20 md:py-32 ${bgColor} overflow-hidden`}>
      {/* Decorative parallax elements */}
      <Parallax speed={0.3} className="absolute top-20 -left-20 opacity-20 pointer-events-none">
        <Floating duration={8} distance={20} delay={0}>
          <img
            src={getAsset("orangeBranch")}
            alt=""
            className="w-40 h-40 object-contain watercolor-asset rotate-45"
          />
        </Floating>
      </Parallax>

      <Parallax speed={0.2} className="absolute bottom-20 -right-16 opacity-15 pointer-events-none">
        <Floating duration={10} distance={15} delay={2}>
          <img
            src={getAsset("oliveBranch")}
            alt=""
            className="w-48 h-48 object-contain watercolor-asset -rotate-12"
          />
        </Floating>
      </Parallax>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with staggered animations */}
          <div ref={sectionRef} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-3xl md:text-5xl mb-4 text-[var(--soft-charcoal)]">
                {content.title}
              </h2>
            </motion.div>

            {content.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-body text-lg md:text-xl text-[var(--stone-grey)] max-w-2xl mx-auto"
              >
                {content.subtitle}
              </motion.p>
            )}

            {/* Animated divider with icon */}
            <motion.div
              className="flex items-center justify-center gap-4 mt-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[var(--sevilla-bronze)]"
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ originX: 1 }}
              />
              <motion.img
                src={getAsset("iconAirplane")}
                alt=""
                className="h-10 watercolor-asset"
                whileHover={{ y: -3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.div
                className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[var(--sevilla-bronze)]"
                initial={{ scaleX: 0 }}
                animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ originX: 0 }}
              />
            </motion.div>
          </div>

          {/* Resource sections - Accordion style */}
          <div className="space-y-6">
            {content.sections.map((section, index) => (
              <ResourceCard
                key={index}
                section={section}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
