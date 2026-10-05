interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/20 border border-brand-light/25 text-brand-light text-xs font-semibold uppercase tracking-[0.2em]">
      <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-slow" />
      {text}
    </span>
  );
}
