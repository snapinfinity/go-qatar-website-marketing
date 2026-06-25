import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-gold-gradient text-black hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg",
    secondary:
      "bg-glass border border-white/10 text-white hover:border-gold/40 hover:bg-white/[0.07] active:scale-[0.98]",
    ghost:
      "text-white/70 hover:text-white hover:bg-white/05 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
