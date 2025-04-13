"use client"

import { useState } from "react"
import { Menu, Bell, Search } from "@/components/icons"
import ThemeToggle from "../ui/ThemeToggle"
import WalletButton from "../ui/wallet/WalletButton"

interface HeaderProps {
  onMenuClick: () => void
  showMenuButton: boolean
}

export default function Header({ onMenuClick, showMenuButton }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800/50 bg-zinc-900/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {showSearch ? (
          <div className="relative">
            <input
              type="text"
              placeholder="Search markets, tokens..."
              className="h-10 w-64 rounded-full bg-zinc-800 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none ring-1 ring-zinc-700 transition-all focus:ring-purple-500"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-zinc-800/50 px-3 py-1.5 text-sm text-zinc-400 md:flex">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span>Solana: 1.2s</span>
        </div>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-purple-500"></span>
        </button>

        <ThemeToggle />

        <WalletButton />
      </div>
    </header>
  )
}
