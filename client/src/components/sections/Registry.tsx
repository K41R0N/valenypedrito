import { Gift } from "lucide-react";
import { getAsset } from "@/lib/assets";
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
    <section id={id} className={`relative py-16 md:py-24 ${bgColor} overflow-hidden`}>
      {/* Decorative orange branch - top right corner */}
      <div
        className="absolute top-0 right-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${getAsset("orangeBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translate(30%, -30%) rotate(15deg)"
        }}
      />

      {/* Decorative orange branch - bottom left corner */}
      <div
        className="absolute bottom-0 left-0 w-40 h-40 md:w-56 md:h-56 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${getAsset("orangeBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translate(-30%, 30%) rotate(-15deg) scaleX(-1)"
        }}
      />

      <div className="container relative z-10">
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

          {/* Decorative Line with azulejo */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
            <div
              className="w-8 h-8 opacity-40"
              style={{
                backgroundImage: `url(${getAsset("azulejoTile")})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
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
                  className="group bg-white/90 backdrop-blur-sm border-2 border-[var(--sevilla-bronze)]/30 hover:border-[var(--watercolor-sage)] p-8 transition-all duration-300 hover:shadow-md"
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
            <div className="bg-white/80 backdrop-blur-sm border border-[var(--sevilla-bronze)]/30 p-6 md:p-8">
              <p className="font-body text-base text-[var(--stone-grey)] leading-relaxed">{content.cashMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
