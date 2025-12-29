import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQContent } from "./types";

interface FAQProps {
  content: FAQContent;
  id?: string;
}

export function FAQ({ content, id }: FAQProps) {
  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "white"];

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-body text-lg text-[var(--stone-grey)]">{content.subtitle}</p>
            )}
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--sevilla-bronze)]" />
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {content.questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-[var(--sevilla-bronze)]/30 px-6"
              >
                <AccordionTrigger className="font-body-regular text-left text-[var(--soft-charcoal)] hover:text-[var(--rooftop-clay)] hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-[var(--stone-grey)] pb-5 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
