import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Check, Mail } from "lucide-react";
import { OliveBranchDecoration } from "@/components/illustrations";
import { trpc } from "@/lib/trpc";
import type { EmailSignupContent } from "./types";

// Import content
import settingsContent from "@/content/settings.json";
import audienceSegments from "@/content/audience-segments.json";

interface EmailSignupProps {
  content: EmailSignupContent;
  id?: string;
}

const bgClasses = {
  bronze: "bg-[#9C7C58]",
  cream: "bg-[#F9F7F2]",
  beige: "bg-[#F0EBE0]",
  white: "bg-white",
};

export function EmailSignup({ content, id }: EmailSignupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    category: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const fullSubscribe = trpc.newsletter.subscribeFull.useMutation();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const bgClass = bgClasses[content.backgroundColor as keyof typeof bgClasses] || bgClasses.beige;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await fullSubscribe.mutateAsync({
        email: formData.email,
        firstName: formData.firstName,
        category: (formData.category as "parent" | "school" | "business" | "other") || null,
      });
      setSuccess(true);
      setFormData({ firstName: "", email: "", category: "" });
      // Clear any existing timeout before setting a new one
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setSuccess(false);
        timeoutRef.current = null;
      }, 15000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      id={id}
      className={`py-20 ${bgClass} relative`}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-[#7A8B6E] opacity-30">
        <OliveBranchDecoration className="w-24 h-12" />
      </div>
      <div className="absolute bottom-10 right-10 text-[#7A8B6E] opacity-30 rotate-180">
        <OliveBranchDecoration className="w-24 h-12" />
      </div>

      <div className="container max-w-2xl relative">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl text-[#2C2C2C] font-serif uppercase tracking-wider mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-[#595959] mb-4 font-body">
            {content.description}
          </p>
        </div>

        {success ? (
          <div className="bg-white p-8 shadow-lg text-center border border-[#F0EBE0]">
            <div className="w-20 h-20 bg-[#7A8B6E] flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-2 font-serif uppercase tracking-wide">
              {content.successTitle}
            </h3>
            <p className="text-[#595959] font-body">
              {content.successMessage}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-lg space-y-6 border border-[#F0EBE0]"
          >
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-[#2C2C2C] font-medium text-base font-body"
              >
                Nombre *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Tu nombre"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58] text-lg py-3"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[#2C2C2C] font-medium text-base font-body"
              >
                Correo electrónico *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58] text-lg py-3"
                required
              />
            </div>

            {content.showSegmentation !== false && (
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-[#2C2C2C] font-medium text-base font-body"
                >
                  Categoría (opcional)
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58] text-lg py-3">
                    <SelectValue placeholder="Seleccionar opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceSegments.segments.map((segment) => (
                      <SelectItem key={segment.value} value={segment.value}>
                        {segment.emoji} {segment.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 font-body">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={fullSubscribe.isPending}
              className="w-full bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-medium py-6 text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 font-body"
            >
              {fullSubscribe.isPending ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-6 w-6" />
                  {content.buttonText}
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
