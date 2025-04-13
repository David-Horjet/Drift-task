"use client"

import type React from "react"

import { useState } from "react"
import { Search, ExternalLink } from "@/components/icons"
import { truncateAddress } from "@/lib/utils"
import Button from "@/components/ui/Button"

export default function WalletLookup() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<null | {
    address: string
    subaccounts: number
    totalValue: number
  }>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletAddress) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setSearchResult({
        address: walletAddress,
        subaccounts: 3,
        totalValue: 12500.75,
      })
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Public Wallet Lookup</h2>
        <p className="text-sm text-zinc-400">{"View any wallet's subaccounts and positions"}</p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Solana wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 pl-10 text-white placeholder-zinc-500 outline-none transition-colors focus:border-purple-500"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          </div>

          <Button
            type="submit"
            disabled={isSearching || !walletAddress}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </form>

        {searchResult && (
          <div className="mt-6 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800/50">
            <div className="border-b border-zinc-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Wallet Details</h3>
                <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-purple-400 transition-colors hover:bg-zinc-700 hover:text-purple-300">
                  <ExternalLink className="h-3 w-3" />
                  <span>View on Explorer</span>
                </button>
              </div>
              <p className="mt-1 font-mono text-sm text-zinc-400">{truncateAddress(searchResult.address, 8, 8)}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
              <div className="rounded-lg bg-zinc-800 p-4">
                <p className="text-sm text-zinc-400">Subaccounts</p>
                <p className="mt-1 text-2xl font-bold text-white">{searchResult.subaccounts}</p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <p className="text-sm text-zinc-400">Total Value</p>
                <p className="mt-1 text-2xl font-bold text-white">${searchResult.totalValue.toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t border-zinc-700 p-4">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                View Detailed Breakdown
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
