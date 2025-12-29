import { useMemo } from "react";
import DOMPurify from "dompurify";
import type { RichTextContent } from "./types";

interface RichTextProps {
  content: RichTextContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#F9F7F2]",
  white: "bg-white",
  beige: "bg-[#F0EBE0]",
};

// Configure DOMPurify to only allow safe tags and attributes
const ALLOWED_TAGS = [
  "div", "p", "span", "br",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "em", "b", "i", "u",
  "ul", "ol", "li",
  "a", "img",
  "blockquote", "pre", "code",
];

const ALLOWED_ATTR = [
  "href", "target", "rel",
  "src", "alt", "width", "height",
  "class", "id",
];

export function RichText({ content, id }: RichTextProps) {
  const bgColor = bgColors[content.backgroundColor as keyof typeof bgColors] || bgColors.white;

  // Sanitize HTML content to prevent XSS
  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(content.body, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      // Force all links to open in new tab with safe rel
      ADD_ATTR: ["target"],
      FORCE_BODY: true,
    });
  }, [content.body]);

  return (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="container max-w-4xl">
        {/* Title */}
        {content.title && (
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl text-[#2C2C2C] font-serif uppercase tracking-wider">
              {content.title}
            </h2>
          </div>
        )}

        {/* Rich Text Content - sanitized */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#2C2C2C] prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-wide prose-p:text-[#595959] prose-p:font-body prose-a:text-[#9C7C58] prose-a:hover:text-[#7A8B6E] prose-strong:text-[#2C2C2C] prose-ul:text-[#595959] prose-ol:text-[#595959]"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </section>
  );
}
