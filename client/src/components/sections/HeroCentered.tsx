import { Button } from "@/components/ui/button";
import { WavyDivider } from "@/components/illustrations";
import type { HeroCenteredContent } from "./types";

interface HeroCenteredProps {
  content: HeroCenteredContent;
  id?: string;
  onCtaClick?: () => void;
}

export function HeroCentered({ content, id, onCtaClick }: HeroCenteredProps) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else if (content.ctaButtonLink) {
      if (content.ctaButtonLink.startsWith("#")) {
        document.querySelector(content.ctaButtonLink)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = content.ctaButtonLink;
      }
    }
  };

  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background - Desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: `url('${content.backgroundDesktop || "/hero-illustration.png"}')` }}
      />

      {/* Background - Mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url('${content.backgroundMobile || content.backgroundDesktop || "/hero-illustration-mobile.png"}')` }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Decorative Elements - Watercolor style */}
      <div className="absolute inset-0 hidden md:block pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/watercolor/orange-branch.png"
          className="absolute top-10 right-10 w-48 h-48 opacity-70"
          alt=""
        />
        <img
          src="/images/watercolor/olive-branch.png"
          className="absolute bottom-20 left-10 w-32 h-32 opacity-70"
          alt=""
        />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 container px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          {content.badgeText && (
            <div className="mb-6 inline-flex items-center gap-2 bg-[#9C7C58]/80 backdrop-blur-sm px-4 py-2">
              <span className="text-white font-body text-sm md:text-base">
                {content.badgeText}
              </span>
            </div>
          )}

          {/* Headlines */}
          <div className="mb-6 md:mb-8">
            <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-white drop-shadow-lg mb-4">
              {content.headline}
            </h1>
            {content.headlineSecondary && (
              <h2 className="font-script text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-lg">
                {content.headlineSecondary}
              </h2>
            )}
          </div>

          <p className="text-xl md:text-3xl text-white mb-4 font-body drop-shadow-lg">
            {content.subheadline}
          </p>

          {content.description && (
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-body drop-shadow-md">
              {content.description}
            </p>
          )}

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleCtaClick}
            className="bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-body px-10 py-7 text-xl shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {content.ctaButtonText}
          </Button>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavyDivider color="#F9F7F2" />
      </div>
    </section>
  );
}
