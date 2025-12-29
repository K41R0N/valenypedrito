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

  const handleNavClick = (item: (typeof headerContent.navItems)[0] & { isModal?: boolean }) => {
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
        ? "bg-[#F9F7F2]/95 backdrop-blur-sm shadow-sm"
        : "bg-transparent"
        }`}
    >
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#9C7C58] focus:text-white focus:px-4 focus:py-2"
      >
        Ir al contenido principal
      </a>

      <div className="container">
        <div className="flex items-center justify-between py-2 md:py-4">
          {/* Logo/Title */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2"
          >
            <span className="font-script text-3xl md:text-4xl text-[#9C7C58]">
              V & P
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {headerContent.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="font-body text-[#595959] hover:text-[#9C7C58] px-4 py-2 transition-all duration-300 uppercase tracking-wide text-sm"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={onJoinClick}
              className="bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-body px-6 transition-all duration-300"
            >
              {headerContent.ctaButtonText}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8 text-[#2C2C2C]" />
            ) : (
              <Menu className="w-8 h-8 text-[#2C2C2C]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg p-4 mb-4 border border-[#F0EBE0]">
            {headerContent.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-3 px-4 text-[#595959] font-body hover:bg-[#F9F7F2] transition-colors uppercase tracking-wide text-sm"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                onJoinClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-3 bg-[#9C7C58] hover:bg-[#7A8B6E] text-white font-body"
            >
              {headerContent.ctaButtonText}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
