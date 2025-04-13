import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  children: React.ReactNode
}

export default function Button({
  variant = "default",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:pointer-events-none disabled:opacity-50",
        // Variants
        variant === "default" && "bg-purple-600 text-white hover:bg-purple-500",
        variant === "outline" && "border border-zinc-700 bg-transparent text-white hover:bg-zinc-800",
        variant === "ghost" && "bg-transparent text-white hover:bg-zinc-800",
        // Sizes
        size === "default" && "h-10 px-4 py-2 text-sm",
        size === "sm" && "h-8 px-3 py-1 text-xs",
        size === "lg" && "h-12 px-6 py-3 text-base",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
