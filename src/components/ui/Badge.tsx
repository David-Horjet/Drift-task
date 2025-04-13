import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "success" | "danger" | "warning"
  className?: string
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variant === "default" && "bg-zinc-800 text-zinc-300",
        variant === "secondary" && "bg-zinc-800 text-zinc-300",
        variant === "success" && "bg-green-500/10 text-green-500",
        variant === "danger" && "bg-red-500/10 text-red-500",
        variant === "warning" && "bg-yellow-500/10 text-yellow-500",
        className,
      )}
    >
      {children}
    </span>
  )
}
