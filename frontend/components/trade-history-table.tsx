"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Search, Filter } from "lucide-react"

const tradesData = [
  { 
    id: 1, 
    date: "2025-01-15", 
    symbol: "AAPL", 
    type: "BUY", 
    quantity: 50, 
    price: 174.95, 
    total: 8747.50, 
    currentPrice: 184.92, 
    pnl: 498.50, 
    pnlPercent: 5.70,
    status: "Open"
  },
  { 
    id: 2, 
    date: "2025-01-14", 
    symbol: "MSFT", 
    type: "BUY", 
    quantity: 30, 
    price: 331.28, 
    total: 9938.40, 
    currentPrice: 359.83, 
    pnl: 856.50, 
    pnlPercent: 8.62,
    status: "Open"
  },
  { 
    id: 3, 
    date: "2025-01-13", 
    symbol: "GOOGL", 
    type: "SELL", 
    quantity: 25, 
    price: 142.56, 
    total: 3564.00, 
    currentPrice: 142.56, 
    pnl: 234.50, 
    pnlPercent: 6.58,
    status: "Closed"
  },
  { 
    id: 4, 
    date: "2025-01-12", 
    symbol: "TSLA", 
    type: "BUY", 
    quantity: 20, 
    price: 243.55, 
    total: 4871.00, 
    currentPrice: 263.59, 
    pnl: 400.80, 
    pnlPercent: 8.23,
    status: "Open"
  },
  { 
    id: 5, 
    date: "2025-01-11", 
    symbol: "META", 
    type: "BUY", 
    quantity: 15, 
    price: 306.42, 
    total: 4596.30, 
    currentPrice: 296.10, 
    pnl: -154.80, 
    pnlPercent: -3.37,
    status: "Open"
  },
  { 
    id: 6, 
    date: "2025-01-10", 
    symbol: "NVDA", 
    type: "SELL", 
    quantity: 40, 
    price: 247.85, 
    total: 9914.00, 
    currentPrice: 247.85, 
    pnl: 587.20, 
    pnlPercent: 5.92,
    status: "Closed"
  },
  { 
    id: 7, 
    date: "2025-01-09", 
    symbol: "AMZN", 
    type: "BUY", 
    quantity: 35, 
    price: 153.37, 
    total: 5367.95, 
    currentPrice: 162.62, 
    pnl: 323.75, 
    pnlPercent: 6.03,
    status: "Open"
  },
  { 
    id: 8, 
    date: "2025-01-08", 
    symbol: "NFLX", 
    type: "BUY", 
    quantity: 12, 
    price: 414.54, 
    total: 4974.48, 
    currentPrice: 405.61, 
    pnl: -107.16, 
    pnlPercent: -2.15,
    status: "Open"
  },
  { 
    id: 9, 
    date: "2025-01-07", 
    symbol: "PYPL", 
    type: "SELL", 
    quantity: 80, 
    price: 68.15, 
    total: 5452.00, 
    currentPrice: 68.15, 
    pnl: 67.20, 
    pnlPercent: 1.23,
    status: "Closed"
  },
  { 
    id: 10, 
    date: "2025-01-06", 
    symbol: "INTC", 
    type: "BUY", 
    quantity: 100, 
    price: 42.74, 
    total: 4274.00, 
    currentPrice: 42.74, 
    pnl: -69.64, 
    pnlPercent: -1.63,
    status: "Open"
  }
]

export default function TradeHistoryTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all")
  
  const filteredTrades = tradesData.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || trade.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
            placeholder="Search by symbol..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "open" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("open")}
          >
            Open
          </Button>
          <Button
            variant={statusFilter === "closed" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("closed")}
          >
            Closed
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>More</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">P&L</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrades.map((trade) => {
              const isPositive = trade.pnl >= 0
              
              return (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">{trade.date}</TableCell>
                  <TableCell>
                    <div className="font-mono bg-primary/10 text-primary p-1 rounded text-xs inline-block">
                      {trade.symbol}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>
                      {trade.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{trade.quantity}</TableCell>
                  <TableCell className="text-right">${trade.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${trade.total.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${trade.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    <div className="flex items-center justify-end gap-1">
                      {isPositive ? 
                        <ArrowUpRight className="h-3 w-3" /> : 
                        <ArrowDownRight className="h-3 w-3" />
                      }
                      <div>
                        <div className="font-medium">${Math.abs(trade.pnl).toFixed(2)}</div>
                        <div className="text-xs">({isPositive ? '+' : ''}{trade.pnlPercent.toFixed(2)}%)</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={trade.status === "Open" ? "outline" : "secondary"}>
                      {trade.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredTrades.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No trades found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Showing {filteredTrades.length} of {tradesData.length} trades
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}