import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getAsset } from "@/lib/assets";
import type { RSVPFormContent } from "./types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  motion,
  useInView
} from "@/lib/animations";
import { Check, X, ArrowRight, Send, Sparkles } from "lucide-react";

interface RSVPFormProps {
  content: RSVPFormContent;
  id?: string;
}

const createRSVPSchema = () =>
  z.object({
    name: z.string().min(2, "Por favor ingresa tu nombre completo"),
    email: z.string().email("Por favor ingresa un email válido"),
    attending: z.enum(["yes", "no"], { required_error: "Por favor selecciona una opción" }),
    mealChoice: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
    plusOne: z.string().optional(),
    message: z.string().optional(),
  });

// Step indicator
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1 flex-1 ${i < currentStep ? "bg-[var(--watercolor-sage)]" : i === currentStep ? "bg-[var(--sevilla-bronze)]" : "bg-[var(--sevilla-bronze)]/20"}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          style={{ transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}

export function RSVPForm({ content, id }: RSVPFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

  const schema = createRSVPSchema();
  type RSVPFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(schema),
  });

  const attending = watch("attending");
  const name = watch("name");

  // Calculate total steps based on attending status
  const getSteps = () => {
    const baseSteps = ["intro", "contact", "attending"];
    if (attending === "yes") {
      const additionalSteps = [];
      if (content.mealOptions?.length) additionalSteps.push("meal");
      if (content.askDietaryRestrictions) additionalSteps.push("dietary");
      if (content.askPlusOne) additionalSteps.push("plusOne");
      additionalSteps.push("message");
      return [...baseSteps, ...additionalSteps, "confirm"];
    }
    return [...baseSteps, "confirm"];
  };

  const steps = getSteps();
  const totalSteps = steps.length;

  const nextStep = async () => {
    // Validate current step before proceeding
    if (steps[currentStep] === "contact") {
      const valid = await trigger(["name", "email"]);
      if (!valid) return;
    }
    if (steps[currentStep] === "attending") {
      const valid = await trigger("attending");
      if (!valid) return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("form-name", "rsvp");
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, String(value));
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
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

  // Success state
  if (isSubmitted) {
    return (
      <section id={id} className={`py-24 md:py-32 ${bgColor} overflow-hidden`}>
        <div className="container">
          <motion.div
            className="max-w-xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Envelope opening animation */}
            <motion.div
              className="relative w-64 h-48 mx-auto mb-12"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 0 }}
            >
              {/* Envelope body */}
              <motion.div
                className="absolute inset-0 bg-white border-2 border-[var(--sevilla-bronze)]/30 shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Letter inside */}
              <motion.div
                className="absolute inset-4 bg-[var(--warm-beige)] flex items-center justify-center"
                initial={{ y: 0 }}
                animate={{ y: -60 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center"
                >
                  <Check className="w-10 h-10 text-[var(--watercolor-sage)] mx-auto mb-2" />
                  <span className="font-script text-2xl text-[var(--sevilla-bronze)]">Confirmado</span>
                </motion.div>
              </motion.div>

              {/* Sparkles */}
              <motion.div
                className="absolute -top-4 -right-4"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <Sparkles className="w-8 h-8 text-[var(--rooftop-clay)]" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="font-script text-5xl md:text-7xl mb-4 text-[var(--soft-charcoal)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              ¡Gracias, {name?.split(" ")[0] || ""}!
            </motion.h2>
            <motion.p
              className="font-body text-lg text-[var(--stone-grey)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Hemos recibido tu confirmación.
              <br />
              <span className="text-[var(--sevilla-bronze)]">¡Nos vemos en Sevilla!</span>
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id={id} className={`relative py-24 md:py-32 ${bgColor} overflow-hidden`}>
      {/* Hidden Netlify form */}
      <form name="rsvp" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <select name="attending"><option value="yes">Sí</option><option value="no">No</option></select>
        <input type="text" name="mealChoice" />
        <textarea name="dietaryRestrictions" />
        <input type="text" name="plusOne" />
        <textarea name="message" />
      </form>

      <div className="container relative z-10">
        {/* Split layout on desktop */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 max-w-6xl mx-auto items-center">

          {/* Left side - Invitation */}
          <motion.div
            className="lg:pr-16 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="font-serif text-xs tracking-[0.5em] text-[var(--stone-grey)] uppercase block mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Confirma tu asistencia
            </motion.span>

            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl mb-6 text-[var(--soft-charcoal)]">
              {content.title}
            </h2>

            <p className="font-body text-lg text-[var(--stone-grey)] mb-6 max-w-md mx-auto lg:mx-0">
              {content.subtitle || "Queremos compartir este momento tan especial contigo."}
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm">
              <span className="font-body text-[var(--stone-grey)]">Responde antes del</span>
              <span className="font-serif text-[var(--sevilla-bronze)] border-b border-[var(--sevilla-bronze)]">{formattedDeadline}</span>
            </div>

            {/* Decorative element */}
            <motion.div
              className="mt-12 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
            >
              <img
                src={getAsset("oliveBranch")}
                alt=""
                className="w-48 watercolor-asset"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Form Card */}
          <motion.div
            ref={cardRef}
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isCardInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Card shadow effect */}
            <div className="absolute -inset-4 bg-[var(--sevilla-bronze)]/5 -z-10" />

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-[var(--sevilla-bronze)]/20 p-8 md:p-12">
              <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

              {/* Step content */}
              <div className="min-h-[280px] flex flex-col">
                {/* Step: Intro */}
                {steps[currentStep] === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col justify-center text-center"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 bg-[var(--watercolor-sage)]/10 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <img src={getAsset("iconChampagne")} alt="" className="w-10 h-10" />
                    </motion.div>
                    <h3 className="font-serif text-2xl text-[var(--soft-charcoal)] mb-3">¡Hola!</h3>
                    <p className="font-body text-[var(--stone-grey)]">
                      Cuéntanos si podrás acompañarnos en nuestra boda.
                    </p>
                  </motion.div>
                )}

                {/* Step: Contact info */}
                {steps[currentStep] === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 space-y-6"
                  >
                    <div>
                      <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">TU NOMBRE</Label>
                      <Input
                        {...register("name")}
                        className="mt-2 font-body border-[var(--sevilla-bronze)]/30 h-12"
                        placeholder="Nombre completo"
                      />
                      {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">TU EMAIL</Label>
                      <Input
                        type="email"
                        {...register("email")}
                        className="mt-2 font-body border-[var(--sevilla-bronze)]/30 h-12"
                        placeholder="tu@email.com"
                      />
                      {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </motion.div>
                )}

                {/* Step: Attending */}
                {steps[currentStep] === "attending" && (
                  <motion.div
                    key="attending"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <h3 className="font-serif text-xl text-[var(--soft-charcoal)] text-center mb-8">
                      ¿Podrás acompañarnos?
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        type="button"
                        onClick={() => {setValue("attending", "yes"); nextStep();}}
                        className={`py-8 border-2 font-body-regular flex flex-col items-center gap-3 ${attending === "yes" ? "border-[var(--watercolor-sage)] bg-[var(--watercolor-sage)]/5" : "border-[var(--sevilla-bronze)]/30 hover:border-[var(--watercolor-sage)]/50"}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-12 h-12 bg-[var(--watercolor-sage)]/10 flex items-center justify-center">
                          <Check className="w-6 h-6 text-[var(--watercolor-sage)]" />
                        </div>
                        <span className="font-serif text-lg">Sí, asistiré</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => {setValue("attending", "no"); nextStep();}}
                        className={`py-8 border-2 font-body-regular flex flex-col items-center gap-3 ${attending === "no" ? "border-[var(--rooftop-clay)] bg-[var(--rooftop-clay)]/5" : "border-[var(--sevilla-bronze)]/30 hover:border-[var(--rooftop-clay)]/50"}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-12 h-12 bg-[var(--rooftop-clay)]/10 flex items-center justify-center">
                          <X className="w-6 h-6 text-[var(--rooftop-clay)]" />
                        </div>
                        <span className="font-serif text-lg">No podré</span>
                      </motion.button>
                    </div>
                    {errors.attending && <p className="text-red-600 text-sm mt-4 text-center">{errors.attending.message}</p>}
                  </motion.div>
                )}

                {/* Step: Meal */}
                {steps[currentStep] === "meal" && content.mealOptions && (
                  <motion.div
                    key="meal"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1"
                  >
                    <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">SELECCIÓN DE MENÚ</Label>
                    <div className="mt-4 space-y-3">
                      {content.mealOptions.map((option) => (
                        <motion.label
                          key={option.value}
                          className="flex items-center p-4 border border-[var(--sevilla-bronze)]/30 cursor-pointer hover:border-[var(--watercolor-sage)]/50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <input
                            type="radio"
                            {...register("mealChoice")}
                            value={option.value}
                            className="mr-4"
                          />
                          <span className="font-body">{option.label}</span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step: Dietary */}
                {steps[currentStep] === "dietary" && (
                  <motion.div
                    key="dietary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1"
                  >
                    <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">
                      RESTRICCIONES ALIMENTARIAS
                    </Label>
                    <Textarea
                      {...register("dietaryRestrictions")}
                      className="mt-3 font-body border-[var(--sevilla-bronze)]/30 min-h-[120px]"
                      placeholder="Cuéntanos si tienes alguna alergia o restricción"
                    />
                  </motion.div>
                )}

                {/* Step: Plus one */}
                {steps[currentStep] === "plusOne" && (
                  <motion.div
                    key="plusOne"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1"
                  >
                    <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">
                      ¿VIENES CON ALGUIEN?
                    </Label>
                    <Input
                      {...register("plusOne")}
                      className="mt-3 font-body border-[var(--sevilla-bronze)]/30 h-12"
                      placeholder="Nombre de tu acompañante (opcional)"
                    />
                  </motion.div>
                )}

                {/* Step: Message */}
                {steps[currentStep] === "message" && (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1"
                  >
                    <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">
                      MENSAJE PARA LOS NOVIOS
                    </Label>
                    <Textarea
                      {...register("message")}
                      className="mt-3 font-body border-[var(--sevilla-bronze)]/30 min-h-[140px]"
                      placeholder="Comparte tus felicitaciones... (opcional)"
                    />
                  </motion.div>
                )}

                {/* Step: Confirm */}
                {steps[currentStep] === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col justify-center text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 border-2 border-[var(--watercolor-sage)] flex items-center justify-center">
                      <Send className="w-8 h-8 text-[var(--watercolor-sage)]" />
                    </div>
                    <h3 className="font-serif text-xl text-[var(--soft-charcoal)] mb-3">¡Todo listo!</h3>
                    <p className="font-body text-[var(--stone-grey)]">
                      {attending === "yes"
                        ? "Gracias por confirmar. ¡Te esperamos en Sevilla!"
                        : "Lamentamos que no puedas acompañarnos."
                      }
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--sevilla-bronze)]/10">
                {currentStep > 0 && steps[currentStep] !== "attending" ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="font-body text-sm text-[var(--stone-grey)] hover:text-[var(--soft-charcoal)]"
                  >
                    ← Anterior
                  </button>
                ) : <div />}

                {steps[currentStep] === "confirm" ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[var(--watercolor-sage)] hover:bg-[var(--watercolor-sage)]/90 text-white px-8 py-3"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <span className="flex items-center gap-2">
                        Enviar <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                ) : steps[currentStep] !== "attending" ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-[var(--soft-charcoal)] text-white px-6 py-3 font-body text-sm"
                    whileHover={{ x: 4 }}
                  >
                    Continuar <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : null}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
