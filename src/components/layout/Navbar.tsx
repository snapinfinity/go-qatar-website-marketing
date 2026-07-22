"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { getDeviceStoreLink } from "@/lib/storeLinks";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "News", href: "#news" },
  { label: "Download", href: "#download" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDownload = () => {
    const storeLink = getDeviceStoreLink();
    if (storeLink) {
      window.open(storeLink, "_blank", "noopener,noreferrer");
    } else {
      scrollToSection("download");
    }
  };

  function scrollToSection(id: string) {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname === "/") {
      e.preventDefault();
      const id = href.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // After navigating from another page to /#section, scroll to the target
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg border border-white/15 overflow-hidden flex-shrink-0">
            <Image
              src="/logos/app_icon.svg"
              alt=""
              width={28}
              height={28}
              className="w-full h-full"
            />
          </div>
          <Image
            src="/logos/go_qatar_text.svg"
            alt="Go Qatar — home"
            width={80}
            height={16}
            className="brightness-0 invert"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={pathname === "/" ? link.href : `/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button onClick={handleDownload} variant="primary" size="sm">
            Download App
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0C0C0C]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={pathname === "/" ? link.href : `/${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2">
            <Button onClick={handleDownload} variant="primary" className="w-full">
              Download App
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
