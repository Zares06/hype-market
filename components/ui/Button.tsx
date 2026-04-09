import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "sand" | "dark";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-display font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-hype-brown text-hype-cream rounded-full hover:bg-hype-dark hover:shadow-card-hover",
      ghost:
        "border-2 border-hype-brown text-hype-brown rounded-full hover:bg-hype-brown hover:text-hype-cream",
      sand: "bg-hype-sand text-hype-dark rounded-full hover:bg-hype-brown hover:text-hype-cream",
      dark: "bg-hype-dark text-hype-cream rounded-full hover:bg-hype-brown",
    };

    const sizes = {
      sm: "text-xs px-5 py-2.5",
      md: "text-sm px-8 py-4",
      lg: "text-base px-10 py-5",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
