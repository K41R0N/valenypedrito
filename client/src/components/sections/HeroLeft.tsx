import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check, Mail } from "lucide-react";
import { WavyDivider } from "@/components/illustrations";
import { trpc } from "@/lib/trpc";
import type { HeroLeftContent } from "./types";

// Import settings
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
      setError("Por favor ingresa un correo electrónico válido");
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
        err instanceof Error ? err.message : "Algo salió mal. Por favor intenta de nuevo."
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

      {/* Decorative Elements - Watercolor style */}
      <div className="absolute inset-0 hidden md:block pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/watercolor/orange-branch.png"
          className="absolute top-10 right-10 w-64 h-64 opacity-60"
          alt=""
        />
        <img
          src="/images/watercolor/olive-branch.png"
          className="absolute bottom-10 right-[2%] w-48 h-48 opacity-60"
          alt=""
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 pt-8 pb-4 md:py-20">
        <div className="max-w-2xl">
          {/* Headlines */}
          <div className="mb-4 md:mb-6">
            <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-[#2C2C2C] mb-2 drop-shadow-sm">
              {content.headline}
            </h1>
            <h2 className="font-script text-4xl md:text-6xl lg:text-7xl text-[#2C2C2C] drop-shadow-sm">
              {content.headlineSecondary}
            </h2>
          </div>

          <p className="text-lg md:text-2xl text-[#595959] mb-2 md:mb-4 font-body">
            {content.subheadline}
          </p>

          <div className="mb-4 md:mb-8">
            <p className="text-base md:text-xl text-[#595959] leading-relaxed font-body">
              {content.description}
            </p>
          </div>

          {/* Email Capture Form */}
          {content.showEmailForm !== false && (
            <div className="bg-white/95 backdrop-blur-sm p-4 md:p-8 shadow-lg border border-[#F0EBE0] max-w-xl">
              <h3 className="text-lg md:text-2xl text-[#2C2C2C] mb-1 md:mb-2 font-serif uppercase tracking-wide">
                {content.ctaTitle}
              </h3>
              <p className="text-[#595959] mb-3 md:mb-4 text-xs md:text-base font-body">
                {content.ctaDescription}
              </p>

              {success ? (
                <div className="flex items-center gap-3 bg-[#F0EBE0] p-4 border border-[#7A8B6E]">
                  <div className="w-10 h-10 bg-[#7A8B6E] flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[#2C2C2C] font-semibold font-serif">
                      {content.successTitle}
                    </p>
                    <p className="text-[#595959] text-sm font-body">
                      {content.successMessage}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label
                      htmlFor="hero-email"
                      className="text-[#2C2C2C] font-medium text-xs md:text-sm mb-1 block font-body"
                    >
                      Correo electrónico
                    </Label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ email: e.target.value })}
                      className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58] bg-white h-11 md:h-12 text-base"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm font-body">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={heroSubscribe.isPending}
                    className="w-full bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-body py-4 md:py-5 text-base md:text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  >
                    {heroSubscribe.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        {content.ctaButtonText}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-[#595959]/70 text-center font-body">
                    Sin spam. Puedes cancelar en cualquier momento.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* Badge */}
          {content.badgeText && (
            <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-[#9C7C58]/80 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2">
              <span className="text-white font-body text-sm md:text-base">
                {content.badgeText}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <WavyDivider color="#F9F7F2" />
      </div>
    </section>
  );
}
