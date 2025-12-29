import { useRef, useState } from "react";
import { getAsset } from "@/lib/assets";
import type { FAQContent } from "./types";
import {
  motion,
  useScroll,
  useTransform,
  ScrollReveal,
  Floating,
  useInView
} from "@/lib/animations";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQProps {
  content: FAQContent;
  id?: string;
}

// Custom Animated Accordion Item
function FAQItem({ question, answer, index, isOpen, onToggle }: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="bg-white/95 backdrop-blur-sm border border-[var(--sevilla-bronze)]/20 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ boxShadow: "0 5px 20px rgba(156, 124, 88, 0.1)" }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
        whileTap={{ scale: 0.995 }}
      >
        <span className="font-body-regular text-base md:text-lg text-[var(--soft-charcoal)] pr-4 group-hover:text-[var(--rooftop-clay)] transition-colors">
          {question}
        </span>
        <motion.div
          className="flex-shrink-0 w-8 h-8 bg-[var(--watercolor-sage)]/10 flex items-center justify-center"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--watercolor-sage)]" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.3, delay: isOpen ? 0.1 : 0 }
        }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-[var(--sevilla-bronze)]/10">
          <motion.p
            className="font-body text-[var(--stone-grey)] leading-relaxed pt-6"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {answer}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FAQ({ content, id }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const decorLeftX = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const decorRightX = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "white"];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id={id} className={`relative py-24 md:py-32 ${bgColor} overflow-hidden`}>
      {/* Decorative olive branches - Left (Parallax) */}
      <Floating duration={10} distance={15}>
        <motion.div
          className="absolute left-0 top-1/4 w-56 h-40 md:w-72 md:h-48 pointer-events-none opacity-15 hidden lg:block"
          style={{
            backgroundImage: `url(${getAsset("oliveBranch")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: decorLeftX,
            rotate: -10
          }}
        />
      </Floating>

      {/* Decorative olive branches - Right (Parallax) */}
      <Floating duration={8} distance={20} delay={1}>
        <motion.div
          className="absolute right-0 bottom-1/4 w-56 h-40 md:w-72 md:h-48 pointer-events-none opacity-15 hidden lg:block"
          style={{
            backgroundImage: `url(${getAsset("oliveBranch")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            x: decorRightX,
            scaleX: -1,
            rotate: 10
          }}
        />
      </Floating>

      {/* Background azulejo pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "180px"
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 bg-[var(--watercolor-sage)]/10 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <HelpCircle className="w-8 h-8 text-[var(--watercolor-sage)]" />
              </motion.div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-[var(--soft-charcoal)]">
                {content.title}
              </h2>
              {content.subtitle && (
                <p className="font-body text-lg text-[var(--stone-grey)]">{content.subtitle}</p>
              )}
            </div>
          </ScrollReveal>

          {/* Decorative divider */}
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 mb-16">
              <motion.div
                className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)]/40"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
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
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </ScrollReveal>

          {/* FAQ Items */}
          <div className="space-y-4">
            {content.questions.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Bottom decoration */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16">
              <Floating duration={6} distance={10}>
                <img
                  src={getAsset("orangeBranch")}
                  alt=""
                  className="h-16 md:h-20 watercolor-asset opacity-30"
                />
              </Floating>
            </div>
          </ScrollReveal>
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
