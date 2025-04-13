"use client"

import { useEffect, useRef } from "react"
import { Home, ChartBar, Wallet, History, Settings, X, ExternalLink, ChevronRight } from "@/components/icons"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && window.innerWidth < 1024) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: ChartBar, label: "Markets", badge: "12" },
    { icon: Wallet, label: "Portfolio" },
    { icon: History, label: "History" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-72 transform overflow-y-auto border-r border-zinc-800/50 bg-zinc-900 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800/50 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-blue-500">
              <span className="text-lg font-bold text-white">D</span>
            </div>
            <span className="text-lg font-bold text-white">Drift Trade</span>
          </div>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6 rounded-xl bg-zinc-800/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-zinc-400">Network Status</h3>
              <span className="flex h-5 items-center rounded-full bg-green-500/10 px-2 text-xs font-medium text-green-500">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Block Height</span>
              <span className="font-mono text-zinc-300">225,431,992</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
              <span>Slot Time</span>
              <span className="font-mono text-zinc-300">1.2s</span>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  item.active
                    ? "bg-gradient-to-r from-purple-500/10 to-blue-500/5 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      item.active ? "text-purple-400" : "text-zinc-500 group-hover:text-zinc-300",
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-800 px-1.5 text-xs font-medium text-zinc-300 group-hover:bg-zinc-700">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="mt-8 space-y-2">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Resources</h3>

            {["Documentation", "API Reference", "Status"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <span>{item}</span>
                <ExternalLink className="h-4 w-4 text-zinc-500" />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800/50 bg-zinc-900/80 p-4 backdrop-blur-sm">
          <a
            href="#"
            className="flex items-center justify-between rounded-lg bg-zinc-800 p-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700">
                <span className="text-xs font-medium">?</span>
              </div>
              <div>
                <p className="font-medium">Need Help?</p>
                <p className="text-xs text-zinc-500">Contact support</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-500" />
          </a>
        </div>
      </div>
    </>
  )
}
