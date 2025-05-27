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
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react"

const stockData = [
  { symbol: "AAPL", name: "Apple Inc", shares: 15, avgPrice: 174.95, currentPrice: 184.92, value: 2773.80, change: "+5.70%" },
  { symbol: "MSFT", name: "Microsoft Corp", shares: 10, avgPrice: 331.28, currentPrice: 359.83, value: 3598.30, change: "+8.62%" },
  { symbol: "GOOGL", name: "Alphabet Inc", shares: 8, avgPrice: 134.72, currentPrice: 142.56, value: 1140.48, change: "+5.82%" },
  { symbol: "AMZN", name: "Amazon.com Inc", shares: 12, avgPrice: 153.37, currentPrice: 162.62, value: 1951.44, change: "+6.03%" },
  { symbol: "TSLA", name: "Tesla Inc", shares: 10, avgPrice: 243.55, currentPrice: 263.59, value: 2635.90, change: "+8.23%" },
  { symbol: "META", name: "Meta Platforms", shares: 5, avgPrice: 306.42, currentPrice: 296.10, value: 1480.50, change: "-3.37%" },
  { symbol: "NVDA", name: "NVIDIA Corp", shares: 8, avgPrice: 233.17, currentPrice: 247.85, value: 1982.80, change: "+6.30%" },
  { symbol: "NFLX", name: "Netflix Inc", shares: 3, avgPrice: 414.54, currentPrice: 405.61, value: 1216.83, change: "-2.15%" },
]

export default function PortfolioHoldings() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const calculateTotalValue = () => {
    return filteredStocks.reduce((total, stock) => total + stock.value, 0)
  }
  
  const totalValue = calculateTotalValue()
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full max-w-sm space-x-2">
          <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2 w-full">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
              placeholder="Search holdings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Value: <span className="font-bold text-foreground">${totalValue.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Avg Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.map((stock) => {
              const isPositive = stock.change.startsWith("+")
              
              return (
                <TableRow key={stock.symbol}>
                  <TableCell className="font-medium">{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right">{stock.shares}</TableCell>
                  <TableCell className="text-right">${stock.avgPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${stock.value.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${isPositive ? "text-green-500" : "text-red-500"} flex items-center justify-end`}>
                    {isPositive ? 
                      <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    }
                    {stock.change}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Buy</Button>
                      <Button variant="outline" size="sm">Sell</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredStocks.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No stocks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}