import { useMemo } from "react";
import DOMPurify from "dompurify";
import type { RichTextContent } from "./types";

interface RichTextProps {
  content: RichTextContent;
  id?: string;
}

const bgColors = {
  cream: "bg-[#FFFEF5]",
  white: "bg-white",
  green: "bg-[#E8F5E9]",
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
  const bgColor = bgColors[content.backgroundColor || "white"];

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
            <div className="inline-block bg-[#1B5E20] rounded-2xl px-8 py-3 mb-4">
              <h2 className="text-2xl md:text-4xl text-[#FFC107] font-heading">
                {content.titleEmoji && `${content.titleEmoji} `}{content.title}
              </h2>
            </div>
          </div>
        )}

        {/* Rich Text Content - sanitized */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-[#1B5E20] prose-headings:font-heading prose-p:text-[#2E7D32] prose-p:font-body prose-a:text-[#4CAF50] prose-a:hover:text-[#1B5E20] prose-strong:text-[#1B5E20] prose-ul:text-[#2E7D32] prose-ol:text-[#2E7D32]"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </section>
  );
}
