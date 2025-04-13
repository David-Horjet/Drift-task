"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  align?: "start" | "end"
  className?: string
}

export default function Dropdown({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  align = "start",
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : open
  const setIsOpen = onOpenChange || setOpen

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <div
        className={cn(
          "absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg",
          align === "start" ? "left-0" : "right-0",
          isOpen ? "animate-in fade-in-0 zoom-in-95" : "hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
