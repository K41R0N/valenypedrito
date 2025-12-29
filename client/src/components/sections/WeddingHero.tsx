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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--antique-cream)]"
      style={{
        backgroundImage: content.backgroundImage ? `url(${content.backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability when using photo background */}
      {content.backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      )}

      {/* Decorative Azulejo Tiles - Top Left Corner */}
      <div
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translate(-20%, -20%)"
        }}
      />

      {/* Decorative Azulejo Tiles - Top Right Corner */}
      <div
        className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${getAsset("azulejoTile")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translate(20%, -20%) rotate(90deg)"
        }}
      />

      {/* Orange Branch - Decorative Left Side */}
      <div
        className="absolute left-0 top-1/4 w-40 h-40 md:w-56 md:h-56 pointer-events-none opacity-30 hidden lg:block"
        style={{
          backgroundImage: `url(${getAsset("orangeBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(-30%) rotate(-15deg)"
        }}
      />

      {/* Orange Branch - Decorative Right Side */}
      <div
        className="absolute right-0 top-1/3 w-40 h-40 md:w-56 md:h-56 pointer-events-none opacity-30 hidden lg:block"
        style={{
          backgroundImage: `url(${getAsset("orangeBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(30%) rotate(15deg) scaleX(-1)"
        }}
      />

      {/* Content - Centered with high z-index for readability */}
      <div className="relative z-20 container px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Couple Names in Script Font */}
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-4 text-[var(--soft-charcoal)] drop-shadow-sm">
            {content.brideName}
          </h1>

          <div className="text-4xl md:text-6xl font-serif text-[var(--sevilla-bronze)] mb-4">&</div>

          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl mb-8 text-[var(--soft-charcoal)] drop-shadow-sm">
            {content.groomName}
          </h1>

          {/* Announcement in Serif Uppercase */}
          <h2 className="font-serif text-2xl md:text-4xl mb-8 text-[var(--soft-charcoal)] tracking-widest">
            {content.announcement}
          </h2>

          {/* Decorative Line with Azulejo-inspired center */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)] opacity-50" />
            <div
              className="w-8 h-8 opacity-40"
              style={{
                backgroundImage: `url(${getAsset("azulejoTile")})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
            <div className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)] opacity-50" />
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

      {/* Seville Skyline - PROMINENT Background Illustration */}
      {content.skylinePosition === "bottom" && (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10">
          {/* Gradient overlay to blend skyline top into background */}
          <div
            className="absolute top-0 left-0 right-0 h-32 md:h-48 z-10"
            style={{
              background: 'linear-gradient(to bottom, var(--antique-cream) 0%, transparent 100%)'
            }}
          />
          {/* Main Skyline Image - Large and Prominent */}
          <img
            src={getAsset("skyline")}
            alt="Horizonte de Sevilla"
            className="w-full h-auto watercolor-asset relative scale-110 origin-bottom"
            style={{
              maxHeight: "45vh",
              objectFit: "cover",
              objectPosition: "bottom center",
              maskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)'
            }}
          />
        </div>
      )}
    </section>
  );
}
