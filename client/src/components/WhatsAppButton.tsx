import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

/**
 * WhatsApp Contact Button
 * Opens WhatsApp chat with pre-filled message
 *
 * @param phoneNumber - WhatsApp number with country code (e.g., "+34612345678")
 * @param message - Optional pre-filled message
 */
export function WhatsAppButton({ phoneNumber, message, className }: WhatsAppButtonProps) {
  const handleClick = () => {
    // Remove any non-numeric characters except +
    const cleanedNumber = phoneNumber.replace(/[^\d+]/g, "");

    // Build WhatsApp URL
    const encodedMessage = message ? encodeURIComponent(message) : "";
    const whatsappUrl = `https://wa.me/${cleanedNumber}${message ? `?text=${encodedMessage}` : ""}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-[#25D366] hover:bg-[#128C7E] text-white font-body-regular ${className || ""}`}
    >
      <Phone className="w-4 h-4 mr-2" />
      Contactar por WhatsApp
    </Button>
  );
}

/**
 * Floating WhatsApp Button (Fixed position)
 */
export function FloatingWhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const handleClick = () => {
    const cleanedNumber = phoneNumber.replace(/[^\d+]/g, "");
    const encodedMessage = message ? encodeURIComponent(message) : "";
    const whatsappUrl = `https://wa.me/${cleanedNumber}${message ? `?text=${encodedMessage}` : ""}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <Phone className="w-6 h-6" />
    </button>
  );
}
