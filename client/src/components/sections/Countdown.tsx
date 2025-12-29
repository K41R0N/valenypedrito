import { useState, useEffect } from "react";
import { getAsset } from "@/lib/assets";
import type { CountdownContent } from "./types";
import { parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

interface CountdownProps {
  content: CountdownContent;
  id?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ content, id }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = parseISO(content.weddingDate);
      const now = new Date();

      const days = Math.max(0, differenceInDays(weddingDate, now));
      const hours = Math.max(0, differenceInHours(weddingDate, now) % 24);
      const minutes = Math.max(0, differenceInMinutes(weddingDate, now) % 60);
      const seconds = Math.max(0, differenceInSeconds(weddingDate, now) % 60);

      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [content.weddingDate]);

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "cream"];

  return (
    <section id={id} className={`relative py-16 md:py-24 ${bgColor} overflow-hidden`}>
      {/* Large decorative orange branch - Left side background */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${getAsset("orangeBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(-40%) translateY(-50%) rotate(-10deg)"
        }}
      />

      {/* Large decorative orange branch - Right side background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${getAsset("orangeBranch")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: "translateX(40%) translateY(-50%) rotate(10deg) scaleX(-1)"
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-[var(--soft-charcoal)]">{content.title}</h2>

          {/* Countdown Display with center decoration behind */}
          <div className="relative">
            {/* Center background olive branch */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15"
              style={{
                backgroundImage: `url(${getAsset("oliveBranch")})`,
                backgroundSize: "50% auto",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 relative z-10">
              {[
                { value: timeLeft.days, label: "Días" },
                { value: timeLeft.hours, label: "Horas" },
                { value: timeLeft.minutes, label: "Minutos" },
                { value: timeLeft.seconds, label: "Segundos" },
              ].map((unit, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-white/90 backdrop-blur-sm border border-[var(--sevilla-bronze)] p-6 md:p-8 shadow-sm w-full">
                    <div className="font-serif-semibold text-4xl md:text-5xl lg:text-6xl text-[var(--soft-charcoal)] mb-2">
                      {String(unit.value).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="font-body text-sm md:text-base text-[var(--stone-grey)] mt-3 uppercase tracking-wider">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom decorative element - small centered orange branch */}
          <div className="flex justify-center mt-8">
            <img
              src={getAsset("orangeBranch")}
              alt=""
              className="h-20 md:h-24 watercolor-asset opacity-60"
            />
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--sevilla-bronze)] opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--sevilla-bronze)] opacity-20" />
    </section>
  );
}
