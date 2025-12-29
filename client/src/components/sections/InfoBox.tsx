import ReactMarkdown from "react-markdown";
import { Info, Heart, Star } from "lucide-react";
import type { InfoBoxContent } from "./types";

interface InfoBoxProps {
  content: InfoBoxContent;
  id?: string;
}

export function InfoBox({ content, id }: InfoBoxProps) {
  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "cream"];

  const iconMap = {
    info: Info,
    heart: Heart,
    star: Star,
    custom: Info,
  };

  const Icon = iconMap[content.icon || "info"];

  const isHighlight = content.style === "highlight";

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div
            className={`p-8 md:p-10 rounded-sm border-2 ${
              isHighlight
                ? "bg-[var(--rooftop-clay)]/10 border-[var(--rooftop-clay)]"
                : "bg-white border-[var(--sevilla-bronze)]/30"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`flex-shrink-0 p-3 rounded-full ${
                  isHighlight ? "bg-[var(--rooftop-clay)]" : "bg-[var(--watercolor-sage)]"
                }`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-serif text-2xl md:text-3xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h3>
                <div className="prose prose-sm md:prose-base max-w-none font-body text-[var(--stone-grey)]">
                  <ReactMarkdown>{content.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
