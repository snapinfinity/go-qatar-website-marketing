"use client";

import Image from "next/image";

export default function DohaMap() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#212121", overflow: "hidden" }}>
      <Image
        src="/doha-map-static.png"
        alt="Doha map"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
        draggable={false}
      />
      {/* © Google credit */}
      <div style={{ position: "absolute", bottom: 3, right: 5, pointerEvents: "none", zIndex: 10 }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 8, fontFamily: "sans-serif" }}>© Google</span>
      </div>
    </div>
  );
}
