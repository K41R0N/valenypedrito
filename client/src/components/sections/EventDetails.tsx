import { Calendar, Clock, MapPin, DollarSign, AlertCircle } from "lucide-react";
import type { EventDetailsContent } from "./types";

interface EventDetailsProps {
  content: EventDetailsContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#FFFEF5]",
  white: "bg-white",
  green: "bg-[#E8F5E9]",
};

export function EventDetails({ content, id }: EventDetailsProps) {
  const bgColor = bgColors[content.backgroundColor || "cream"];

  return (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="container max-w-4xl">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-block bg-[#1B5E20] rounded-2xl px-8 py-3 mb-4">
            <h2 className="text-2xl md:text-4xl text-[#FFC107] font-heading">
              {content.titleEmoji && `${content.titleEmoji} `}{content.title}
            </h2>
          </div>
        </div>

        {/* Event Info Card */}
        <div className="bg-white rounded-3xl shadow-xl border-4 border-[#1B5E20] p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#FFC107] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-7 h-7 text-[#1B5E20]" />
              </div>
              <div>
                <p className="text-sm text-[#2E7D32] font-semibold uppercase tracking-wide font-body">Date</p>
                <p className="text-xl text-[#1B5E20] font-bold font-heading">{content.eventDate}</p>
              </div>
            </div>

            {/* Time */}
            {content.eventTime && (
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#4CAF50] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-[#2E7D32] font-semibold uppercase tracking-wide font-body">Time</p>
                  <p className="text-xl text-[#1B5E20] font-bold font-heading">{content.eventTime}</p>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[#1B5E20] rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-[#FFC107]" />
              </div>
              <div>
                <p className="text-sm text-[#2E7D32] font-semibold uppercase tracking-wide font-body">Location</p>
                <p className="text-xl text-[#1B5E20] font-bold font-heading">{content.location}</p>
                {content.mapLink && (
                  <a
                    href={content.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#4CAF50] hover:text-[#1B5E20] underline font-body"
                  >
                    View on Map →
                  </a>
                )}
              </div>
            </div>

            {/* Price */}
            {content.price && (
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#FFC107] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-7 h-7 text-[#1B5E20]" />
                </div>
                <div>
                  <p className="text-sm text-[#2E7D32] font-semibold uppercase tracking-wide font-body">Price</p>
                  <p className="text-xl text-[#1B5E20] font-bold font-heading">{content.price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Registration Deadline */}
          {content.registrationDeadline && (
            <div className="mt-8 p-4 bg-[#FFF3E0] border-2 border-[#FFC107] rounded-xl flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-[#F57C00] flex-shrink-0" />
              <p className="text-[#E65100] font-semibold font-body">
                Registration deadline: {content.registrationDeadline}
              </p>
            </div>
          )}

          {/* Description */}
          {content.description && (
            <div className="mt-8 pt-8 border-t-2 border-[#E8F5E9]">
              <p className="text-lg text-[#2E7D32] leading-relaxed font-body">
                {content.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
