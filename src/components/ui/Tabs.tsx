"use client"

import { cn } from "@/lib/utils"

interface TabsProps {
  tabs: Array<{ id: string; label: string }>
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-zinc-800", className)}>
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex min-w-0 flex-1 items-center justify-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors sm:flex-none sm:px-8",
              activeTab === tab.id
                ? "border-purple-500 text-white"
                : "border-transparent text-zinc-400 hover:border-zinc-700 hover:text-zinc-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
