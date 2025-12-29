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
  useScroll,
  useTransform,
  ScrollReveal,
  Floating,
  useInView
} from "@/lib/animations";
import { Check, Heart, Send } from "lucide-react";

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

export function RSVPForm({ content, id }: RSVPFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const decorLeftY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const decorRightY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const schema = createRSVPSchema();
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

  if (isSubmitted) {
    return (
      <section id={id} className={`py-24 md:py-32 ${bgColor} overflow-hidden`}>
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className="w-24 h-24 mx-auto bg-[var(--watercolor-sage)] flex items-center justify-center mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <motion.h2
              className="font-script text-5xl md:text-7xl mb-4 text-[var(--soft-charcoal)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              ¡Gracias!
            </motion.h2>
            <motion.p
              className="font-body-regular text-lg md:text-xl text-[var(--stone-grey)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Hemos recibido tu confirmación. ¡Nos vemos en Sevilla!
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id={id} className={`relative py-24 md:py-32 ${bgColor} overflow-hidden`}>
      <Floating duration={8} distance={15}>
        <motion.div
          className="absolute left-0 top-1/2 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url(${getAsset("iconChampagne")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            y: decorLeftY
          }}
        />
      </Floating>

      <Floating duration={7} distance={20} delay={1}>
        <motion.div
          className="absolute right-0 top-1/2 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url(${getAsset("iconChampagne")})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            y: decorRightY,
            scaleX: -1
          }}
        />
      </Floating>

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
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              {content.decorativeIcon === "champagne" && (
                <Floating duration={5} distance={8}>
                  <img src={getAsset("iconChampagne")} alt="" className="h-16 mx-auto mb-6 watercolor-asset" />
                </Floating>
              )}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 text-[var(--soft-charcoal)]">
                {content.title}
              </h2>
              {content.subtitle && (
                <p className="font-body text-lg text-[var(--stone-grey)] mb-4">{content.subtitle}</p>
              )}
              <p className="font-body-regular text-base text-[var(--stone-grey)]">
                {content.formIntro} <span className="font-semibold text-[var(--sevilla-bronze)]">{formattedDeadline}</span>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-center gap-6 mb-12">
              <motion.div className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)]/40" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "right" }} />
              <Heart className="w-5 h-5 text-[var(--rooftop-clay)]" />
              <motion.div className="h-px w-16 md:w-24 bg-[var(--sevilla-bronze)]/40" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "left" }} />
            </div>
          </ScrollReveal>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-[var(--sevilla-bronze)]/20 p-8 md:p-12 shadow-lg relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={isFormInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
              <Label htmlFor="name" className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">NOMBRE COMPLETO *</Label>
              <Input id="name" {...register("name")} className="mt-3 font-body border-[var(--sevilla-bronze)]/30 focus:border-[var(--watercolor-sage)] h-12" placeholder="Tu nombre" />
              {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>}
            </motion.div>

            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={isFormInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
              <Label htmlFor="email" className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">EMAIL *</Label>
              <Input id="email" type="email" {...register("email")} className="mt-3 font-body border-[var(--sevilla-bronze)]/30 focus:border-[var(--watercolor-sage)] h-12" placeholder="tu@email.com" />
              {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
            </motion.div>

            <motion.div className="mb-8" initial={{ opacity: 0, x: -20 }} animate={isFormInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }}>
              <Label className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">¿ASISTIRÁS? *</Label>
              <div className="flex gap-4 mt-3">
                <motion.button type="button" onClick={() => setValue("attending", "yes")} className={`flex-1 py-4 px-6 border-2 font-body-regular ${attending === "yes" ? "border-[var(--watercolor-sage)] bg-[var(--watercolor-sage)]/10" : "border-[var(--sevilla-bronze)]/30 hover:border-[var(--sevilla-bronze)]/50"}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <span className="flex items-center justify-center gap-2">{attending === "yes" && <Check className="w-4 h-4" />}Sí, asistiré</span>
                </motion.button>
                <motion.button type="button" onClick={() => setValue("attending", "no")} className={`flex-1 py-4 px-6 border-2 font-body-regular ${attending === "no" ? "border-[var(--sevilla-bronze)] bg-[var(--sevilla-bronze)]/10" : "border-[var(--sevilla-bronze)]/30 hover:border-[var(--sevilla-bronze)]/50"}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>No podré asistir</motion.button>
              </div>
              {errors.attending && <p className="text-red-600 text-sm mt-2">{errors.attending.message}</p>}
            </motion.div>

            {attending === "yes" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.5 }}>
                {content.mealOptions && content.mealOptions.length > 0 && (
                  <div className="mb-8">
                    <Label htmlFor="mealChoice" className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">SELECCIÓN DE COMIDA</Label>
                    <select id="mealChoice" {...register("mealChoice")} className="mt-3 w-full p-3 border border-[var(--sevilla-bronze)]/30 font-body bg-white h-12">
                      <option value="">Selecciona una opción</option>
                      {content.mealOptions.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
                    </select>
                  </div>
                )}
                {content.askDietaryRestrictions && (
                  <div className="mb-8">
                    <Label htmlFor="dietaryRestrictions" className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">ALERGIAS O RESTRICCIONES ALIMENTARIAS</Label>
                    <Textarea id="dietaryRestrictions" {...register("dietaryRestrictions")} className="mt-3 font-body border-[var(--sevilla-bronze)]/30 min-h-[100px]" placeholder="Déjanos saber si tienes alguna alergia" />
                  </div>
                )}
                {content.askPlusOne && (
                  <div className="mb-8">
                    <Label htmlFor="plusOne" className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">NOMBRE DE TU ACOMPAÑANTE (OPCIONAL)</Label>
                    <Input id="plusOne" {...register("plusOne")} className="mt-3 font-body border-[var(--sevilla-bronze)]/30 h-12" placeholder="Nombre de tu acompañante" />
                  </div>
                )}
                <div className="mb-8">
                  <Label htmlFor="message" className="font-serif text-sm text-[var(--soft-charcoal)] tracking-wider">MENSAJE PARA LOS NOVIOS (OPCIONAL)</Label>
                  <Textarea id="message" {...register("message")} className="mt-3 font-body border-[var(--sevilla-bronze)]/30 min-h-[120px]" placeholder="Comparte tus felicitaciones..." />
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isFormInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.6 }}>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-[var(--watercolor-sage)] hover:bg-[var(--watercolor-sage)]/90 text-white font-serif tracking-wider py-6 text-base group">
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (<><motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />ENVIANDO...</>) : (<><Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />CONFIRMAR ASISTENCIA</>)}
                </span>
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
