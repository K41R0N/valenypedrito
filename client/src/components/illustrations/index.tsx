// Brand illustrations extracted from the GreenLand Village logo style
// These SVG components maintain the playful, organic, hand-drawn aesthetic

export const SunIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="50" cy="50" r="40" />
  </svg>
);

export const WavyDivider = ({
  flip = false,
  color = "#2E7D32",
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

export const LeafDecoration = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} fill="currentColor">
    <path
      d="M30 5c-8 0-15 7-15 15 0 12 15 35 15 35s15-23 15-35c0-8-7-15-15-15z"
      opacity="0.6"
    />
    <path d="M30 10c-5 0-10 5-10 10 0 8 10 25 10 25s10-17 10-25c0-5-5-10-10-10z" />
  </svg>
);

export const VineDecoration = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 50"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M0,25 Q50,0 100,25 T200,25" strokeLinecap="round" />
    <circle cx="30" cy="15" r="5" fill="currentColor" />
    <circle cx="100" cy="25" r="5" fill="currentColor" />
    <circle cx="170" cy="15" r="5" fill="currentColor" />
  </svg>
);

export const GoatMascot = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Body */}
    <ellipse
      cx="50"
      cy="55"
      rx="25"
      ry="20"
      fill="white"
      stroke="#1B5E20"
      strokeWidth="2"
    />
    {/* Head */}
    <circle cx="50" cy="30" r="15" fill="white" stroke="#1B5E20" strokeWidth="2" />
    {/* Left horn */}
    <path d="M38 20 L35 8 L40 18" fill="white" stroke="#1B5E20" strokeWidth="2" />
    {/* Right horn */}
    <path d="M62 20 L65 8 L60 18" fill="white" stroke="#1B5E20" strokeWidth="2" />
    {/* Eyes */}
    <circle cx="44" cy="28" r="2" fill="#1B5E20" />
    <circle cx="56" cy="28" r="2" fill="#1B5E20" />
    {/* Nose */}
    <ellipse cx="50" cy="35" rx="4" ry="3" fill="#FFB6C1" />
    {/* Smile */}
    <path d="M46 38 Q50 42 54 38" fill="none" stroke="#1B5E20" strokeWidth="1.5" />
    {/* Legs */}
    <path d="M30 60 L25 75" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 65 L38 75" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round" />
    <path d="M60 65 L62 75" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round" />
    <path d="M70 60 L75 75" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round" />
    {/* Tail */}
    <path
      d="M75 50 Q85 45 80 55 Q90 52 85 60"
      fill="white"
      stroke="#1B5E20"
      strokeWidth="1.5"
    />
  </svg>
);
