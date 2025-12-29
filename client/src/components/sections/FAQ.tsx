import { useRef, useState } from "react";
import { getAsset } from "@/lib/assets";
import type { FAQContent } from "./types";
import {
  motion,
  useInView
} from "@/lib/animations";
import { X, Shirt, Baby, Gift, Clock, MapPin, Utensils, Camera, HelpCircle } from "lucide-react";

interface FAQProps {
  content: FAQContent;
  id?: string;
}

// Icon mapping for question categories
const iconMap: Record<string, React.ElementType> = {
  dresscode: Shirt,
  children: Baby,
  gifts: Gift,
  schedule: Clock,
  location: MapPin,
  food: Utensils,
  photos: Camera,
  default: HelpCircle
};

// Detect category from question keywords
function getQuestionIcon(question: string): React.ElementType {
  const lowerQ = question.toLowerCase();
  if (lowerQ.includes("vestir") || lowerQ.includes("traje") || lowerQ.includes("dress")) return iconMap.dresscode;
  if (lowerQ.includes("niño") || lowerQ.includes("bebé") || lowerQ.includes("hijo")) return iconMap.children;
  if (lowerQ.includes("regalo") || lowerQ.includes("gift")) return iconMap.gifts;
  if (lowerQ.includes("hora") || lowerQ.includes("cuándo") || lowerQ.includes("tiempo")) return iconMap.schedule;
  if (lowerQ.includes("dónde") || lowerQ.includes("ubicación") || lowerQ.includes("llegar")) return iconMap.location;
  if (lowerQ.includes("comida") || lowerQ.includes("cena") || lowerQ.includes("menú")) return iconMap.food;
  if (lowerQ.includes("foto") || lowerQ.includes("cámara")) return iconMap.photos;
  return iconMap.default;
}

// Question card component
function QuestionCard({
  question,
  answer,
  index,
  isOpen,
  onOpen
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = getQuestionIcon(question);

  // Card sizes for visual variety
  const sizes = ["", "lg:col-span-2", "", "", "lg:col-span-2", ""];
  const cardSize = sizes[index % sizes.length];

  return (
    <motion.div
      ref={ref}
      className={`${cardSize}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <motion.button
        onClick={onOpen}
        className="w-full h-full min-h-[180px] bg-white border border-[var(--sevilla-bronze)]/20 p-6 md:p-8 text-left relative overflow-hidden group"
        whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(156, 124, 88, 0.12)" }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decoration */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
          style={{
            backgroundImage: `url(${getAsset("azulejoTile")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* Icon */}
        <motion.div
          className="w-12 h-12 bg-[var(--watercolor-sage)]/10 flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-6 h-6 text-[var(--watercolor-sage)]" />
        </motion.div>

        {/* Question text */}
        <h3 className="font-body-regular text-base md:text-lg text-[var(--soft-charcoal)] leading-relaxed pr-8 group-hover:text-[var(--rooftop-clay)] transition-colors">
          {question}
        </h3>

        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-6 right-6 w-8 h-8 border border-[var(--sevilla-bronze)]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-[var(--sevilla-bronze)] text-lg">→</span>
        </motion.div>

        {/* Question number */}
        <span className="absolute top-4 right-4 font-serif text-4xl text-[var(--sevilla-bronze)]/10">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.button>
    </motion.div>
  );
}

// Modal for answer
function AnswerModal({
  question,
  answer,
  isOpen,
  onClose
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const Icon = getQuestionIcon(question);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[var(--soft-charcoal)]/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        className="relative bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-[var(--warm-beige)] flex items-center justify-center z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <X className="w-5 h-5 text-[var(--soft-charcoal)]" />
        </motion.button>

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-[var(--sevilla-bronze)]/20">
          <div className="w-14 h-14 bg-[var(--watercolor-sage)]/10 flex items-center justify-center mb-6">
            <Icon className="w-7 h-7 text-[var(--watercolor-sage)]" />
          </div>
          <h3 className="font-body-regular text-xl md:text-2xl text-[var(--soft-charcoal)] leading-relaxed">
            {question}
          </h3>
        </div>

        {/* Answer */}
        <div className="p-8 md:p-12">
          <motion.p
            className="font-body text-[var(--stone-grey)] leading-relaxed text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {answer}
          </motion.p>
        </div>

        {/* Bottom decoration */}
        <div className="px-8 md:px-12 pb-8 flex justify-center">
          <motion.img
            src={getAsset("oliveBranch")}
            alt=""
            className="w-32 opacity-30 watercolor-asset"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FAQ({ content, id }: FAQProps) {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "cream"];

  const openQuestion = (index: number) => {
    setActiveQuestion(index);
    document.body.style.overflow = "hidden";
  };

  const closeQuestion = () => {
    setActiveQuestion(null);
    document.body.style.overflow = "";
  };

  return (
    <section ref={sectionRef} id={id} className={`relative py-24 md:py-32 ${bgColor} overflow-hidden`}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "200px"
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            className="font-serif text-xs tracking-[0.5em] text-[var(--stone-grey)] uppercase block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Todo lo que necesitas saber
          </motion.span>

          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--soft-charcoal)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {content.title}
          </motion.h2>

          {content.subtitle && (
            <motion.p
              className="font-body text-lg text-[var(--stone-grey)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.subtitle}
            </motion.p>
          )}

          {/* Decorative line */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-px w-12 md:w-20 bg-[var(--sevilla-bronze)]/40"
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ transformOrigin: "right" }}
            />
            <HelpCircle className="w-5 h-5 text-[var(--sevilla-bronze)]/50" />
            <motion.div
              className="h-px w-12 md:w-20 bg-[var(--sevilla-bronze)]/40"
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </div>

        {/* Questions Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {content.questions.map((item, index) => (
            <QuestionCard
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={activeQuestion === index}
              onOpen={() => openQuestion(index)}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.img
            src={getAsset("orangeBranch")}
            alt=""
            className="w-40 opacity-20 watercolor-asset"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 3, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Answer Modal */}
      {activeQuestion !== null && (
        <AnswerModal
          question={content.questions[activeQuestion].question}
          answer={content.questions[activeQuestion].answer}
          isOpen={true}
          onClose={closeQuestion}
        />
      )}
    </section>
  );
}
