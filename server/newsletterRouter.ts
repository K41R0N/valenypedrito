import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

/**
 * Newsletter Router
 *
 * Handles email newsletter subscriptions via Mailchimp API.
 *
 * Setup Instructions:
 * 1. Create a Mailchimp account at https://mailchimp.com
 * 2. Create an Audience (list) for GreenLand Village subscribers
 * 3. Get your API key from Account > Extras > API Keys
 * 4. Get your Audience ID from Audience > Settings > Audience name and defaults
 * 5. Get your server prefix from your API key (e.g., "us21" from "xxx-us21")
 * 6. Set environment variables:
 *    - MAILCHIMP_API_KEY=your-api-key
 *    - MAILCHIMP_AUDIENCE_ID=your-audience-id
 *    - MAILCHIMP_SERVER_PREFIX=us21 (or your prefix)
 */

// Validation schemas
const heroSubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const fullSubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  category: z
    .enum(["parent", "school", "business", "other"])
    .optional()
    .nullable(),
});

const partnershipInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  partnershipType: z.enum([
    "field-trip",
    "birthday",
    "corporate",
    "community",
    "sponsorship",
    "other",
  ]),
  message: z.string().optional(),
});

// Helper to check if Mailchimp is configured
function isMailchimpConfigured(): boolean {
  return !!(
    process.env.MAILCHIMP_API_KEY &&
    process.env.MAILCHIMP_AUDIENCE_ID &&
    process.env.MAILCHIMP_SERVER_PREFIX
  );
}

// Helper to make Mailchimp API requests
async function mailchimpRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH",
  body?: object
) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !serverPrefix) {
    throw new Error("Mailchimp not configured");
  }

  const response = await fetch(
    `https://${serverPrefix}.api.mailchimp.com/3.0${endpoint}`,
    {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Mailchimp API error: ${response.status}`);
  }

  return response.json();
}

// Add subscriber to Mailchimp
async function addSubscriber(
  email: string,
  firstName?: string,
  category?: string | null
) {
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!audienceId) {
    throw new Error("Mailchimp audience ID not configured");
  }

  // Create subscriber data
  const subscriberData: {
    email_address: string;
    status: string;
    merge_fields?: { FNAME?: string };
    tags?: string[];
  } = {
    email_address: email,
    status: "subscribed",
  };

  if (firstName) {
    subscriberData.merge_fields = { FNAME: firstName };
  }

  if (category) {
    subscriberData.tags = [category];
  }

  try {
    await mailchimpRequest(
      `/lists/${audienceId}/members`,
      "POST",
      subscriberData
    );
    return { success: true };
  } catch (error: unknown) {
    // Check if member already exists
    if (
      error instanceof Error &&
      error.message.includes("Member Exists")
    ) {
      return { success: true, alreadySubscribed: true };
    }
    throw error;
  }
}

export const newsletterRouter = router({
  /**
   * Simple subscription from hero form (email only)
   */
  subscribeHero: publicProcedure
    .input(heroSubscribeSchema)
    .mutation(async ({ input }) => {
      if (!isMailchimpConfigured()) {
        // Development fallback - log and return success
        console.log("[Newsletter] Hero subscription (dev mode):", input.email);
        return {
          success: true,
          message: "Subscription recorded (Mailchimp not configured)",
        };
      }

      try {
        const result = await addSubscriber(input.email);
        return {
          success: true,
          message: result.alreadySubscribed
            ? "You're already subscribed!"
            : "Welcome to the GreenLand Village community!",
        };
      } catch (error) {
        console.error("[Newsletter] Subscription error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to subscribe. Please try again later.",
        });
      }
    }),

  /**
   * Full subscription with name and category (bottom form)
   */
  subscribeFull: publicProcedure
    .input(fullSubscribeSchema)
    .mutation(async ({ input }) => {
      if (!isMailchimpConfigured()) {
        // Development fallback
        console.log("[Newsletter] Full subscription (dev mode):", {
          email: input.email,
          firstName: input.firstName,
          category: input.category,
        });
        return {
          success: true,
          message: "Subscription recorded (Mailchimp not configured)",
        };
      }

      try {
        const result = await addSubscriber(
          input.email,
          input.firstName,
          input.category
        );
        return {
          success: true,
          message: result.alreadySubscribed
            ? "You're already subscribed!"
            : "Welcome to the GreenLand Village community!",
        };
      } catch (error) {
        console.error("[Newsletter] Subscription error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to subscribe. Please try again later.",
        });
      }
    }),

  /**
   * Partnership inquiry form
   * TODO: This could be extended to send an email notification
   * or store in a database for follow-up
   */
  partnershipInquiry: publicProcedure
    .input(partnershipInquirySchema)
    .mutation(async ({ input }) => {
      // Log the inquiry for now
      console.log("[Partnership] New inquiry:", {
        name: input.name,
        email: input.email,
        organization: input.organization,
        type: input.partnershipType,
        message: input.message,
      });

      // TODO: Add to Mailchimp with "partnership" tag
      // TODO: Send notification email to owner
      // TODO: Store in database for CRM follow-up

      if (isMailchimpConfigured()) {
        try {
          await addSubscriber(input.email, input.name, "partnership-inquiry");
        } catch (error) {
          console.error("[Partnership] Mailchimp error:", error);
          // Don't fail the inquiry if Mailchimp fails
        }
      }

      return {
        success: true,
        message:
          "Thank you for your inquiry! We'll get back to you within 2-3 business days.",
      };
    }),
});

export type NewsletterRouter = typeof newsletterRouter;
