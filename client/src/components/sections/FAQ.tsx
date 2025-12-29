import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getAsset } from "@/lib/assets";
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
    <section id={id} className={`relative py-16 md:py-24 ${bgColor} overflow-hidden`}>
      {/* Decorative olive branches - Left side */}
      <div
        className="absolute left-0 top-1/4 w-48 h-32 md:w-64 md:h-40 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${getAsset("oliveBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(-40%) rotate(-5deg)"
        }}
      />

      {/* Decorative olive branches - Right side */}
      <div
        className="absolute right-0 bottom-1/4 w-48 h-32 md:w-64 md:h-40 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${getAsset("oliveBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(40%) rotate(5deg) scaleX(-1)"
        }}
      />

      {/* Azulejo tile - top center decorative */}
      <div
        className="absolute top-8 left-1/2 w-24 h-24 md:w-32 md:h-32 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(-50%)"
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-body text-lg text-[var(--stone-grey)]">{content.subtitle}</p>
            )}
          </div>

          {/* Decorative Line with azulejo center */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
            <div
              className="w-6 h-6 opacity-40"
              style={{
                backgroundImage: `url(${getAsset("azulejoTile")})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {content.questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/90 backdrop-blur-sm border border-[var(--sevilla-bronze)]/30 px-6"
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
