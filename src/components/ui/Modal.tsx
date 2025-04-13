"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X } from "@/components/icons"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: "default" | "sm" | "lg" | "xl"
}

export default function Modal({ isOpen, onClose, title, children, size = "default" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div
        ref={modalRef}
        className={cn(
          "relative z-50 max-h-[90vh] overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl transition-all",
          size === "default" && "w-full max-w-md",
          size === "sm" && "w-full max-w-sm",
          size === "lg" && "w-full max-w-lg",
          size === "xl" && "w-full max-w-xl",
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
