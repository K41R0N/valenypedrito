import { useEffect } from "react";

interface StructuredDataProps {
  siteName?: string;
  description?: string;
  email?: string;
  location?: string;
  image?: string;
  keywords?: string;
}

export function StructuredData({
  siteName = "GreenLand Village",
  description = "An interactive park where children and families will play, create, learn, and connect through meaningful experiences. Opening 2025 in Parkland, Florida.",
  email = "greenlandvillagefl@gmail.com",
  location = "Parkland, FL",
  image = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200",
  keywords = "family park, interactive park, children activities, family entertainment center, nature park, kids activities, family destination, Parkland Florida",
}: StructuredDataProps) {
  useEffect(() => {
    // Parse location for address
    const [city, state] = location.split(",").map((s) => s.trim());

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://greenlandvillage.netlify.app",
      name: siteName,
      description,
      url: "https://greenlandvillage.netlify.app",
      email,
      address: {
        "@type": "PostalAddress",
        addressLocality: city || "Parkland",
        addressRegion: state || "FL",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.3101",
        longitude: "-80.2373",
      },
      // Note: Opening hours omitted - business not yet open (Coming 2025)
      priceRange: "$$",
      image,
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "26.3101",
          longitude: "-80.2373",
        },
        geoRadius: "50000",
      },
      keywords,
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [siteName, description, email, location, image, keywords]);

  return null;
}
