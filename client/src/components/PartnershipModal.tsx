import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Check, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface PartnershipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type InquiryType =
  | "accommodation"
  | "transport"
  | "dietary"
  | "children"
  | "other";

interface FormData {
  name: string;
  email: string;
  inquiryType: InquiryType | "";
  message: string;
}

export function PartnershipModal({ open, onOpenChange }: PartnershipModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const partnershipMutation = trpc.newsletter.partnershipInquiry.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.inquiryType) {
      setSubmitError("Por favor completa todos los campos requeridos");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Por favor ingresa un correo electrónico válido");
      return;
    }

    try {
      await partnershipMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        organization: undefined,
        partnershipType: formData.inquiryType as any,
        message: formData.message || undefined,
      });
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          inquiryType: "",
          message: "",
        });
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Algo salió mal. Por favor intenta de nuevo."
      );
    }
  };

  const handleClose = () => {
    if (!partnershipMutation.isPending) {
      onOpenChange(false);
      // Reset state when closing
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmitError("");
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-white border border-[#F0EBE0]">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl text-[#2C2C2C] font-serif uppercase tracking-wide">
            Consultas
          </DialogTitle>
          <DialogDescription className="text-[#595959] font-body">
            ¿Tienes alguna pregunta sobre la boda? Completa el formulario y te responderemos pronto.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#7A8B6E] flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2C2C2C] mb-2 font-serif">
              Mensaje enviado
            </h3>
            <p className="text-[#595959] font-body">
              Te responderemos en los próximos días.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="partner-name"
                  className="text-[#2C2C2C] font-medium font-body"
                >
                  Tu nombre *
                </Label>
                <Input
                  id="partner-name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="partner-email"
                  className="text-[#2C2C2C] font-medium font-body"
                >
                  Correo electrónico *
                </Label>
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="partner-type"
                className="text-[#2C2C2C] font-medium font-body"
              >
                Tipo de consulta *
              </Label>
              <Select
                value={formData.inquiryType}
                onValueChange={(value) =>
                  setFormData({ ...formData, inquiryType: value as InquiryType })
                }
              >
                <SelectTrigger className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58]">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accommodation">Alojamiento</SelectItem>
                  <SelectItem value="transport">Transporte</SelectItem>
                  <SelectItem value="dietary">Restricciones alimentarias</SelectItem>
                  <SelectItem value="children">Consulta sobre niños</SelectItem>
                  <SelectItem value="other">Otra consulta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="partner-message"
                className="text-[#2C2C2C] font-medium font-body"
              >
                Tu mensaje (opcional)
              </Label>
              <Textarea
                id="partner-message"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="border border-[#F0EBE0] focus:border-[#9C7C58] focus:ring-[#9C7C58] min-h-[100px]"
              />
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 font-body">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              disabled={partnershipMutation.isPending}
              className="w-full bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-body py-6 text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            >
              {partnershipMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar consulta
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
