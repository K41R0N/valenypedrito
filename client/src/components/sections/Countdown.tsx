import { useState, useEffect, useRef } from "react";
import { getAsset } from "@/lib/assets";
import type { CountdownContent } from "./types";
import { parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from "date-fns";
import { es } from "date-fns/locale";
import {
  motion,
  useScroll,
  useTransform,
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

// Individual time unit with unique positioning
function TimeUnit({
  value,
  label,
  position,
  delay
}: {
  value: number;
  label: string;
  position: { x: string; y: string; rotate: number };
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="absolute flex flex-col items-center"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ opacity: 0, scale: 0, rotate: position.rotate - 20 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: position.rotate } : {}}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border border-[var(--sevilla-bronze)]/20 rounded-full scale-125"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Main number container */}
        <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/80 backdrop-blur-sm border border-[var(--sevilla-bronze)]/30 rounded-full flex flex-col items-center justify-center shadow-lg">
          <motion.span
            className="font-serif text-2xl md:text-4xl lg:text-5xl text-[var(--soft-charcoal)] leading-none"
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
          <span className="font-serif text-[8px] md:text-[10px] tracking-[0.25em] text-[var(--stone-grey)] uppercase mt-1">
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Countdown({ content, id }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const centerRef = useRef(null);
  const isInView = useInView(centerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax and rotation effects
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

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

  const bgColor = bgColorMap[content.backgroundColor || "beige"];

  // Positions for the orbital layout - responsive
  const positions = {
    days: { x: "10%", y: "20%", rotate: -5 },
    hours: { x: "70%", y: "15%", rotate: 8 },
    minutes: { x: "5%", y: "65%", rotate: 5 },
    seconds: { x: "75%", y: "70%", rotate: -3 },
  };

  return (
    <section ref={sectionRef} id={id} className={`relative py-32 md:py-48 ${bgColor} overflow-hidden`}>
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "300px"
        }}
      />

      {/* Connecting lines between elements - decorative */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10 hidden lg:block">
        <motion.path
          d="M 200 200 Q 400 150, 600 250 T 1000 200"
          stroke="var(--sevilla-bronze)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M 100 400 Q 300 500, 500 350 T 900 450"
          stroke="var(--sevilla-bronze)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </svg>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="font-serif text-xs tracking-[0.5em] text-[var(--stone-grey)] uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cuenta regresiva
          </motion.span>
        </motion.div>

        {/* Main orbital container */}
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px] max-w-5xl mx-auto">
          {/* Orbital time units */}
          <TimeUnit value={timeLeft.days} label="días" position={positions.days} delay={0.3} />
          <TimeUnit value={timeLeft.hours} label="horas" position={positions.hours} delay={0.5} />
          <TimeUnit value={timeLeft.minutes} label="minutos" position={positions.minutes} delay={0.7} />
          <TimeUnit value={timeLeft.seconds} label="segundos" position={positions.seconds} delay={0.9} />

          {/* Central focal point */}
          <motion.div
            ref={centerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ rotate, scale }}
          >
            {/* Outer decorative rings */}
            <motion.div
              className="absolute inset-0 border border-[var(--sevilla-bronze)]/10 rounded-full scale-[2]"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 border border-dashed border-[var(--sevilla-bronze)]/20 rounded-full scale-[1.5]"
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />

            {/* Main center piece */}
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-white border border-[var(--sevilla-bronze)]/30 rounded-full flex flex-col items-center justify-center shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Inner decorative ring */}
              <div className="absolute inset-4 border border-[var(--sevilla-bronze)]/20 rounded-full" />

              {/* Date display */}
              <motion.div
                className="text-center relative z-10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <span className="font-script text-4xl md:text-5xl lg:text-6xl text-[var(--sevilla-bronze)] block">
                  {format(parseISO(content.weddingDate), "d")}
                </span>
                <span className="font-serif text-sm md:text-base tracking-[0.3em] text-[var(--stone-grey)] uppercase block mt-1">
                  {format(parseISO(content.weddingDate), "MMMM", { locale: es })}
                </span>
                <span className="font-serif text-lg md:text-xl text-[var(--soft-charcoal)] block mt-1">
                  {format(parseISO(content.weddingDate), "yyyy")}
                </span>
              </motion.div>

              {/* Decorative azulejo accent */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 0.5, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <img
                  src={getAsset("azulejoTile")}
                  alt=""
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-[10%] left-[45%] opacity-20 hidden lg:block"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={getAsset("oliveBranch")} alt="" className="w-24 h-24 watercolor-asset" />
          </motion.div>

          <motion.div
            className="absolute bottom-[5%] right-[30%] opacity-25 hidden lg:block"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <img src={getAsset("orangeBranch")} alt="" className="w-28 h-28 watercolor-asset" />
          </motion.div>
        </div>

        {/* Bottom text */}
        <motion.p
          className="text-center font-script text-2xl md:text-3xl lg:text-4xl text-[var(--sevilla-bronze)] mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          hasta el gran día
        </motion.p>
      </div>

      {/* Decorative borders */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--sevilla-bronze)]/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--sevilla-bronze)]/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
}
