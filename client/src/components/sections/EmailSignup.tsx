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
import { LeafDecoration, SunIcon } from "@/components/illustrations";
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
  "green-gradient": "bg-gradient-to-b from-[#81C784] to-[#4CAF50]",
  cream: "bg-[#FFFEF5]",
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

  const socialProofText = `Join ${settingsContent.socialProofCount} families already signed up!`;
  const bgClass = bgClasses[content.backgroundColor || "green-gradient"];

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
      <div className="absolute top-10 left-10 text-[#2E7D32] opacity-30">
        <LeafDecoration className="w-16 h-16" />
      </div>
      <div className="absolute bottom-10 right-10 w-20 h-20 text-[#FFC107] opacity-40">
        <SunIcon className="w-full h-full" />
      </div>

      <div className="container max-w-2xl relative">
        <div className="text-center mb-10">
          <div className="inline-block bg-[#1B5E20] rounded-2xl px-8 py-3 mb-4">
            <h2 className="text-2xl md:text-4xl text-[#FFC107] font-heading">
              {content.titleEmoji && `${content.titleEmoji} `}{content.title}
            </h2>
          </div>
          <p className="text-lg text-white mb-4 font-body">
            {content.description}
          </p>
          {/* Social Proof */}
          {content.showSocialProof !== false && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#FFC107] border-2 border-white flex items-center justify-center text-sm">👨</div>
                <div className="w-8 h-8 rounded-full bg-[#4CAF50] border-2 border-white flex items-center justify-center text-sm">👩</div>
                <div className="w-8 h-8 rounded-full bg-[#1B5E20] border-2 border-white flex items-center justify-center text-sm">👦</div>
              </div>
              <span className="text-white font-semibold text-sm font-body">
                {socialProofText}
              </span>
            </div>
          )}
        </div>

        {success ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl text-center border-4 border-[#1B5E20] animate-[scaleIn_0.5s_ease-out_forwards]">
            <div className="w-20 h-20 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1B5E20] mb-2 font-heading">
              🎉 {content.successTitle}
            </h3>
            <p className="text-[#2E7D32] font-body">
              {content.successMessage} We can't wait to welcome you in {settingsContent.openingYear}!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 shadow-xl space-y-6 border-4 border-[#1B5E20]"
          >
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-[#1B5E20] font-bold text-lg font-heading"
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50] text-lg py-3"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[#1B5E20] font-bold text-lg font-heading"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50] text-lg py-3"
                required
              />
            </div>

            {content.showSegmentation !== false && (
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-[#1B5E20] font-bold text-lg font-heading"
                >
                  I am a: (optional)
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="border-2 border-[#4CAF50] rounded-xl focus:border-[#1B5E20] focus:ring-[#4CAF50] text-lg py-3">
                    <SelectValue placeholder="Select an option" />
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
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl font-body">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={fullSubscribe.isPending}
              className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold py-6 text-xl rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 border-4 border-[#1B5E20] font-heading"
            >
              {fullSubscribe.isPending ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-6 w-6" />
                  {content.buttonText} 🌿
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
