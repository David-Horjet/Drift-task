import type { SubaccountType, PositionType, OrderType, BalanceType } from "@/types/subaccount"

// Mock data for subaccounts
export const mockSubaccounts: SubaccountType[] = [
  {
    id: "1",
    name: "Subaccount #1",
    balance: 1250.75,
    pnl: 125.5,
    pnlPercentage: 10.03,
  },
  {
    id: "2",
    name: "Sub Trading",
    balance: 3450.25,
    pnl: -78.3,
    pnlPercentage: -2.27,
  },
  {
    id: "3",
    name: "HODL Account",
    balance: 850.0,
    pnl: 32.75,
    pnlPercentage: 3.85,
  },
]

// Mock data for positions
export const mockPositions: PositionType[] = [
  {
    id: "1",
    market: "SOL-PERP",
    size: 10,
    direction: "long",
    entryPrice: 105.75,
    markPrice: 110.25,
    pnl: 45.0,
    pnlPercentage: 4.25,
    leverage: 5,
  },
  {
    id: "2",
    market: "BTC-PERP",
    size: 0.15,
    direction: "short",
    entryPrice: 42500,
    markPrice: 42100,
    pnl: 60.0,
    pnlPercentage: 0.94,
    leverage: 10,
  },
]

// Mock data for open orders
export const mockOrders: OrderType[] = [
  {
    id: "1",
    market: "SOL-PERP",
    type: "Limit",
    side: "buy",
    price: 100.5,
    size: 5,
    filled: "0%",
    status: "open",
  },
  {
    id: "2",
    market: "BTC-PERP",
    type: "Stop-Limit",
    side: "sell",
    price: 43000,
    size: 0.1,
    filled: "0%",
    status: "open",
  },
]

// Mock data for balances
export const mockBalances: BalanceType[] = [
  { token: "USDC", balance: 1250.75, value: 1250.75 },
  { token: "SOL", balance: 5.5, value: 577.5 },
  { token: "BTC", balance: 0.01, value: 425.0 },
]
