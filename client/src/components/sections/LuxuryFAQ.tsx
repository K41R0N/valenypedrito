import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface LuxuryFAQContent {
  title?: string;
  subtitle?: string;
  questions?: FAQItem[];
  backgroundColor?: "white" | "warm" | "subtle";
}

interface LuxuryFAQProps {
  content: LuxuryFAQContent;
  id?: string;
}

export function LuxuryFAQ({ content, id }: LuxuryFAQProps) {
  const {
    title = "Todo Lo Que Necesitas Saber",
    subtitle,
    questions = [
      {
        question: "¿Dónde puedo alojarme?",
        answer: "Recomendamos hospedarse en el centro de Sevilla. Hoteles como el Hotel Alfonso XIII, Hotel Colón Gran Meliá, o el Hotel Casa 1800 son excelentes opciones cerca de los principales puntos de interés.",
      },
      {
        question: "¿Cómo llego desde el aeropuerto?",
        answer: "El Aeropuerto de Sevilla está a 25 minutos del centro. Puedes tomar un taxi (aprox. €25) o el autobús EA que sale cada 30 minutos hacia Plaza de Armas.",
      },
      {
        question: "¿Cuál es el código de vestimenta?",
        answer: "Formal/Cocktail. Ropa formal pero cómoda para disfrutar de la celebración. Por favor evita vestir de blanco, marfil o beige claro.",
      },
      {
        question: "¿Puedo llevar niños?",
        answer: "Queremos que todos disfruten de la celebración. Si necesitas ayuda organizando el cuidado de los pequeños, contáctanos y te daremos opciones.",
      },
    ],
    backgroundColor = "white",
  } = content;

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgClass = {
    white: "bg-section-white",
    warm: "bg-section-warm",
    subtle: "bg-section-subtle",
  }[backgroundColor];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {questions.map((item, index) => (
            <div
              key={index}
              className={`border-b border-[var(--border-light)] transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="accordion-trigger"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown
                  className={`accordion-icon transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`accordion-content overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
