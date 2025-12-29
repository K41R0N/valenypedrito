import { useRef } from "react";
import { getAsset } from "@/lib/assets";
import type { WeddingHeroContent } from "./types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "@/lib/animations";

interface WeddingHeroProps {
  content: WeddingHeroContent;
  id?: string;
}

export function WeddingHero({ content, id }: WeddingHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll-linked transforms for reveal effect
  const clipPathProgress = useTransform(scrollYProgress, [0, 0.3], [50, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const skylineScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const skylineY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  // Smooth spring physics
  const smoothClipPath = useSpring(clipPathProgress, { stiffness: 50, damping: 20 });
  const smoothContentY = useSpring(contentY, { stiffness: 50, damping: 20 });
  const smoothSkylineScale = useSpring(skylineScale, { stiffness: 50, damping: 20 });

  // Format the date in Spanish
  const formattedDate = content.date
    ? format(parseISO(content.date), "d 'de' MMMM, yyyy", { locale: es })
    : "";

  const dayOfWeek = content.date
    ? format(parseISO(content.date), "EEEE", { locale: es })
    : "";

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[150vh] bg-[var(--antique-cream)]"
    >
      {/* Sticky container for the hero content */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Split Layout Container */}
        <div className="relative h-full w-full">

          {/* LEFT SIDE - Names & Info */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center"
            style={{
              opacity: contentOpacity,
              y: smoothContentY
            }}
          >
            <div className="container px-6 md:px-12 lg:px-20">
              <div className="max-w-3xl">
                {/* Small decorative element */}
                <motion.div
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <div className="h-px w-12 bg-[var(--sevilla-bronze)]" />
                  <span className="font-serif text-xs tracking-[0.4em] text-[var(--sevilla-bronze)] uppercase">
                    {content.announcement || "Nos casamos"}
                  </span>
                </motion.div>

                {/* Bride Name - Large, editorial style */}
                <motion.div
                  className="overflow-hidden mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <motion.h1
                    className="font-script text-[4rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.85] text-[var(--soft-charcoal)]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      textShadow: "0 4px 60px rgba(156, 124, 88, 0.1)"
                    }}
                  >
                    {content.brideName}
                  </motion.h1>
                </motion.div>

                {/* Ampersand - Offset to the right */}
                <motion.div
                  className="flex items-center gap-6 my-4 md:my-6 ml-[10%] md:ml-[15%]"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  <div className="h-px flex-1 max-w-[80px] bg-[var(--sevilla-bronze)]/40" />
                  <span className="font-serif text-4xl md:text-6xl text-[var(--sevilla-bronze)]">&</span>
                  <div className="h-px flex-1 max-w-[80px] bg-[var(--sevilla-bronze)]/40" />
                </motion.div>

                {/* Groom Name - Large, editorial style */}
                <motion.div
                  className="overflow-hidden mb-10 md:mb-14"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.h1
                    className="font-script text-[4rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.85] text-[var(--soft-charcoal)] ml-[5%] md:ml-[10%]"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      textShadow: "0 4px 60px rgba(156, 124, 88, 0.1)"
                    }}
                  >
                    {content.groomName}
                  </motion.h1>
                </motion.div>

                {/* Date & Venue - Clean typography stack */}
                <motion.div
                  className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  {/* Date Block */}
                  <div className="flex items-baseline gap-4">
                    <div className="text-right">
                      <p className="font-serif text-xs tracking-[0.3em] text-[var(--stone-grey)] uppercase mb-1">
                        {dayOfWeek}
                      </p>
                      <p className="font-serif-semibold text-3xl md:text-5xl text-[var(--soft-charcoal)]">
                        23
                      </p>
                    </div>
                    <div className="w-px h-14 bg-[var(--sevilla-bronze)]/40" />
                    <div>
                      <p className="font-serif text-sm md:text-base tracking-[0.15em] text-[var(--stone-grey)] uppercase">
                        Septiembre
                      </p>
                      <p className="font-serif text-sm md:text-base tracking-[0.15em] text-[var(--sevilla-bronze)]">
                        2026
                      </p>
                    </div>
                  </div>

                  {/* Venue Block */}
                  <div>
                    <p className="font-serif text-xs tracking-[0.3em] text-[var(--stone-grey)] uppercase mb-1">
                      Lugar
                    </p>
                    <p className="font-body-regular text-base md:text-lg text-[var(--soft-charcoal)]">
                      {content.venue}
                    </p>
                    <p className="font-body text-sm text-[var(--sevilla-bronze)]">
                      {content.location}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Seville Skyline with Clip Mask */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              clipPath: smoothClipPath.get()
                ? `polygon(${100 - smoothClipPath.get()}% 0, 100% 0, 100% 100%, ${100 - smoothClipPath.get() - 15}% 100%)`
                : "polygon(50% 0, 100% 0, 100% 100%, 35% 100%)"
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--antique-cream)] via-transparent to-transparent z-10 opacity-60" />

            {/* Skyline image */}
            <motion.div
              className="absolute inset-0 flex items-end"
              style={{
                scale: smoothSkylineScale,
                y: skylineY
              }}
            >
              <img
                src={getAsset("skyline")}
                alt="Horizonte de Sevilla"
                className="w-full h-[70vh] object-cover object-bottom watercolor-asset"
                style={{
                  maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)'
                }}
              />
            </motion.div>

            {/* Decorative overlay pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
              style={{
                backgroundImage: `url(${getAsset("azulejoTile")})`,
                backgroundSize: "150px"
              }}
            />
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute bottom-[30%] right-[15%] z-30 hidden lg:block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
          >
            <motion.img
              src={getAsset("orangeBranch")}
              alt=""
              className="w-32 h-32 watercolor-asset"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            style={{ opacity: contentOpacity }}
          >
            <motion.div
              className="w-[1px] h-16 bg-gradient-to-b from-[var(--sevilla-bronze)] to-transparent"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
            <motion.span
              className="mt-3 font-serif text-[10px] tracking-[0.4em] text-[var(--stone-grey)] uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Scroll
            </motion.span>
          </motion.div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--antique-cream)] to-transparent z-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
