import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import headerContent from "@/content/header.json";

interface HeaderProps {
  onJoinClick: () => void;
}

export function Header({ onJoinClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation - supports both page links and anchor links
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // Check if it's an anchor on the current page (e.g., "#section")
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Check if it's a link to another page with anchor (e.g., "/#section")
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";

      // If we're already on the target page, just scroll to the section
      if (location === targetPath || (location === "/" && targetPath === "/")) {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to the page, then scroll to the section
        setLocation(targetPath);
        // Use setTimeout to wait for page to render before scrolling
        setTimeout(() => {
          const element = document.querySelector(`#${hash}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
      return;
    }

    // Plain page navigation (e.g., "/invitados")
    if (href !== location) {
      setLocation(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLocation("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-warm)]/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo/Title */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2"
          >
            <span className="font-script text-2xl md:text-3xl text-[var(--dusty-rose)]">
              V & P
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {headerContent.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="font-sans text-sm text-[var(--text-secondary)] hover:text-[var(--dusty-rose)] px-4 py-2 transition-colors uppercase tracking-wider"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={onJoinClick}
              className="ml-2 btn-primary"
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
              <X className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg rounded-lg p-4 mb-4 border border-[var(--border-light)]">
            {headerContent.navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left py-3 px-4 text-[var(--text-secondary)] font-sans hover:bg-[var(--bg-subtle)] hover:text-[var(--dusty-rose)] transition-colors uppercase tracking-wider text-sm rounded"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => {
                onJoinClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-3 btn-primary"
            >
              {headerContent.ctaButtonText}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
