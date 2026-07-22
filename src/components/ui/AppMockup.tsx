"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const DohaMap = dynamic(() => import("./DohaMap"), { ssr: false });

export default function AppMockup() {
  return (
    <div className="relative w-[280px] mx-auto animate-float" style={{ height: 580 }}>
      {/* Phone shell */}
      <div
        className="absolute inset-0 overflow-hidden shadow-2xl"
        style={{
          borderRadius: 44,
          background: "#202020",
          border: "1.5px solid rgba(255,255,255,0.10)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-6"
          style={{ paddingTop: 12, paddingBottom: 6, background: "#292827" }}
        >
          <span className="text-white font-semibold" style={{ fontSize: 10 }}>9:41</span>
          {/* Dynamic island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bg-black"
            style={{ width: 80, height: 20, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}
          />
          <div className="flex gap-1 items-center">
            {/* Signal bars */}
            <div className="flex gap-[2px] items-end">
              {[8, 10, 12, 14].map((h, i) => (
                <div key={i} className="w-[3px] bg-white rounded-sm" style={{ height: h, opacity: i < 3 ? 1 : 0.5 }} />
              ))}
            </div>
            {/* Wifi */}
            <svg width="12" height="10" viewBox="0 0 24 24" fill="white" style={{ opacity: 0.9 }}>
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-[1px]">
              <div
                style={{
                  width: 18, height: 10, border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: 3, position: "relative", display: "flex", alignItems: "center", padding: "1px 1px",
                }}
              >
                <div style={{ width: "80%", height: "100%", background: "white", borderRadius: 1.5 }} />
              </div>
              <div style={{ width: 2, height: 5, background: "rgba(255,255,255,0.7)", borderRadius: "0 1px 1px 0" }} />
            </div>
          </div>
        </div>

        {/* App bar — matches #292827 */}
        <div
          className="flex items-center justify-between px-4"
          style={{ height: 48, background: "#292827", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 26, height: 26, borderRadius: 8, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0,
              }}
            >
              <Image src="/logos/app_icon.svg" alt="" width={26} height={26} className="w-full h-full" />
            </div>
            <Image
              src="/logos/go_qatar_text.svg"
              alt=""
              width={62}
              height={13}
              className="brightness-0 invert"
            />
          </div>

          {/* Reward coin (matching the actual app bar right action) */}
          <div
            className="flex items-center gap-1 px-2 py-1"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#C9A84C" opacity="0.9"/>
              <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0C0C0C">Q</text>
            </svg>
            <span className="text-white font-semibold" style={{ fontSize: 9 }}>120</span>
          </div>
        </div>

        {/* Map area — real Google Maps with Flutter dark style */}
        <div className="relative overflow-hidden" style={{ height: 200, background: "#212121" }}>
          <DohaMap />
        </div>

        {/* Search sheet — matches kGrey10 (#202020) with rounded-t-[40px] */}
        <div
          style={{
            background: "#202020",
            borderRadius: "40px 40px 0 0",
            paddingBottom: 68, // space for bottom nav
            boxShadow: "-4px 0 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Drag handle */}
          <div style={{ paddingTop: 12, paddingBottom: 8, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 80, height: 5, borderRadius: 10, background: "rgba(255,255,255,0.25)" }} />
          </div>

          {/* Fields */}
          <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 10 }}>
            {/* Building Number */}
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <span className="text-white font-semibold" style={{ fontSize: 10, minWidth: 80 }}>Building No.</span>
              <div
                style={{
                  flex: 1, height: 34, background: "#2D2D2D", borderRadius: 10,
                  display: "flex", alignItems: "center", paddingLeft: 10,
                }}
              >
                <span className="text-white font-medium" style={{ fontSize: 11 }}>12</span>
              </div>
            </div>

            {/* Street Number */}
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <span className="text-white font-semibold" style={{ fontSize: 10, minWidth: 80 }}>Street No.</span>
              <div
                style={{
                  flex: 1, height: 34, background: "#2D2D2D", borderRadius: 10,
                  display: "flex", alignItems: "center", paddingLeft: 10,
                }}
              >
                <span className="text-white font-medium" style={{ fontSize: 11 }}>330</span>
              </div>
            </div>

            {/* Zone Number */}
            <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
              <span className="text-white font-semibold" style={{ fontSize: 10, minWidth: 80 }}>Zone No.</span>
              <div
                style={{
                  flex: 1, height: 34, background: "#2D2D2D", borderRadius: 10,
                  display: "flex", alignItems: "center", paddingLeft: 10,
                }}
              >
                <span className="text-white font-medium" style={{ fontSize: 11 }}>25</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {/* Clear */}
              <div
                style={{
                  flex: 1, height: 36, background: "#343535", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span className="text-white font-semibold" style={{ fontSize: 11 }}>Clear</span>
              </div>
              {/* Search */}
              <div
                style={{
                  flex: 1, height: 36, background: "#1A1A1A", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="text-white font-semibold" style={{ fontSize: 11 }}>Search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom navigation — floating with blur effect over the sheet */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 64,
            background: "rgba(32,32,32,0.85)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px 24px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          {/* Search tab — active */}
          <div
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              padding: "5px 10px",
              background: "rgba(255,255,255,0.10)",
              borderRadius: 14,
              border: "1.5px solid rgba(255,255,255,0.20)",
            }}
          >
            <Image src="/icons/find_icon.svg" alt="Search" width={18} height={18} className="brightness-0 invert" />
            <span className="text-white font-semibold" style={{ fontSize: 8 }}>Search</span>
          </div>

          {/* News tab — inactive */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 6px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.45)" }}>News</span>
          </div>

          {/* History tab — inactive */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 6px" }}>
            <Image src="/icons/history.svg" alt="History" width={18} height={18} style={{ opacity: 0.45 }} className="brightness-0 invert" />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.45)" }}>History</span>
          </div>

          {/* Favorites tab — inactive */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 6px" }}>
            <Image src="/icons/fevorite.svg" alt="Favorites" width={18} height={18} style={{ opacity: 0.45 }} className="brightness-0 invert" />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.45)" }}>Favorites</span>
          </div>

          {/* Profile tab — inactive */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "5px 6px" }}>
            <Image src="/icons/profile.svg" alt="Profile" width={18} height={18} style={{ opacity: 0.45 }} className="brightness-0 invert" />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.45)" }}>Profile</span>
          </div>
        </div>
      </div>

      {/* Outer glow */}
      <div
        className="absolute -z-10"
        style={{
          inset: -16, borderRadius: 60,
          background: "radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
