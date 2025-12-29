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

type PartnershipType =
  | "field-trip"
  | "birthday"
  | "corporate"
  | "community"
  | "sponsorship"
  | "other";

interface FormData {
  name: string;
  email: string;
  organization: string;
  partnershipType: PartnershipType | "";
  message: string;
}

export function PartnershipModal({ open, onOpenChange }: PartnershipModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    partnershipType: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const partnershipMutation = trpc.newsletter.partnershipInquiry.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    // Validate required fields
    if (!formData.name || !formData.email || !formData.partnershipType) {
      setSubmitError("Please fill in all required fields");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Please enter a valid email address");
      return;
    }

    try {
      await partnershipMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        organization: formData.organization || undefined,
        partnershipType: formData.partnershipType as PartnershipType,
        message: formData.message || undefined,
      });
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          organization: "",
          partnershipType: "",
          message: "",
        });
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
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
      <DialogContent className="sm:max-w-lg bg-white border-4 border-[#1B5E20] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl text-[#1B5E20] font-heading">
            🤝 Partnership Inquiry
          </DialogTitle>
          <DialogDescription className="text-[#2E7D32] font-body">
            Interested in hosting an event or partnering with GreenLand Village?
            Fill out the form below and we'll get back to you soon!
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-8 text-center animate-[scaleIn_0.5s_ease-out_forwards]">
            <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1B5E20] mb-2 font-heading">
              Message Sent! 🎉
            </h3>
            <p className="text-[#2E7D32] font-body">
              We'll review your inquiry and get back to you within 2-3 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="partner-name"
                  className="text-[#1B5E20] font-semibold font-body"
                >
                  Your Name *
                </Label>
                <Input
                  id="partner-name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="partner-email"
                  className="text-[#1B5E20] font-semibold font-body"
                >
                  Email Address *
                </Label>
                <Input
                  id="partner-email"
                  type="email"
                  placeholder="you@organization.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="partner-org"
                className="text-[#1B5E20] font-semibold font-body"
              >
                Organization Name
              </Label>
              <Input
                id="partner-org"
                type="text"
                placeholder="Your school, business, or organization"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="partner-type"
                className="text-[#1B5E20] font-semibold font-body"
              >
                What are you interested in? *
              </Label>
              <Select
                value={formData.partnershipType}
                onValueChange={(value) =>
                  setFormData({ ...formData, partnershipType: value as PartnershipType })
                }
              >
                <SelectTrigger className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50]">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="field-trip">🎓 School Field Trip</SelectItem>
                  <SelectItem value="birthday">🎂 Birthday Party</SelectItem>
                  <SelectItem value="corporate">🏢 Corporate Event</SelectItem>
                  <SelectItem value="community">🎪 Community Gathering</SelectItem>
                  <SelectItem value="sponsorship">💼 Sponsorship Opportunity</SelectItem>
                  <SelectItem value="other">✨ Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="partner-message"
                className="text-[#1B5E20] font-semibold font-body"
              >
                Tell us more (optional)
              </Label>
              <Textarea
                id="partner-message"
                placeholder="Estimated group size, preferred dates, special requirements..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50] min-h-[100px]"
              />
            </div>

            {submitError && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl font-body">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              disabled={partnershipMutation.isPending}
              className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 border-2 border-[#1B5E20] font-heading"
            >
              {partnershipMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Inquiry
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
