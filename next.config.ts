import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// In dev, Next/webpack evaluates modules via eval() (React Fast Refresh +
// eval source maps) and connects an HMR websocket. A CSP without
// 'unsafe-eval'/ws: blocks those, so the app renders on the server but never
// hydrates on the client (only static, non-animated content shows). Production
// builds don't use eval, so we keep the strict policy there.
//
// Why 'unsafe-inline' stays (audited 2026-08-19, do not "just remove" it):
//   script-src — App Router ships the RSC payload as ~14 inline
//     `self.__next_f.push(...)` scripts per page. Block them and the page
//     renders but never hydrates. Removing 'unsafe-inline' requires either a
//     per-request nonce from middleware (which opts every page into dynamic
//     rendering, undoing the static prerender + critical-CSS inlining) or
//     per-page hashes (which can't work: `headers()` is evaluated during the
//     build, before the HTML those hashes describe exists).
//   style-src  — framer-motion animates via inline `style` attributes (147 on
//     the homepage alone) and the critical CSS is an inline <style> block.
//     Hashes can't cover attribute values that change every frame.
// What IS enforced instead: script-src-attr 'none' below.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  `connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.analytics.google.com${isDev ? " ws:" : ""}`,
  // 'none' blocked Google's own Tag Assistant debugger, which embeds a live
  // preview of the connected page in an iframe to establish its debug
  // session — a bare 'none' silently breaks that handshake (generic
  // "timeout", no CSP console error) while still stopping real clickjacking.
  "frame-ancestors 'self' https://tagassistant.google.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // 'unsafe-inline' above cannot be dropped from script-src (see the note on
  // `csp`), but it does not have to extend to inline event-handler attributes
  // (onclick=, onerror=, onload=, ...) — the classic injection sink. React
  // attaches listeners in JS and never emits handler attributes, so blocking
  // them costs nothing here. NOTE: `scripts/inline-critical-css.mjs` must keep
  // rewriting critters' `onload="this.media='all'"` into its inline defer
  // script, or the deferred stylesheets never activate under this directive.
  "script-src-attr 'none'",
  // Production only: dev is served over plain http://localhost, and upgrading
  // loopback requests has no security value while risking the HMR socket.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Legacy fallback for browsers without CSP frame-ancestors support; modern
  // browsers use frame-ancestors above (which allows tagassistant.google.com).
  // X-Frame-Options has no multi-origin syntax, so SAMEORIGIN is the closest
  // safe value — Tag Assistant just won't work in a browser this old.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.goqatar.app" }],
        destination: "https://goqatar.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
