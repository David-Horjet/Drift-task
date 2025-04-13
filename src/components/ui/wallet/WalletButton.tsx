"use client"

import { useState } from "react"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Shield, CreditCard } from "@/components/icons"
import { truncateAddress } from "@/lib/utils"
import Dropdown from "@/components/ui/Dropdown"

export default function WalletButton() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const connectWallet = () => {
    // Simulate wallet connection
    setConnected(true)
    setWalletAddress("8xrt67DTXUFiDQMzVYGxqHqCZkiTAEUoRQEq9Xtqrza2")
  }

  const disconnectWallet = () => {
    setConnected(false)
    setWalletAddress("")
    setDropdownOpen(false)
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
    }
  }

  if (!connected) {
    return (
      <button
        onClick={connectWallet}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/20 active:opacity-90"
      >
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </button>
    )
  }

  return (
    <Dropdown
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      trigger={
        <button className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm font-medium text-white transition-all hover:border-zinc-600 hover:bg-zinc-700">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>{truncateAddress(walletAddress)}</span>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </button>
      }
      align="end"
      className="w-72"
    >
      <div className="p-2">
        <div className="mb-3 rounded-lg bg-zinc-800 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Connected Wallet</span>
            <div className="flex h-5 items-center rounded-full bg-green-500/10 px-2 text-xs font-medium text-green-500">
              Connected
            </div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <Shield className="h-4 w-4" />
            </div>
            <div className="flex-1 truncate font-mono text-sm text-zinc-300">{walletAddress}</div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={copyAddress}
              className="flex flex-1 items-center justify-center gap-1 rounded-md bg-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-600"
            >
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </button>
            <button className="flex flex-1 items-center justify-center gap-1 rounded-md bg-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-600">
              <ExternalLink className="h-3 w-3" />
              <span>Explorer</span>
            </button>
          </div>
        </div>

        <div className="space-y-1 px-1">
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
            <CreditCard className="h-4 w-4" />
            <span>Manage Wallets</span>
          </button>
          <button
            onClick={disconnectWallet}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span>Disconnect</span>
          </button>
        </div>
      </div>
    </Dropdown>
  )
}
