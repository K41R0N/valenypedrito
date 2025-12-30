import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface RSVPFormProps {
  formIntro?: string;
  askDietaryRestrictions?: boolean;
  askPlusOne?: boolean;
  onSuccess?: () => void;
  compact?: boolean;
}

type RSVPStatus = "idle" | "submitting" | "success" | "error";

export function RSVPForm({
  formIntro = "¡Hola! Cuéntanos si podrás acompañarnos en nuestra boda.",
  askDietaryRestrictions = true,
  askPlusOne = true,
  onSuccess,
  compact = false,
}: RSVPFormProps) {
  const [status, setStatus] = useState<RSVPStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        onSuccess?.();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[var(--sage-green)]" />
        <h3 className="font-serif text-2xl mb-2">¡Gracias!</h3>
        <p className="text-[var(--text-secondary)]">
          Hemos recibido tu confirmación. ¡Nos vemos en Sevilla!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Form Intro */}
      <p className={`text-center text-[var(--text-secondary)] ${compact ? "mb-6" : "mb-8"}`}>
        {formIntro}
      </p>

      {status === "error" && (
        <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>Hubo un error. Por favor intenta de nuevo.</p>
        </div>
      )}

      <form
        ref={formRef}
        name="rsvp"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className={compact ? "space-y-4" : "space-y-6"}
      >
        <input type="hidden" name="form-name" value="rsvp" />

        {/* Name */}
        <div>
          <label className="form-label" htmlFor="rsvp-name">
            Nombre Completo
          </label>
          <input
            type="text"
            id="rsvp-name"
            name="name"
            required
            className="form-input"
            placeholder="Tu nombre"
          />
        </div>

        {/* Email */}
        <div>
          <label className="form-label" htmlFor="rsvp-email">
            Email
          </label>
          <input
            type="email"
            id="rsvp-email"
            name="email"
            required
            className="form-input"
            placeholder="tu@email.com"
          />
        </div>

        {/* Attendance */}
        <div>
          <label className="form-label">¿Asistirás?</label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <label className="relative flex items-center justify-center p-4 border border-[var(--border-light)] rounded-lg cursor-pointer hover:border-[var(--dusty-rose)] transition-colors has-[:checked]:border-[var(--dusty-rose)] has-[:checked]:bg-[rgba(201,169,160,0.05)]">
              <input
                type="radio"
                name="attendance"
                value="yes"
                required
                className="sr-only"
              />
              <span className="font-sans-medium text-[var(--text-primary)]">
                Sí, asistiré
              </span>
            </label>
            <label className="relative flex items-center justify-center p-4 border border-[var(--border-light)] rounded-lg cursor-pointer hover:border-[var(--dusty-rose)] transition-colors has-[:checked]:border-[var(--dusty-rose)] has-[:checked]:bg-[rgba(201,169,160,0.05)]">
              <input
                type="radio"
                name="attendance"
                value="no"
                required
                className="sr-only"
              />
              <span className="font-sans-medium text-[var(--text-primary)]">
                No podré asistir
              </span>
            </label>
          </div>
        </div>

        {/* Plus One */}
        {askPlusOne && (
          <div>
            <label className="form-label" htmlFor="rsvp-guests">
              Número de Acompañantes
            </label>
            <select
              id="rsvp-guests"
              name="guests"
              className="form-input"
            >
              <option value="0">Solo yo</option>
              <option value="1">+1 acompañante</option>
              <option value="2">+2 acompañantes</option>
              <option value="3">+3 acompañantes</option>
            </select>
          </div>
        )}

        {/* Dietary Restrictions */}
        {askDietaryRestrictions && (
          <div>
            <label className="form-label" htmlFor="rsvp-dietary">
              Restricciones Dietéticas
            </label>
            <textarea
              id="rsvp-dietary"
              name="dietary"
              rows={2}
              className="form-input resize-none"
              placeholder="Alergias, vegetariano, vegano, etc."
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label className="form-label" htmlFor="rsvp-message">
            Mensaje para los Novios (opcional)
          </label>
          <textarea
            id="rsvp-message"
            name="message"
            rows={compact ? 2 : 3}
            className="form-input resize-none"
            placeholder="Escríbenos algo especial..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Confirmar Asistencia
            </>
          )}
        </button>
      </form>
    </>
  );
}
