import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  highlight = false,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      className={`group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        highlight
          ? "bg-gradient-to-br from-gold/10 to-gold/5 border-gold-subtle"
          : "bg-glass hover:bg-white/[0.06]"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {highlight && (
        <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
          highlight
            ? "bg-gold/20 text-gold"
            : "bg-white/[0.07] text-white/80 group-hover:bg-gold/15 group-hover:text-gold transition-colors duration-300"
        }`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/55 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
