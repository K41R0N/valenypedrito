import { getAsset } from "@/lib/assets";
import type { WeddingHeroContent } from "./types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface WeddingHeroProps {
  content: WeddingHeroContent;
  id?: string;
}

export function WeddingHero({ content, id }: WeddingHeroProps) {
  // Format the date in Spanish
  const formattedDate = content.date
    ? format(parseISO(content.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
    : "";

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      )}

      {/* Content - Centered */}
      <div className="relative z-10 container px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Couple Names in Script Font */}
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-4 text-[var(--soft-charcoal)]">
            {content.brideName}
          </h1>

          <div className="text-4xl md:text-6xl font-serif text-[var(--sevilla-bronze)] mb-4">&</div>

          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-8 text-[var(--soft-charcoal)]">
            {content.groomName}
          </h1>

          {/* Announcement in Serif Uppercase */}
          <h2 className="font-serif text-2xl md:text-4xl mb-8 text-[var(--soft-charcoal)] tracking-widest">
            {content.announcement}
          </h2>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-24 bg-[var(--sevilla-bronze)] opacity-50" />
            <div className="w-2 h-2 rounded-full bg-[var(--sevilla-bronze)]" />
            <div className="h-px w-24 bg-[var(--sevilla-bronze)] opacity-50" />
          </div>

          {/* Date */}
          <p className="font-serif-semibold text-xl md:text-2xl mb-4 text-[var(--soft-charcoal)] capitalize">
            {formattedDate}
          </p>

          {/* Venue & Location */}
          <p className="font-body-regular text-lg md:text-xl mb-2 text-[var(--soft-charcoal)]">
            {content.venue}
          </p>
          <p className="font-body text-base md:text-lg text-[var(--sevilla-bronze)]">{content.location}</p>
        </div>
      </div>

      {/* Seville Skyline Illustration */}
      {content.skylinePosition === "bottom" && (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
          <img
            src={getAsset("skyline")}
            alt="Seville Skyline"
            className="w-full h-auto watercolor-asset"
            style={{ opacity: 0.9 }}
          />
        </div>
      )}
    </section>
  );
}
