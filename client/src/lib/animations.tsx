/**
 * Animation Utilities for Wedding Website
 *
 * Elegant, scroll-driven animations using Framer Motion
 * Designed for an award-worthy wedding experience
 */

import { motion, useScroll, useTransform, useSpring, useInView, MotionValue, AnimatePresence, useMotionTemplate } from "framer-motion";
import { useRef, ReactNode, useMemo } from "react";

// ============================================================================
// Animation Variants - Reusable animation configurations
// ============================================================================

export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// Stagger container for children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

// ============================================================================
// Scroll Reveal Component - Animates children when they enter viewport
// ============================================================================

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  threshold = 0.2
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const directionVariants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directionVariants[direction]}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Stagger Reveal - Animates children one by one
// ============================================================================

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerItem}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Parallax Component - Creates depth with scroll-linked movement
// ============================================================================

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Positive = moves slower, Negative = moves faster
  direction?: "vertical" | "horizontal";
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical"
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical"
      ? [speed * 100, -speed * 100]
      : [speed * 50, -speed * 50]
  );

  const smoothTransform = useSpring(transform, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={direction === "vertical" ? { y: smoothTransform } : { x: smoothTransform }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Split Text Animation - Animates each letter/word individually
// ============================================================================

interface SplitTextProps {
  text: string;
  className?: string;
  type?: "letters" | "words";
  staggerDelay?: number;
  once?: boolean;
}

export function SplitText({
  text,
  className = "",
  type = "letters",
  staggerDelay = 0.03,
  once = true
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const items = type === "letters" ? text.split("") : text.split(" ");

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                delay: index * staggerDelay,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
          className="inline-block"
          style={{
            transformOrigin: "bottom",
            whiteSpace: type === "words" ? "pre" : undefined
          }}
        >
          {item}
          {type === "words" && index < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================================================
// Floating Animation - Gentle floating effect for decorative elements
// ============================================================================

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export function Floating({
  children,
  className = "",
  duration = 6,
  distance = 15,
  delay = 0
}: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance/2, distance/2, -distance/2],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Magnetic Effect - Element follows cursor slightly
// ============================================================================

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================================================
// Progress Scroll Indicator - Shows scroll progress for a section
// ============================================================================

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({ className = "", color = "var(--sevilla-bronze)" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        backgroundColor: color,
        transformOrigin: "left"
      }}
      className={`fixed top-0 left-0 right-0 h-[2px] z-50 ${className}`}
    />
  );
}

// ============================================================================
// Counter Animation - Animates numbers counting up
// ============================================================================

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2, className = "" }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isInView && (
          <CounterValue value={value} duration={duration} />
        )}
      </motion.span>
    </motion.span>
  );
}

function CounterValue({ value, duration }: { value: number; duration: number }) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration }}
    >
      {String(value).padStart(2, "0")}
    </motion.span>
  );
}

// ============================================================================
// Reveal Mask - Reveals content with a sliding mask effect
// ============================================================================

interface RevealMaskProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
}

export function RevealMask({
  children,
  className = "",
  direction = "left",
  delay = 0
}: RevealMaskProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const clipPaths = {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)"
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)"
    },
    top: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)"
    },
    bottom: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)"
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : { clipPath: clipPaths[direction].hidden }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Scroll-Linked Opacity - Fades based on scroll position
// ============================================================================

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
  fadeOut?: boolean;
}

export function ScrollFade({
  children,
  className = "",
  fadeIn = true,
  fadeOut = true
}: ScrollFadeProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    fadeIn && fadeOut
      ? [0, 0.3, 0.7, 1]
      : fadeIn
        ? [0, 0.3, 1, 1]
        : [1, 1, 0.7, 0],
    fadeIn && fadeOut
      ? [0, 1, 1, 0]
      : fadeIn
        ? [0, 1, 1, 1]
        : [1, 1, 1, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Scale on Scroll - Scales element based on scroll position
// ============================================================================

interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  scaleFrom?: number;
  scaleTo?: number;
}

export function ScrollScale({
  children,
  className = "",
  scaleFrom = 0.8,
  scaleTo = 1
}: ScrollScaleProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: smoothScale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Horizontal Scroll Section - Creates horizontal scroll within vertical scroll
// ============================================================================

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// Export motion for direct use
// ============================================================================

export { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionTemplate };
