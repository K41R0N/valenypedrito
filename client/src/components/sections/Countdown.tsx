import { useState, useEffect, useRef } from "react";
import { getAsset } from "@/lib/assets";
import type { CountdownContent } from "./types";
import { parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import {
  motion,
  useScroll,
  useTransform,
  ScrollReveal,
  Floating,
  useInView
} from "@/lib/animations";

interface CountdownProps {
  content: CountdownContent;
  id?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Flip Card Component for animated numbers
function FlipCard({ value, label, index }: { value: number; label: string; index: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValue = useRef(value);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  useEffect(() => {
    if (prevValue.current !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsFlipping(false);
      }, 300);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <motion.div
      ref={cardRef}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="relative perspective-1000">
        {/* Card Container */}
        <motion.div
          className="relative w-24 h-28 md:w-32 md:h-36 lg:w-40 lg:h-44"
          animate={isFlipping ? { rotateX: [0, -90, 0] } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Background */}
          <div className="absolute inset-0 bg-white border border-[var(--sevilla-bronze)]/30 shadow-lg overflow-hidden">
            {/* Top half */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-[var(--warm-beige)]/50" />

            {/* Center line */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--sevilla-bronze)]/20 -translate-y-1/2 z-10" />

            {/* Side notches */}
            <div className="absolute left-0 top-1/2 w-2 h-4 bg-[var(--antique-cream)] -translate-y-1/2 rounded-r-full" />
            <div className="absolute right-0 top-1/2 w-2 h-4 bg-[var(--antique-cream)] -translate-y-1/2 rounded-l-full" />

            {/* Number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--soft-charcoal)]"
                key={displayValue}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(displayValue).padStart(2, "0")}
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Decorative corners */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[var(--sevilla-bronze)]/40" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[var(--sevilla-bronze)]/40" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[var(--sevilla-bronze)]/40" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[var(--sevilla-bronze)]/40" />
      </div>

      {/* Label */}
      <motion.p
        className="font-serif text-sm md:text-base text-[var(--stone-grey)] mt-4 tracking-[0.2em]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export function Countdown({ content, id }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const leftBranchX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rightBranchX = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = parseISO(content.weddingDate);
      const now = new Date();

      const days = Math.max(0, differenceInDays(weddingDate, now));
      const hours = Math.max(0, differenceInHours(weddingDate, now) % 24);
      const minutes = Math.max(0, differenceInMinutes(weddingDate, now) % 60);
      const seconds = Math.max(0, differenceInSeconds(weddingDate, now) % 60);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [content.weddingDate]);

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "cream"];

  const timeUnits = [
    { value: timeLeft.days, label: "DÍAS" },
    { value: timeLeft.hours, label: "HORAS" },
    { value: timeLeft.minutes, label: "MINUTOS" },
    { value: timeLeft.seconds, label: "SEGUNDOS" },
  ];

  return (
    <section ref={sectionRef} id={id} className={`relative py-24 md:py-32 ${bgColor} overflow-hidden`}>
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "200px",
          y: backgroundY
        }}
      />

      {/* Decorative Orange Branch - Left (Parallax) */}
      <Floating duration={10} distance={15}>
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url(${getAsset("orangeBranch")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: leftBranchX,
            rotate: -15
          }}
        />
      </Floating>

      {/* Decorative Orange Branch - Right (Parallax) */}
      <Floating duration={8} distance={20} delay={1}>
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url(${getAsset("orangeBranch")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: rightBranchX,
            scaleX: -1,
            rotate: 15
          }}
        />
      </Floating>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Title with reveal animation */}
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-[var(--soft-charcoal)]">
              {content.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-script text-4xl md:text-5xl lg:text-6xl text-[var(--sevilla-bronze)] mb-12">
              el gran día
            </p>
          </ScrollReveal>

          {/* Decorative divider */}
          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-center gap-6 mb-16">
              <motion.div
                className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)]/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ transformOrigin: "right" }}
              />
              <Floating duration={4} distance={5}>
                <img
                  src={getAsset("azulejoTile")}
                  alt=""
                  className="w-8 h-8 md:w-10 md:h-10 opacity-50"
                />
              </Floating>
              <motion.div
                className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)]/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </ScrollReveal>

          {/* Countdown Cards */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-16">
            {timeUnits.map((unit, index) => (
              <FlipCard
                key={unit.label}
                value={unit.value}
                label={unit.label}
                index={index}
              />
            ))}
          </div>

          {/* Bottom decorative element */}
          <ScrollReveal delay={0.5} direction="up">
            <div className="flex justify-center">
              <Floating duration={6} distance={10}>
                <img
                  src={getAsset("oliveBranch")}
                  alt=""
                  className="h-16 md:h-20 lg:h-24 watercolor-asset opacity-40"
                />
              </Floating>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Decorative top/bottom lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--sevilla-bronze)]/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--sevilla-bronze)]/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
}
