export interface SubaccountType {
    id: string
    name: string
    balance: number
    pnl: number
    pnlPercentage: number
  }
  
  export interface PositionType {
    id: string
    market: string
    size: number
    direction: "long" | "short"
    entryPrice: number
    markPrice: number
    pnl: number
    pnlPercentage: number
    leverage: number
  }
  
  export interface OrderType {
    id: string
    market: string
    type: string
    side: "buy" | "sell"
    price: number
    size: number
    filled: string
    status: string
  }
  
  export interface BalanceType {
    token: string
    balance: number
    value: number
  }
  