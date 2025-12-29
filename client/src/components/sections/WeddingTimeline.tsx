import { useEffect, useRef, useState } from "react";
import { Church, Wine, UtensilsCrossed, Music, Users } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  icon?: "ceremony" | "cocktail" | "dinner" | "party" | "arrival";
}

interface WeddingTimelineContent {
  title?: string;
  subtitle?: string;
  date?: string;
  events?: TimelineEvent[];
  backgroundColor?: "white" | "warm" | "subtle";
}

interface WeddingTimelineProps {
  content: WeddingTimelineContent;
  id?: string;
}

const iconMap = {
  ceremony: Church,
  cocktail: Wine,
  dinner: UtensilsCrossed,
  party: Music,
  arrival: Users,
};

export function WeddingTimeline({ content, id }: WeddingTimelineProps) {
  const {
    title = "El Gran Día",
    subtitle,
    date,
    events = [
      { time: "17:30", title: "Llegada de Invitados", description: "Recepción con cóctel de bienvenida en los jardines", icon: "arrival" },
      { time: "18:00", title: "Ceremonia", description: "Ceremonia civil en el patio principal", icon: "ceremony" },
      { time: "19:30", title: "Cóctel", description: "Cóctel y aperitivos en la terraza", icon: "cocktail" },
      { time: "21:00", title: "Cena", description: "Cena de celebración en el salón principal", icon: "dinner" },
      { time: "23:00", title: "Fiesta", description: "Música, baile y celebración hasta el amanecer", icon: "party" },
    ],
    backgroundColor = "white",
  } = content;

  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Miércoles, 23 de Septiembre de 2026";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  const bgClass = {
    white: "bg-section-white",
    warm: "bg-section-warm",
    subtle: "bg-section-subtle",
  }[backgroundColor];

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
          <p className="font-serif text-lg text-[var(--text-secondary)] capitalize">
            {formattedDate}
          </p>
          {subtitle && <p className="section-subtitle mt-4">{subtitle}</p>}
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="timeline-line hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {events.map((event, index) => {
              const Icon = iconMap[event.icon || "ceremony"] || Church;
              const isVisible = visibleItems.includes(index);

              return (
                <div
                  key={index}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`relative grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 p-6 bg-[var(--bg-white)] border border-[var(--border-light)] rounded-lg transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  } hover:shadow-luxury hover:border-[var(--dusty-rose)] hover:-translate-y-1`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Number Badge */}
                  <div className="hidden md:flex timeline-dot">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      {/* Mobile icon */}
                      <div className="md:hidden w-10 h-10 rounded-full bg-[var(--dusty-rose)] text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-serif-semibold text-2xl text-accent">
                          {event.time}
                        </p>
                        <h3 className="font-sans-semibold text-lg text-[var(--text-primary)]">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed md:pl-14 pl-14 md:pl-0">
                        {event.description}
                      </p>
                    )}
                  </div>

                  {/* Desktop Icon */}
                  <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
                    <Icon className="w-6 h-6 text-[var(--text-light)]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
