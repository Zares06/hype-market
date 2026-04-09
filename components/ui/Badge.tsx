import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "new" | "origin" | "tag" | "hot";
  className?: string;
}

export function Badge({ children, variant = "tag", className }: BadgeProps) {
  const variants = {
    new: "bg-hype-brown text-hype-cream",
    origin: "bg-hype-cream/90 text-hype-dark border border-hype-sand/50",
    tag: "bg-hype-sand/30 text-hype-brown",
    hot: "bg-red-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-display font-bold uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
