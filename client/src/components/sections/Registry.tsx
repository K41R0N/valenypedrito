import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RegistryContent } from "./types";

interface RegistryProps {
  content: RegistryContent;
  id?: string;
}

export function Registry({ content, id }: RegistryProps) {
  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "white"];

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.message && (
              <p className="font-body text-lg text-[var(--stone-grey)] max-w-2xl mx-auto leading-relaxed">
                {content.message}
              </p>
            )}
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
            <Gift className="w-5 h-5 text-[var(--sevilla-bronze)]" />
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
          </div>

          {/* Registry Links */}
          {content.registryLinks && content.registryLinks.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 mb-10">
              {content.registryLinks.map((registry, index) => (
                <a
                  key={index}
                  href={registry.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border-2 border-[var(--sevilla-bronze)]/30 hover:border-[var(--watercolor-sage)] p-8 transition-all duration-300 hover:shadow-md"
                >
                  {registry.storeImage && (
                    <div className="mb-4">
                      <img src={registry.storeImage} alt={registry.storeName} className="h-12 mx-auto object-contain" />
                    </div>
                  )}
                  <h3 className="font-serif text-xl text-[var(--soft-charcoal)] group-hover:text-[var(--watercolor-sage)] transition-colors">
                    {registry.storeName}
                  </h3>
                  <p className="font-body text-sm text-[var(--sevilla-bronze)] mt-2">Ver Lista →</p>
                </a>
              ))}
            </div>
          )}

          {/* Cash Option */}
          {content.showCashOption && content.cashMessage && (
            <div className="bg-[var(--warm-beige)] border border-[var(--sevilla-bronze)]/30 p-6 md:p-8">
              <p className="font-body text-base text-[var(--stone-grey)] leading-relaxed">{content.cashMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
