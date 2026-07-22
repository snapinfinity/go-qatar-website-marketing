import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "News", href: "/#news" },
    { label: "Download", href: "/#download" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  Support: [
    { label: "Help Center", href: "/contact?tab=help" },
    { label: "Feedback", href: "/contact?tab=feedback" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl border border-white/15 overflow-hidden flex-shrink-0">
                <Image
                  src="/logos/app_icon.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>
              <Image
                src="/logos/go_qatar_text.svg"
                alt="Go Qatar — home"
                width={108}
                height={22}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Navigate Qatar effortlessly with our precision address system.
              Your city, your way.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {/* App Store */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-glass rounded-lg border border-white/08 hover:border-gold/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  opacity="0.8"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="text-white/70 text-xs font-medium">
                  App Store
                </span>
              </a>

              {/* Google Play */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-glass rounded-lg border border-white/08 hover:border-gold/30 transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  opacity="0.8"
                >
                  <path d="M3,20.5v-17C3,2.91,3.34,2.5,3.85,2.5c0.23,0,0.48,0.08,0.69,0.24L20.5,12l-16,9.26C4.33,21.42,4.08,21.5,3.85,21.5 C3.34,21.5,3,21.09,3,20.5z" />
                </svg>
                <span className="text-white/70 text-xs font-medium">
                  Google Play
                </span>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Go Qatar. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Developed by{" "}
            <a
              href="https://snapinfinity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold transition-colors duration-200 font-medium"
            >
              snapinfinity.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
