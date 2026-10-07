import type { CSSProperties } from "react";

// A Qatar blue address plate. The numbers "type in" once on load in the
// order you enter them in the app (zone, street, building), then the
// "Building found" pin drops. Pure CSS animation (see .plate-* in
// globals.css): no client JS, and the final state renders without it.
const ZONE = "25";
const STREET = "330";
const BUILDING = "12";

const START_MS = 500;
const DIGIT_MS = 150;
const FIELD_GAP_MS = 300;

const zoneStart = START_MS;
const streetStart = zoneStart + ZONE.length * DIGIT_MS + FIELD_GAP_MS;
const buildingStart = streetStart + STREET.length * DIGIT_MS + FIELD_GAP_MS;
const pinStart = buildingStart + BUILDING.length * DIGIT_MS + 250;

function Digits({ value, start }: { value: string; start: number }) {
  return (
    <>
      {value.split("").map((digit, i) => (
        <span
          key={i}
          className="plate-digit inline-block"
          style={{ animationDelay: `${start + i * DIGIT_MS}ms` } as CSSProperties}
        >
          {digit}
        </span>
      ))}
    </>
  );
}

function Label({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-[11px] sm:text-xs font-semibold text-white/85">
      <span>{en}</span>
      <span lang="ar" dir="rtl" className="font-[system-ui] text-[12px] sm:text-[13px] font-medium">
        {ar}
      </span>
    </div>
  );
}

const rivet =
  "absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFFFFF,#A9C1E8_55%,#4E74B3)] shadow-[0_1px_1px_rgba(0,0,0,0.35)]";

export default function BluePlate() {
  return (
    <figure className="relative w-full max-w-[410px] mx-auto lg:mr-0">
      <div
        role="img"
        aria-label={`Blue address plate reading zone ${ZONE}, street ${STREET}, building ${BUILDING}`}
        className="relative rounded-[22px] bg-plate p-3 sm:p-3.5 shadow-[0_44px_80px_-28px_rgba(0,0,0,0.75),0_14px_28px_-14px_rgba(0,0,0,0.55)]"
      >
        {/* Enamel sheen */}
        <div className="absolute inset-0 rounded-[22px] bg-[linear-gradient(155deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_40%)] pointer-events-none" />

        <span className={`${rivet} top-[5px] left-[5px]`} />
        <span className={`${rivet} top-[5px] right-[5px]`} />
        <span className={`${rivet} bottom-[5px] left-[5px]`} />
        <span className={`${rivet} bottom-[5px] right-[5px]`} />

        <div className="relative rounded-[14px] border-[3px] border-white text-white">
          {/* Building — the big number */}
          <div className="px-4 sm:px-5 pt-3">
            <Label en="Building No." ar="رقم المبنى" />
          </div>
          <div className="text-center font-extrabold tabular-nums leading-[0.9] tracking-[-0.04em] text-[104px] sm:text-[136px] pt-1 pb-3">
            <Digits value={BUILDING} start={buildingStart} />
          </div>

          {/* Zone + street */}
          <div className="grid grid-cols-2 border-t-[3px] border-white divide-x-[3px] divide-white">
            <div className="px-4 sm:px-5 py-3">
              <Label en="Zone No." ar="رقم المنطقة" />
              <div className="mt-1 text-4xl sm:text-5xl font-bold tabular-nums tracking-[-0.02em]">
                <Digits value={ZONE} start={zoneStart} />
              </div>
            </div>
            <div className="px-4 sm:px-5 py-3">
              <Label en="Street No." ar="رقم الشارع" />
              <div className="mt-1 text-4xl sm:text-5xl font-bold tabular-nums tracking-[-0.02em]">
                <Digits value={STREET} start={streetStart} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <figcaption
        className="plate-pin absolute -bottom-12 left-4 sm:-left-8 flex items-center gap-3 rounded-2xl bg-[#F4F3F1] pl-2.5 pr-5 py-2.5 text-brand-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]"
        style={{ animationDelay: `${pinStart}ms` } as CSSProperties}
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <span
            className="plate-ping absolute inset-0 rounded-full bg-brand"
            style={{ animationDelay: `${pinStart + 400}ms` } as CSSProperties}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="relative" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </span>
        <span className="text-[15px] font-semibold">Building found</span>
      </figcaption>
    </figure>
  );
}
