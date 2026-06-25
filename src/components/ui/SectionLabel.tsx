interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest">
      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-slow" />
      {text}
    </span>
  );
}
