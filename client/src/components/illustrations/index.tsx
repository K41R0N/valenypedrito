// Wedding illustrations - elegant, romantic decorations
// These SVG components maintain a classic, refined aesthetic matching the Andalusian Romance theme

export const SunIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="50" cy="50" r="40" />
  </svg>
);

export const WavyDivider = ({
  flip = false,
  color = "#F9F7F2",
}: {
  flip?: boolean;
  color?: string;
}) => (
  <svg
    viewBox="0 0 1440 120"
    className={`w-full h-auto ${flip ? "rotate-180" : ""}`}
    preserveAspectRatio="none"
    fill={color}
  >
    <path d="M0,64 C288,120 576,0 864,64 C1152,128 1296,32 1440,64 L1440,120 L0,120 Z" />
  </svg>
);

// Elegant olive branch decoration - wedding style
export const OliveBranchDecoration = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none">
    {/* Main branch */}
    <path
      d="M10 20 Q30 18 50 20 Q70 22 90 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Leaves */}
    <ellipse cx="25" cy="15" rx="8" ry="4" fill="currentColor" opacity="0.7" transform="rotate(-20 25 15)" />
    <ellipse cx="40" cy="24" rx="8" ry="4" fill="currentColor" opacity="0.8" transform="rotate(15 40 24)" />
    <ellipse cx="55" cy="16" rx="8" ry="4" fill="currentColor" opacity="0.7" transform="rotate(-15 55 16)" />
    <ellipse cx="70" cy="23" rx="8" ry="4" fill="currentColor" opacity="0.8" transform="rotate(20 70 23)" />
    <ellipse cx="85" cy="17" rx="6" ry="3" fill="currentColor" opacity="0.6" transform="rotate(-10 85 17)" />
  </svg>
);

// Elegant decorative line with dots - for section dividers
export const ElegantDivider = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 20"
    className={className}
    fill="currentColor"
  >
    <circle cx="20" cy="10" r="2" opacity="0.5" />
    <circle cx="40" cy="10" r="1.5" opacity="0.3" />
    <line x1="50" y1="10" x2="150" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="160" cy="10" r="1.5" opacity="0.3" />
    <circle cx="180" cy="10" r="2" opacity="0.5" />
  </svg>
);

// Heart decoration - for romantic touches
export const HeartDecoration = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// Decorative flourish - elegant swirl
export const Flourish = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 15 Q25 5 50 15 Q75 25 95 15" strokeLinecap="round" />
  </svg>
);

// Keep LeafDecoration but make it more elegant (olive-style)
export const LeafDecoration = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} fill="currentColor">
    <ellipse cx="30" cy="30" rx="12" ry="20" opacity="0.6" />
    <ellipse cx="30" cy="30" rx="8" ry="14" />
  </svg>
);

// Keep VineDecoration but make it more elegant
export const VineDecoration = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 50"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M0,25 Q50,10 100,25 T200,25" strokeLinecap="round" />
  </svg>
);

// Remove GoatMascot - not appropriate for wedding
// Export empty component for backwards compatibility
export const GoatMascot = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Empty - removed for wedding theme */}
  </svg>
);
