/**
 * DynamicPage - Route handler for CMS-built pages
 *
 * Loads page content by slug and renders using PageRenderer.
 * Falls back to 404 if page not found.
 */

import { useParams } from "wouter";
import { PageRenderer } from "@/components/PageRenderer";
import { getPageBySlug } from "@/lib/pageLoader";
import NotFound from "./NotFound";

export default function DynamicPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "home";

  const pageData = getPageBySlug(slug);

  if (!pageData) {
    return <NotFound />;
  }

  return <PageRenderer pageData={pageData} />;
}
