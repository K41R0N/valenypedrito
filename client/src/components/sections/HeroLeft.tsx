import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check, Mail } from "lucide-react";
import { WavyDivider } from "@/components/illustrations";
import { trpc } from "@/lib/trpc";
import type { HeroLeftContent } from "./types";

// Import settings for social proof
import settingsContent from "@/content/settings.json";

interface HeroLeftProps {
  content: HeroLeftContent;
  id?: string;
}

export function HeroLeft({ content, id }: HeroLeftProps) {
  const [formData, setFormData] = useState({ email: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const heroSubscribe = trpc.newsletter.subscribeHero.useMutation();

  const socialProofText = `Join ${settingsContent.socialProofCount} families already signed up!`;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await heroSubscribe.mutateAsync({ email: formData.email });
      setSuccess(true);
      setFormData({ email: "" });
      // Clear any existing timeout before setting a new one
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setSuccess(false);
        timeoutRef.current = null;
      }, 15000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section id={id} className="relative min-h-screen md:min-h-screen flex items-start md:items-center overflow-hidden pt-32 md:pt-24">
      {/* Background - Desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: `url('${content.backgroundDesktop || "/hero-illustration.png"}')` }}
      />

      {/* Background - Mobile */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat md:hidden"
        style={{ backgroundImage: `url('${content.backgroundMobile || "/hero-illustration-mobile.png"}')` }}
      />

      {/* Sticker Characters - Desktop Only */}
      <div className="absolute inset-0 hidden md:block pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/stickers/sticker-sun.png"
          className="absolute top-10 right-10 w-64 h-64 animate-[spin_60s_linear_infinite]"
          alt="Sun character"
        />
        <img
          src="/images/stickers/sticker-goat.png"
          className="absolute bottom-0 right-[15%] w-80 h-auto z-10 animate-[float_6s_ease-in-out_infinite]"
          alt="Goat mascot"
        />
        <img
          src="/images/stickers/sticker-flower-1.png"
          className="absolute bottom-10 right-[2%] w-48 h-48 animate-[float_4s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
          alt="Flower character"
        />
        <img
          src="/images/stickers/sticker-flower-2.png"
          className="absolute bottom-12 right-[28%] w-36 h-36 animate-[float_5s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
          alt="Flower character"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 pt-8 pb-4 md:py-20">
        <div className="max-w-2xl">
          {/* Headlines */}
          <div className="mb-4 md:mb-6 transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-wide font-heading text-sticker mb-2">
              {content.headline}
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading text-sticker">
              {content.headlineSecondary}
            </h2>
          </div>

          <p className="text-lg md:text-2xl text-[#1B5E20] mb-2 md:mb-4 font-bold font-body text-sticker inline-block">
            {content.subheadline}
          </p>

          <div className="mb-4 md:mb-8">
            <p className="text-base md:text-xl text-[#1B5E20] leading-relaxed font-body font-bold text-sticker inline-block">
              {content.description}
            </p>
          </div>

          {/* Email Capture Form */}
          {content.showEmailForm !== false && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-3 md:border-4 border-[#FFC107] max-w-xl">
              <h3 className="text-lg md:text-2xl text-[#1B5E20] mb-1 md:mb-2 font-bold font-heading">
                🌿 {content.ctaTitle}
              </h3>
              <p className="text-[#2E7D32] mb-3 md:mb-4 text-xs md:text-base font-body">
                {content.ctaDescription}
              </p>

              {/* Social Proof */}
              {content.showSocialProof !== false && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#FFC107] border-2 border-white flex items-center justify-center text-xs">👨</div>
                    <div className="w-7 h-7 rounded-full bg-[#4CAF50] border-2 border-white flex items-center justify-center text-xs">👩</div>
                    <div className="w-7 h-7 rounded-full bg-[#1B5E20] border-2 border-white flex items-center justify-center text-xs">👦</div>
                  </div>
                  <span className="text-[#2E7D32] font-semibold text-xs md:text-sm font-body">
                    {socialProofText}
                  </span>
                </div>
              )}

              {success ? (
                <div className="flex items-center gap-3 bg-[#E8F5E9] rounded-xl p-4 border-2 border-[#4CAF50]">
                  <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[#1B5E20] font-bold font-heading">
                      {content.successTitle} 🎉
                    </p>
                    <p className="text-[#2E7D32] text-sm font-body">
                      {content.successMessage}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label
                      htmlFor="hero-email"
                      className="text-[#1B5E20] font-semibold text-xs md:text-sm mb-1 block font-body"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ email: e.target.value })}
                      className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50] bg-white h-11 md:h-12 text-base"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-sm font-body">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={heroSubscribe.isPending}
                    className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold py-4 md:py-5 text-base md:text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 border-2 border-[#1B5E20] font-heading"
                  >
                    {heroSubscribe.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        {content.ctaButtonText} 🌻
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-[#2E7D32]/70 text-center font-body">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* Badge */}
          {content.badgeText && (
            <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2 border border-white/30">
              <span className="text-[#FFC107] text-base md:text-lg">🌻</span>
              <span className="text-white font-semibold text-sm md:text-base font-body">
                {content.badgeText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavyDivider color="#FFFEF5" />
      </div>
    </section>
  );
}
