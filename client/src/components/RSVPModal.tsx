import { useEffect } from "react";
import { X } from "lucide-react";
import { useRSVP } from "./RSVPContext";
import { RSVPForm } from "./RSVPForm";

interface RSVPModalProps {
  deadline?: string;
}

export function RSVPModal({ deadline }: RSVPModalProps) {
  const { isModalOpen, closeModal } = useRSVP();

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      }).toUpperCase()
    : "1 DE AGOSTO";

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 text-[var(--text-light)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)] mb-2">
              Confirma Tu Asistencia
            </h2>
            <div className="decorative-line mx-auto" />
            <p className="mt-4 text-[var(--dusty-rose)] font-sans-semibold text-sm uppercase tracking-wider">
              Responde antes del {formattedDeadline}
            </p>
          </div>

          {/* Form */}
          <RSVPForm
            compact
            onSuccess={() => {
              // Keep modal open to show success message for a moment
              setTimeout(closeModal, 2000);
            }}
          />
        </div>
      </div>
    </div>
  );
}
