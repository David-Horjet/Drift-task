"use client"

import { useState } from "react"
import { ArrowDownUp, ArrowUp, ArrowDown, X, Settings, AlertTriangle, Sliders } from "@/components/icons"
import type { SubaccountType } from "@/types/subaccount"
import { mockPositions, mockOrders, mockBalances } from "@/data/mockData"
import Tabs from "@/components/ui/Tabs"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import Modal from "@/components/ui/Modal"
import { cn } from "@/lib/utils"

interface SubaccountDetailsProps {
  subaccount: SubaccountType
}

export default function SubaccountDetails({ subaccount }: SubaccountDetailsProps) {
  const [activeTab, setActiveTab] = useState("positions")
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [orderType, setOrderType] = useState("market")
  const [orderSide, setOrderSide] = useState<"long" | "short" | null>(null)

  const tabs = [
    { id: "positions", label: "Positions" },
    { id: "orders", label: "Orders" },
    { id: "balances", label: "Balances" },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-white">{subaccount.name}</h2>
          <p className="text-sm text-zinc-400">Manage your positions, orders, and balances</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="p-6">
        {activeTab === "positions" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Open Positions</h3>
              <Button
                onClick={() => setOrderModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              >
                <ArrowDownUp className="mr-2 h-4 w-4" />
                New Position
              </Button>
            </div>

            {mockPositions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left">
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Market</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Side</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Size</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Entry Price</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Mark Price</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">PnL</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Leverage</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPositions.map((position) => (
                      <tr key={position.id} className="border-b border-zinc-800/50 text-white">
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{position.market}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <Badge variant={position.direction === "long" ? "success" : "danger"}>
                            {position.direction.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono">{position.size}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono">
                          ${position.entryPrice.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono">
                          ${position.markPrice.toLocaleString()}
                        </td>
                        <td
                          className={cn(
                            "whitespace-nowrap px-4 py-3 font-mono",
                            position.pnl >= 0 ? "text-green-500" : "text-red-500",
                          )}
                        >
                          {position.pnl >= 0 ? "+" : ""}
                          {position.pnl.toLocaleString()} ({position.pnl >= 0 ? "+" : ""}
                          {position.pnlPercentage.toFixed(2)}%)
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono">{position.leverage}x</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex gap-2">
                            <button className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-zinc-700">
                              Close
                            </button>
                            <button className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-zinc-700">
                              TP/SL
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 p-6 text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                  <ArrowDownUp className="h-6 w-6 text-zinc-400" />
                </div>
                <p className="mb-1 text-zinc-300">No open positions</p>
                <p className="text-sm text-zinc-500">Start trading by opening a new position</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Open Orders</h3>
            </div>

            {mockOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left">
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Market</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Type</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Side</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Price</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Size</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Filled</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Status</th>
                      <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-800/50 text-white">
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{order.market}</td>
                        <td className="whitespace-nowrap px-4 py-3">{order.type}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <Badge variant={order.side === "buy" ? "success" : "danger"}>
                            {order.side.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono">${order.price.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono">{order.size}</td>
                        <td className="whitespace-nowrap px-4 py-3">{order.filled}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <Badge variant="secondary">{order.status}</Badge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <button className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white">
                            <X className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 p-6 text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
                  <AlertTriangle className="h-6 w-6 text-zinc-400" />
                </div>
                <p className="mb-1 text-zinc-300">No open orders</p>
                <p className="text-sm text-zinc-500">Your open orders will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "balances" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Token Balances</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-left">
                    <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Token</th>
                    <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Balance</th>
                    <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Value (USD)</th>
                    <th className="whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBalances.map((balance) => (
                    <tr key={balance.token} className="border-b border-zinc-800/50 text-white">
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
                            <span className="text-xs font-bold">{balance.token.charAt(0)}</span>
                          </div>
                          <span className="font-medium">{balance.token}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono">{balance.balance.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono">${balance.value.toLocaleString()}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex gap-2">
                          <button className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-zinc-700">
                            Deposit
                          </button>
                          <button className="rounded-md bg-zinc-800 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-zinc-700">
                            Withdraw
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* New Position Modal */}
      <Modal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)} title="Place Order" size="lg">
        <div className="mb-4 flex rounded-lg bg-zinc-800">
          <button
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors",
              orderType === "market" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:bg-zinc-700/50 hover:text-white",
            )}
            onClick={() => setOrderType("market")}
          >
            Market
          </button>
          <button
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors",
              orderType === "limit" ? "bg-zinc-700 text-white" : "text-zinc-400 hover:bg-zinc-700/50 hover:text-white",
            )}
            onClick={() => setOrderType("limit")}
          >
            Limit
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="market" className="mb-2 block text-sm font-medium text-zinc-400">
              Market
            </label>
            <select
              id="market"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-purple-500"
            >
              <option value="sol-perp">SOL-PERP</option>
              <option value="btc-perp">BTC-PERP</option>
              <option value="eth-perp">ETH-PERP</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">Direction</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition-all",
                  orderSide === "long"
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-zinc-700 text-zinc-400 hover:border-green-500/50 hover:text-green-500",
                )}
                onClick={() => setOrderSide("long")}
              >
                <ArrowUp className="h-4 w-4" />
                <span>Long</span>
              </button>

              <button
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition-all",
                  orderSide === "short"
                    ? "border-red-500 bg-red-500/10 text-red-500"
                    : "border-zinc-700 text-zinc-400 hover:border-red-500/50 hover:text-red-500",
                )}
                onClick={() => setOrderSide("short")}
              >
                <ArrowDown className="h-4 w-4" />
                <span>Short</span>
              </button>
            </div>
          </div>

          {orderType === "limit" && (
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-zinc-400">
                Limit Price
              </label>
              <div className="relative">
                <input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-purple-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-sm text-zinc-500">USD</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="size" className="mb-2 block text-sm font-medium text-zinc-400">
              Size
            </label>
            <div className="relative">
              <input
                id="size"
                type="number"
                placeholder="0.00"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 outline-none focus:border-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
                <button className="rounded bg-zinc-700 px-1.5 py-0.5 text-xs font-medium text-white hover:bg-zinc-600">
                  10%
                </button>
                <button className="rounded bg-zinc-700 px-1.5 py-0.5 text-xs font-medium text-white hover:bg-zinc-600">
                  50%
                </button>
                <button className="rounded bg-zinc-700 px-1.5 py-0.5 text-xs font-medium text-white hover:bg-zinc-600">
                  MAX
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="leverage" className="text-sm font-medium text-zinc-400">
                Leverage
              </label>
              <button className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">
                <Sliders className="h-3 w-3" />
                <span>Advanced</span>
              </button>
            </div>
            <div className="relative">
              <input
                id="leverage"
                type="range"
                min="1"
                max="20"
                step="1"
                defaultValue="5"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-purple-500"
              />
              <div className="mt-2 flex justify-between text-xs text-zinc-500">
                <span>1x</span>
                <span>5x</span>
                <span>10x</span>
                <span>15x</span>
                <span>20x</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Order Summary</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Entry Price</span>
                <span className="font-mono font-medium text-white">$105.75</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Position Size</span>
                <span className="font-mono font-medium text-white">$1,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Leverage</span>
                <span className="font-mono font-medium text-white">5.0x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Liquidation Price</span>
                <span className="font-mono font-medium text-white">$84.60</span>
              </div>
            </div>
          </div>

          <Button
            disabled={!orderSide}
            className={cn(
              "w-full",
              orderSide === "long"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                : orderSide === "short"
                  ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500"
                  : "bg-zinc-700",
            )}
            onClick={() => setOrderModalOpen(false)}
          >
            {orderType === "market" ? "Place Market Order" : "Place Limit Order"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
