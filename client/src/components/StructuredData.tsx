import { useEffect } from "react";

interface StructuredDataProps {
  brideName?: string;
  groomName?: string;
  description?: string;
  email?: string;
  location?: string;
  weddingDate?: string;
  image?: string;
}

export function StructuredData({
  brideName = "Valentina",
  groomName = "Pedro Juan",
  description = "Boda de Valentina Osorio y Pedro Juan Zuleta. Celebra con nosotros el 23 de septiembre de 2026 en Hacienda la Soledad, Sevilla, España.",
  email,
  location = "Sevilla, España",
  weddingDate = "2026-09-23",
  image = "/images/watercolor/seville-skyline.png",
}: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Boda ${brideName} & ${groomName}`,
      description,
      startDate: weddingDate,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Hacienda la Soledad",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sevilla",
          addressCountry: "ES",
        },
      },
      image,
      organizer: {
        "@type": "Person",
        name: `${brideName} & ${groomName}`,
        ...(email && { email }),
      },
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [brideName, groomName, description, email, location, weddingDate, image]);

  return null;
}
