"use client"

import type React from "react"

import { useState } from "react"
import { Plus, ArrowUpRight, ArrowDownLeft, ExternalLink, Pencil, ArrowDown } from "@/components/icons"
import type { SubaccountType } from "@/types/subaccount"
import Modal from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface SubaccountsListProps {
  subaccounts: SubaccountType[]
  selectedSubaccountId: string | null
  onSelectSubaccount: (id: string) => void
}

export default function SubaccountsList({
  subaccounts,
  selectedSubaccountId,
  onSelectSubaccount,
}: SubaccountsListProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [activeSubaccount, setActiveSubaccount] = useState<SubaccountType | null>(null)

  const handleDepositClick = (e: React.MouseEvent, subaccount: SubaccountType) => {
    e.stopPropagation()
    setActiveSubaccount(subaccount)
    setDepositModalOpen(true)
  }

  const handleWithdrawClick = (e: React.MouseEvent, subaccount: SubaccountType) => {
    e.stopPropagation()
    setActiveSubaccount(subaccount)
    setWithdrawModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Your Subaccounts</h2>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Subaccount
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subaccounts.map((account) => (
          <div
            key={account.id}
            onClick={() => onSelectSubaccount(account.id)}
            className={cn(
              "group cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-800/50",
              selectedSubaccountId === account.id && "border-purple-500/50 ring-1 ring-purple-500/20",
            )}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 font-mono text-sm font-bold text-white group-hover:bg-zinc-700">
                  {account.id}
                </div>
                <h3 className="font-medium text-white">{account.name}</h3>
              </div>
              <div className="flex gap-1">
                <button className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                  <Pencil className="h-4 w-4" />
                </button>
                <button className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">Balance</span>
                <span className="font-mono font-medium text-white">${account.balance.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">PnL (24h)</span>
                <span className={cn("font-mono font-medium", account.pnl >= 0 ? "text-green-500" : "text-red-500")}>
                  {account.pnl >= 0 ? "+" : ""}
                  {account.pnl.toLocaleString()} ({account.pnl >= 0 ? "+" : ""}
                  {account.pnlPercentage.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={(e) => handleDepositClick(e, account)}
                className="flex flex-1 items-center justify-center gap-1 rounded-md bg-zinc-800 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span>Deposit</span>
              </button>

              <button
                onClick={(e) => handleWithdrawClick(e, account)}
                className="flex flex-1 items-center justify-center gap-1 rounded-md bg-zinc-800 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
              >
                <ArrowDownLeft className="h-4 w-4 text-red-500" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Subaccount Modal */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Subaccount">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-400">
              Subaccount Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Trading Account"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-purple-500"
            />
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            onClick={() => setCreateModalOpen(false)}
          >
            Create Subaccount
          </Button>
        </div>
      </Modal>

      {/* Deposit Modal */}
      <Modal
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        title={`Deposit to ${activeSubaccount?.name || ""}`}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="token" className="mb-2 block text-sm font-medium text-zinc-400">
              Token
            </label>
            <select
              id="token"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-purple-500"
            >
              <option value="usdc">USDC</option>
              <option value="sol">SOL</option>
              <option value="usdt">USDT</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-zinc-400">
              Amount
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-purple-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-zinc-700 px-2 py-0.5 text-xs font-medium text-white hover:bg-zinc-600">
                MAX
              </button>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
            onClick={() => setDepositModalOpen(false)}
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Deposit Funds
          </Button>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        title={`Withdraw from ${activeSubaccount?.name || ""}`}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="token" className="mb-2 block text-sm font-medium text-zinc-400">
              Token
            </label>
            <select
              id="token"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-purple-500"
            >
              <option value="usdc">USDC</option>
              <option value="sol">SOL</option>
              <option value="usdt">USDT</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-zinc-400">
              Amount
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-purple-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-zinc-700 px-2 py-0.5 text-xs font-medium text-white hover:bg-zinc-600">
                MAX
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Available Balance</span>
              <span className="font-mono font-medium text-white">
                {activeSubaccount ? `$${activeSubaccount.balance.toLocaleString()}` : "$0.00"}
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500"
            onClick={() => setWithdrawModalOpen(false)}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        </div>
      </Modal>
    </div>
  )
}
