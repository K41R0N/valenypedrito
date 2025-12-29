import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getAsset } from "@/lib/assets";
import type { RSVPFormContent } from "./types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface RSVPFormProps {
  content: RSVPFormContent;
  id?: string;
}

const createRSVPSchema = (content: RSVPFormContent) =>
  z.object({
    name: z.string().min(2, "Por favor ingresa tu nombre completo"),
    email: z.string().email("Por favor ingresa un email válido"),
    attending: z.enum(["yes", "no"], { required_error: "Por favor selecciona una opción" }),
    mealChoice: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
    plusOne: z.string().optional(),
    message: z.string().optional(),
  });

export function RSVPForm({ content, id }: RSVPFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = createRSVPSchema(content);
  type RSVPFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(schema),
  });

  const attending = watch("attending");

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);

    try {
      // Netlify Forms submission
      const formData = new FormData();
      formData.append("form-name", "rsvp");
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, String(value));
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("¡Gracias por confirmar tu asistencia!");
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      toast.error("Hubo un error. Por favor intenta de nuevo.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgColorMap = {
    cream: "bg-[var(--antique-cream)]",
    beige: "bg-[var(--warm-beige)]",
    white: "bg-white",
  };

  const bgColor = bgColorMap[content.backgroundColor || "beige"];

  const formattedDeadline = content.rsvpDeadline
    ? format(parseISO(content.rsvpDeadline), "d 'de' MMMM", { locale: es })
    : "";

  if (isSubmitted) {
    return (
      <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {content.decorativeIcon === "champagne" && (
              <img src={getAsset("iconChampagne")} alt="" className="h-20 mx-auto mb-6 watercolor-asset" />
            )}
            <h2 className="font-script text-5xl md:text-6xl mb-4 text-[var(--soft-charcoal)]">¡Gracias!</h2>
            <p className="font-body-regular text-lg text-[var(--stone-grey)]">
              Hemos recibido tu confirmación. ¡Nos vemos en Sevilla!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColor}`}>
      {/* Hidden Netlify Form */}
      <form name="rsvp" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <select name="attending">
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
        <input type="text" name="mealChoice" />
        <textarea name="dietaryRestrictions" />
        <input type="text" name="plusOne" />
        <textarea name="message" />
      </form>

      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {content.decorativeIcon === "champagne" && (
              <img src={getAsset("iconChampagne")} alt="" className="h-16 mx-auto mb-6 watercolor-asset" />
            )}
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--soft-charcoal)]">{content.title}</h2>
            {content.subtitle && (
              <p className="font-body text-lg text-[var(--stone-grey)] mb-4">{content.subtitle}</p>
            )}
            <p className="font-body-regular text-base text-[var(--stone-grey)]">
              {content.formIntro} <span className="font-semibold">{formattedDeadline}</span>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-[var(--sevilla-bronze)]/30 p-8 md:p-10 rounded-sm shadow-sm"
          >
            {/* Name */}
            <div className="mb-6">
              <Label htmlFor="name" className="font-body-regular text-[var(--soft-charcoal)]">
                Nombre Completo *
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="mt-2 font-body border-[var(--sevilla-bronze)]/50"
                placeholder="Tu nombre"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-6">
              <Label htmlFor="email" className="font-body-regular text-[var(--soft-charcoal)]">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="mt-2 font-body border-[var(--sevilla-bronze)]/50"
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Attending */}
            <div className="mb-6">
              <Label htmlFor="attending" className="font-body-regular text-[var(--soft-charcoal)]">
                ¿Asistirás? *
              </Label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setValue("attending", "yes")}
                  className={`flex-1 py-3 px-4 rounded-sm border-2 transition-all font-body-regular ${
                    attending === "yes"
                      ? "border-[var(--watercolor-sage)] bg-[var(--watercolor-sage)]/10 text-[var(--soft-charcoal)]"
                      : "border-[var(--sevilla-bronze)]/30 hover:border-[var(--sevilla-bronze)]/50"
                  }`}
                >
                  Sí, asistiré ✓
                </button>
                <button
                  type="button"
                  onClick={() => setValue("attending", "no")}
                  className={`flex-1 py-3 px-4 rounded-sm border-2 transition-all font-body-regular ${
                    attending === "no"
                      ? "border-[var(--sevilla-bronze)] bg-[var(--sevilla-bronze)]/10 text-[var(--soft-charcoal)]"
                      : "border-[var(--sevilla-bronze)]/30 hover:border-[var(--sevilla-bronze)]/50"
                  }`}
                >
                  No podré asistir
                </button>
              </div>
              {errors.attending && <p className="text-red-600 text-sm mt-1">{errors.attending.message}</p>}
            </div>

            {/* Conditional fields - only if attending */}
            {attending === "yes" && (
              <>
                {/* Meal Choice */}
                {content.mealOptions && content.mealOptions.length > 0 && (
                  <div className="mb-6">
                    <Label htmlFor="mealChoice" className="font-body-regular text-[var(--soft-charcoal)]">
                      Selección de Comida
                    </Label>
                    <select
                      id="mealChoice"
                      {...register("mealChoice")}
                      className="mt-2 w-full p-2 border border-[var(--sevilla-bronze)]/50 rounded-sm font-body bg-white"
                    >
                      <option value="">Selecciona una opción</option>
                      {content.mealOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Dietary Restrictions */}
                {content.askDietaryRestrictions && (
                  <div className="mb-6">
                    <Label htmlFor="dietaryRestrictions" className="font-body-regular text-[var(--soft-charcoal)]">
                      Alergias o Restricciones Alimentarias
                    </Label>
                    <Textarea
                      id="dietaryRestrictions"
                      {...register("dietaryRestrictions")}
                      className="mt-2 font-body border-[var(--sevilla-bronze)]/50"
                      placeholder="Déjanos saber si tienes alguna alergia o restricción alimentaria"
                      rows={3}
                    />
                  </div>
                )}

                {/* Plus One */}
                {content.askPlusOne && (
                  <div className="mb-6">
                    <Label htmlFor="plusOne" className="font-body-regular text-[var(--soft-charcoal)]">
                      Nombre de tu Acompañante (opcional)
                    </Label>
                    <Input
                      id="plusOne"
                      {...register("plusOne")}
                      className="mt-2 font-body border-[var(--sevilla-bronze)]/50"
                      placeholder="Nombre de tu acompañante"
                    />
                  </div>
                )}

                {/* Message */}
                <div className="mb-6">
                  <Label htmlFor="message" className="font-body-regular text-[var(--soft-charcoal)]">
                    Mensaje para los Novios (opcional)
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    className="mt-2 font-body border-[var(--sevilla-bronze)]/50"
                    placeholder="Comparte tus felicitaciones o cualquier pregunta..."
                    rows={4}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--watercolor-sage)] hover:bg-[var(--watercolor-sage)]/90 text-white font-body-regular py-6 text-lg"
            >
              {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
