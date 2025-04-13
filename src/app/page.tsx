"use client"

import SubaccountDetails from "@/components/sections/subaccounts/SubaccountDetails"
import SubaccountsList from "@/components/sections/subaccounts/SubaccountsList"
import WalletLookup from "@/components/ui/wallet/WalletLookup"
import { mockSubaccounts } from "@/data/mockData"
import { useState } from "react"

export default function Dashboard() {
  const [selectedSubaccountId, setSelectedSubaccountId] = useState<string | null>(null)

  const selectedSubaccount = selectedSubaccountId
    ? mockSubaccounts.find((account) => account.id === selectedSubaccountId)
    : null

  return (
    <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Trading Dashboard</h1>
          <p className="text-zinc-400">Manage your Drift subaccounts and positions on Solana</p>
        </div>

        <SubaccountsList
          subaccounts={mockSubaccounts}
          selectedSubaccountId={selectedSubaccountId}
          onSelectSubaccount={setSelectedSubaccountId}
        />

        {selectedSubaccount && <SubaccountDetails subaccount={selectedSubaccount} />}

        <WalletLookup />
      </div>
  )
}
