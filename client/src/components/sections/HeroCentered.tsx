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

      {/* Decorative Elements */}
      <div className="absolute inset-0 hidden md:block pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/stickers/sticker-sun.png"
          className="absolute top-10 right-10 w-48 h-48 animate-[spin_60s_linear_infinite] opacity-90"
          alt=""
        />
        <img
          src="/images/stickers/sticker-flower-1.png"
          className="absolute bottom-20 left-10 w-32 h-32 animate-[float_4s_ease-in-out_infinite]"
          alt=""
        />
        <img
          src="/images/stickers/sticker-flower-2.png"
          className="absolute bottom-20 right-10 w-28 h-28 animate-[float_5s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
          alt=""
        />
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 container px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          {content.badgeText && (
            <div className="mb-6 inline-flex items-center gap-2 bg-[#1B5E20] backdrop-blur-sm rounded-full px-4 py-2 border-2 border-[#FFC107]">
              <span className="text-[#FFC107] text-lg">🌻</span>
              <span className="text-white font-semibold text-sm md:text-base font-body">
                {content.badgeText}
              </span>
            </div>
          )}

          {/* Headlines */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-wide font-heading text-sticker mb-4">
              {content.headline}
            </h1>
            {content.headlineSecondary && (
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading text-sticker">
                {content.headlineSecondary}
              </h2>
            )}
          </div>

          <p className="text-xl md:text-3xl text-white mb-4 font-bold font-body drop-shadow-lg">
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
            className="bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold px-10 py-7 text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl border-4 border-[#1B5E20] font-heading"
          >
            {content.ctaButtonText} 🌿
          </Button>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavyDivider color="#FFFEF5" />
      </div>
    </section>
  );
}
