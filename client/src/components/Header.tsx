import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import headerContent from "@/content/header.json";

interface HeaderProps {
  onJoinClick: () => void;
  onPartnershipClick: () => void;
}

export function Header({ onJoinClick, onPartnershipClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: (typeof headerContent.navItems)[0]) => {
    if (item.isModal) {
      onPartnershipClick();
    } else if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-sm shadow-md"
        : "bg-transparent"
        }`}
    >
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-forest-green focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>

      <div className="container">
        <div className="flex items-center justify-between py-2 md:py-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.svg"
              alt="Greenland Village"
              className="h-20 md:h-32 w-auto transition-transform hover:scale-105 duration-300 relative z-50"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {headerContent.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="font-bold text-[#1B5E20] hover:bg-white/50 px-4 py-2 rounded-full transition-all duration-300"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={onJoinClick}
              className="bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold rounded-full px-6 border-2 border-[#1B5E20] shadow-lg hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              {headerContent.ctaButtonText}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X
                className="w-8 h-8 text-[#1B5E20]"
              />
            ) : (
              <Menu
                className="w-8 h-8 text-[#1B5E20]"
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white rounded-2xl shadow-xl p-4 mb-4 animate-[fadeInUp_0.3s_ease-out_forwards]">
            {headerContent.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-3 px-4 text-[#1B5E20] font-semibold hover:bg-[#E8F5E9] rounded-xl transition-colors"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                onJoinClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-3 bg-[#FFC107] hover:bg-[#FFD54F] text-[#1B5E20] font-bold rounded-full border-2 border-[#1B5E20]"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              {headerContent.ctaButtonText}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
