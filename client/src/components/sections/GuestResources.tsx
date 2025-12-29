import { Plane, Hotel, Car, Info } from "lucide-react";
import { getAsset } from "@/lib/assets";
import type { GuestResourcesContent } from "./types";

interface GuestResourcesProps {
  content: GuestResourcesContent;
  id?: string;
}

export function GuestResources({ content, id }: GuestResourcesProps) {
  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "cream"];

  const iconMap = {
    hotel: Hotel,
    airplane: Plane,
    car: Car,
    info: Info,
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-body text-lg text-[var(--stone-grey)]">{content.subtitle}</p>
            )}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
              <img src={getAsset("iconAirplane")} alt="" className="h-8 watercolor-asset" />
              <div className="h-px w-16 bg-[var(--sevilla-bronze)] opacity-30" />
            </div>
          </div>

          {/* Resource Sections */}
          <div className="space-y-10">
            {content.sections.map((section, index) => {
              const Icon = iconMap[section.icon];

              return (
                <div key={index} className="bg-white border border-[var(--sevilla-bronze)]/30 p-8 md:p-10 rounded-sm">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[var(--watercolor-sage)]/10 rounded-full">
                      <Icon className="w-6 h-6 text-[var(--watercolor-sage)]" />
                    </div>
                    <h3 className="font-serif text-2xl text-[var(--soft-charcoal)]">{section.sectionTitle}</h3>
                  </div>

                  {/* Content (Markdown) */}
                  <div className="font-body text-[var(--stone-grey)] leading-relaxed mb-6 prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, "<br />") }} />
                  </div>

                  {/* Recommendations */}
                  {section.recommendations && section.recommendations.length > 0 && (
                    <div className="space-y-4 mt-6">
                      {section.recommendations.map((rec, recIndex) => (
                        <div
                          key={recIndex}
                          className="p-5 bg-[var(--warm-beige)]/50 border border-[var(--sevilla-bronze)]/20 rounded-sm"
                        >
                          <h4 className="font-body-regular text-lg text-[var(--soft-charcoal)] mb-2">{rec.name}</h4>
                          <p className="font-body text-sm text-[var(--stone-grey)] mb-3">{rec.description}</p>
                          <div className="flex flex-wrap gap-3">
                            {rec.link && (
                              <a
                                href={rec.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[var(--watercolor-sage)] hover:text-[var(--rooftop-clay)] font-body-regular underline"
                              >
                                Sitio Web →
                              </a>
                            )}
                            {rec.phone && (
                              <span className="text-sm text-[var(--sevilla-bronze)] font-body">
                                Tel: {rec.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
