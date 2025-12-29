import { Calendar, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventsCalendarContent } from "./types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface EventsCalendarProps {
  content: EventsCalendarContent;
  id?: string;
}

export function EventsCalendar({ content, id }: EventsCalendarProps) {
  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "beige"];

  // Generate .ics file content for calendar download
  const generateICS = (event: EventsCalendarContent["events"][0]) => {
    const eventDate = parseISO(event.date);
    const startDate = format(eventDate, "yyyyMMdd'T'HHmmss");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `SUMMARY:${event.eventName}`,
      `LOCATION:${event.location}`,
      `DESCRIPTION:${event.description}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-body text-lg text-[var(--stone-grey)]">{content.subtitle}</p>
            )}
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {content.events.map((event, index) => {
              const eventDate = parseISO(event.date);
              const formattedDate = format(eventDate, "EEEE, d 'de' MMMM", { locale: es });
              const formattedTime = format(eventDate, "HH:mm");

              return (
                <div
                  key={index}
                  className="bg-white border border-[var(--sevilla-bronze)]/30 p-6 md:p-8 rounded-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="bg-[var(--watercolor-sage)]/10 border border-[var(--watercolor-sage)] p-4 rounded-sm text-center min-w-[120px]">
                        <div className="font-serif text-sm text-[var(--watercolor-sage)] uppercase tracking-wide mb-1">
                          {format(eventDate, "MMM", { locale: es })}
                        </div>
                        <div className="font-serif-semibold text-3xl text-[var(--soft-charcoal)]">
                          {format(eventDate, "d")}
                        </div>
                        <div className="font-body text-sm text-[var(--stone-grey)] mt-1">{formattedTime}</div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl mb-2 text-[var(--soft-charcoal)]">{event.eventName}</h3>

                      <div className="flex items-start gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-[var(--sevilla-bronze)] flex-shrink-0 mt-1" />
                        <p className="font-body text-sm text-[var(--sevilla-bronze)]">{event.location}</p>
                      </div>

                      <p className="font-body text-base text-[var(--stone-grey)] mb-4">{event.description}</p>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {event.addToCalendar && (
                          <a
                            href={generateICS(event)}
                            download={`${event.eventName.replace(/\s+/g, "-")}.ics`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--watercolor-sage)] hover:bg-[var(--watercolor-sage)]/90 text-white rounded-sm font-body text-sm transition-colors"
                          >
                            <Calendar className="w-4 h-4" />
                            Agregar a Calendario
                          </a>
                        )}

                        {event.requiresRSVP && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[var(--sevilla-bronze)] text-[var(--sevilla-bronze)] hover:bg-[var(--sevilla-bronze)]/10"
                            onClick={() => {
                              const rsvpSection = document.querySelector('[id*="rsvp"]');
                              rsvpSection?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            Confirmar Asistencia
                          </Button>
                        )}
                      </div>
                    </div>
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
