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
  Floating
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

  // Parallax transforms for different elements
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const branchLeftX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const branchRightX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  // Smooth spring physics for natural movement
  const smoothSkylineY = useSpring(skylineY, { stiffness: 50, damping: 20 });
  const smoothContentY = useSpring(contentY, { stiffness: 50, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 50, damping: 20 });

  // Format the date in Spanish
  const formattedDate = content.date
    ? format(parseISO(content.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
    : "";

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const ampersandVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[var(--antique-cream)]"
      style={{
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability when using photo background */}
      {content.backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      )}

      {/* Animated Floating Orange Branch - Left Side */}
      <Floating duration={8} distance={20} delay={0}>
        <motion.div
          className="absolute left-0 top-1/4 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 pointer-events-none opacity-25 hidden md:block"
          style={{
            backgroundImage: `url(${getAsset("orangeBranch")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: branchLeftX
          }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
        />
      </Floating>

      {/* Animated Floating Orange Branch - Right Side */}
      <Floating duration={7} distance={25} delay={1}>
        <motion.div
          className="absolute right-0 top-1/3 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 pointer-events-none opacity-25 hidden md:block"
          style={{
            backgroundImage: `url(${getAsset("orangeBranch")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: branchRightX,
            scaleX: -1
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ duration: 1.5, delay: 1.7, ease: "easeOut" }}
        />
      </Floating>

      {/* Subtle Floating Azulejo Tiles */}
      <Floating duration={10} distance={15} delay={2}>
        <motion.div
          className="absolute left-[15%] top-[20%] w-16 h-16 md:w-20 md:h-20 pointer-events-none opacity-10 hidden lg:block"
          style={{
            backgroundImage: `url(${getAsset("azulejoTile")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        />
      </Floating>

      <Floating duration={9} distance={18} delay={0.5}>
        <motion.div
          className="absolute right-[18%] top-[15%] w-12 h-12 md:w-16 md:h-16 pointer-events-none opacity-10 hidden lg:block"
          style={{
            backgroundImage: `url(${getAsset("azulejoTile")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            rotate: 45
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
        />
      </Floating>

      {/* Main Content - with parallax scroll effect */}
      <motion.div
        className="relative z-20 container px-4 py-20 text-center"
        style={{
          y: smoothContentY,
          opacity: contentOpacity
        }}
      >
        <div className="max-w-5xl mx-auto perspective-1000">
          {/* Bride Name - Letter by Letter Animation */}
          <motion.h1
            className="font-script text-6xl md:text-8xl lg:text-[10rem] mb-2 text-[var(--soft-charcoal)] leading-none"
            initial="hidden"
            animate="visible"
            style={{ perspective: 1000 }}
          >
            {content.brideName.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block"
                style={{
                  transformOrigin: "bottom center",
                  textShadow: "0 4px 30px rgba(156, 124, 88, 0.15)"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Animated Ampersand */}
          <motion.div
            className="text-5xl md:text-7xl font-serif text-[var(--sevilla-bronze)] my-4 md:my-6"
            variants={ampersandVariants}
            initial="hidden"
            animate="visible"
          >
            &
          </motion.div>

          {/* Groom Name - Letter by Letter Animation */}
          <motion.h1
            className="font-script text-6xl md:text-8xl lg:text-[10rem] mb-8 text-[var(--soft-charcoal)] leading-none"
            initial="hidden"
            animate="visible"
            style={{ perspective: 1000 }}
          >
            {content.groomName.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i + content.brideName.length}
                variants={letterVariants}
                className="inline-block"
                style={{
                  transformOrigin: "bottom center",
                  textShadow: "0 4px 30px rgba(156, 124, 88, 0.15)"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Announcement */}
          <motion.h2
            className="font-serif text-xl md:text-3xl lg:text-4xl mb-8 text-[var(--soft-charcoal)] tracking-[0.3em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.announcement}
          </motion.h2>

          {/* Decorative Line with Azulejo */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="h-px w-20 md:w-32 bg-[var(--sevilla-bronze)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              style={{ transformOrigin: "right" }}
            />
            <motion.div
              className="w-10 h-10 md:w-12 md:h-12"
              style={{
                backgroundImage: `url(${getAsset("azulejoTile")})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 0.6, rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="h-px w-20 md:w-32 bg-[var(--sevilla-bronze)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Date with elegant reveal */}
          <motion.p
            className="font-serif-semibold text-xl md:text-2xl lg:text-3xl mb-4 text-[var(--soft-charcoal)] capitalize"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
          >
            {formattedDate}
          </motion.p>

          {/* Venue & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <p className="font-body-regular text-lg md:text-xl lg:text-2xl mb-2 text-[var(--soft-charcoal)]">
              {content.venue}
            </p>
            <p className="font-body text-base md:text-lg text-[var(--sevilla-bronze)]">{content.location}</p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-[var(--sevilla-bronze)]/50 flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[var(--sevilla-bronze)] rounded-full"
              />
            </motion.div>
            <span className="mt-2 text-xs font-body text-[var(--stone-grey)] tracking-widest uppercase">
              Scroll
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Seville Skyline - Parallax Background */}
      {content.skylinePosition === "bottom" && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{
            y: smoothSkylineY,
            scale: smoothScale
          }}
        >
          {/* Gradient overlay to blend skyline */}
          <div
            className="absolute top-0 left-0 right-0 h-40 md:h-56 z-10"
            style={{
              background: 'linear-gradient(to bottom, var(--antique-cream) 0%, transparent 100%)'
            }}
          />
          {/* Main Skyline Image */}
          <motion.img
            src={getAsset("skyline")}
            alt="Horizonte de Sevilla"
            className="w-full h-auto watercolor-asset relative"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            style={{
              maxHeight: "50vh",
              objectFit: "cover",
              objectPosition: "bottom center",
              maskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)'
            }}
          />
        </motion.div>
      )}
    </section>
  );
}
