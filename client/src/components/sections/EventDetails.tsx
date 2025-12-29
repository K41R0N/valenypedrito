import { Calendar, Clock, MapPin, DollarSign, AlertCircle } from "lucide-react";
import type { EventDetailsContent } from "./types";

interface EventDetailsProps {
  content: EventDetailsContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#F9F7F2]",
  white: "bg-white",
  beige: "bg-[#F0EBE0]",
};

export function EventDetails({ content, id }: EventDetailsProps) {
  const bgColor = bgColors[content.backgroundColor as keyof typeof bgColors] || bgColors.cream;

  return (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="container max-w-4xl">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl text-[#2C2C2C] font-serif uppercase tracking-wider">
            {content.title}
          </h2>
        </div>

        {/* Event Info Card */}
        <div className="bg-white shadow-lg border border-[#F0EBE0] p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#9C7C58] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#595959] font-medium uppercase tracking-wide font-body">Fecha</p>
                <p className="text-xl text-[#2C2C2C] font-semibold font-serif">{content.eventDate}</p>
              </div>
            </div>

            {/* Time */}
            {content.eventTime && (
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#7A8B6E] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#595959] font-medium uppercase tracking-wide font-body">Hora</p>
                  <p className="text-xl text-[#2C2C2C] font-semibold font-serif">{content.eventTime}</p>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#D6966C] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#595959] font-medium uppercase tracking-wide font-body">Lugar</p>
                <p className="text-xl text-[#2C2C2C] font-semibold font-serif">{content.location}</p>
                {content.mapLink && (
                  <a
                    href={content.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9C7C58] hover:text-[#7A8B6E] underline font-body"
                  >
                    Ver en mapa →
                  </a>
                )}
              </div>
            </div>

            {/* Price */}
            {content.price && (
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#9C7C58] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#595959] font-medium uppercase tracking-wide font-body">Precio</p>
                  <p className="text-xl text-[#2C2C2C] font-semibold font-serif">{content.price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Registration Deadline */}
          {content.registrationDeadline && (
            <div className="mt-8 p-4 bg-[#F0EBE0] border border-[#D6966C] flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#D6966C] flex-shrink-0" />
              <p className="text-[#2C2C2C] font-medium font-body">
                Fecha límite: {content.registrationDeadline}
              </p>
            </div>
          )}

          {/* Description */}
          {content.description && (
            <div className="mt-8 pt-8 border-t border-[#F0EBE0]">
              <p className="text-lg text-[#595959] leading-relaxed font-body">
                {content.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
