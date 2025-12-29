import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface LuxuryRSVPContent {
  title?: string;
  subtitle?: string;
  deadline?: string;
  formIntro?: string;
  askDietaryRestrictions?: boolean;
  askPlusOne?: boolean;
  backgroundColor?: "white" | "warm" | "subtle" | "gradient";
}

interface LuxuryRSVPProps {
  content: LuxuryRSVPContent;
  id?: string;
}

type RSVPStatus = "idle" | "submitting" | "success" | "error";

export function LuxuryRSVP({ content, id }: LuxuryRSVPProps) {
  const {
    title = "Confirma Tu Asistencia",
    subtitle = "Por favor ayúdanos a planear este día especial confirmando tu asistencia",
    deadline,
    formIntro = "¡Hola! Cuéntanos si podrás acompañarnos en nuestra boda.",
    askDietaryRestrictions = true,
    askPlusOne = true,
    backgroundColor = "gradient",
  } = content;

  const [status, setStatus] = useState<RSVPStatus>("idle");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
      }).toUpperCase()
    : "1 DE AGOSTO";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const bgClass = {
    white: "bg-section-white",
    warm: "bg-section-warm",
    subtle: "bg-section-subtle",
    gradient: "bg-section-gradient",
  }[backgroundColor];

  return (
    <section ref={sectionRef} id={id} className={`section-wrapper ${bgClass}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="decorative-line" />
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
          <p className="mt-4 text-accent font-sans-semibold text-sm uppercase tracking-wider">
            Responde antes del {formattedDeadline}
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`max-w-xl mx-auto bg-[var(--bg-white)] p-8 md:p-10 rounded-lg border border-[var(--border-light)] shadow-luxury transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[var(--sage-green)]" />
              <h3 className="font-serif text-2xl mb-2">¡Gracias!</h3>
              <p className="text-[var(--text-secondary)]">
                Hemos recibido tu confirmación. ¡Nos vemos en Sevilla!
              </p>
            </div>
          ) : (
            <>
              {/* Form Intro */}
              <p className="text-center text-[var(--text-secondary)] mb-8">
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
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="rsvp" />

                {/* Name */}
                <div>
                  <label className="form-label" htmlFor="name">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-input"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
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
                    <label className="form-label" htmlFor="guests">
                      Número de Acompañantes
                    </label>
                    <select
                      id="guests"
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
                    <label className="form-label" htmlFor="dietary">
                      Restricciones Dietéticas
                    </label>
                    <textarea
                      id="dietary"
                      name="dietary"
                      rows={2}
                      className="form-input resize-none"
                      placeholder="Alergias, vegetariano, vegano, etc."
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="form-label" htmlFor="message">
                    Mensaje para los Novios (opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
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
          )}
        </div>
      </div>
    </section>
  );
}
