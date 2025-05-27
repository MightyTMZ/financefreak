"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Search, Filter } from "lucide-react"

const stocksData = [
  { symbol: "AAPL", name: "Apple Inc", price: "$184.92", change: "+5.70%", volume: "72.4M", marketCap: "$2.89T", status: "up" },
  { symbol: "MSFT", name: "Microsoft Corp", price: "$359.83", change: "+8.62%", volume: "38.6M", marketCap: "$2.67T", status: "up" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "$142.56", change: "+5.82%", volume: "33.2M", marketCap: "$1.80T", status: "up" },
  { symbol: "AMZN", name: "Amazon.com Inc", price: "$162.62", change: "+6.03%", volume: "36.5M", marketCap: "$1.68T", status: "up" },
  { symbol: "TSLA", name: "Tesla Inc", price: "$263.59", change: "+8.23%", volume: "65.2M", marketCap: "$838.69B", status: "up" },
  { symbol: "META", name: "Meta Platforms", price: "$296.10", change: "-3.37%", volume: "42.8M", marketCap: "$758.94B", status: "down" },
  { symbol: "NVDA", name: "NVIDIA Corp", price: "$247.85", change: "+6.30%", volume: "49.3M", marketCap: "$610.58B", status: "up" },
  { symbol: "NFLX", name: "Netflix Inc", price: "$405.61", change: "-2.15%", volume: "11.2M", marketCap: "$176.84B", status: "down" },
  { symbol: "PYPL", name: "PayPal Holdings", price: "$68.15", change: "+1.24%", volume: "8.4M", marketCap: "$72.54B", status: "up" },
  { symbol: "INTC", name: "Intel Corp", price: "$42.74", change: "-1.63%", volume: "26.7M", marketCap: "$179.82B", status: "down" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: "$106.43", change: "+4.91%", volume: "58.7M", marketCap: "$172.21B", status: "up" },
  { symbol: "DIS", name: "Walt Disney Co", price: "$95.33", change: "-1.12%", volume: "9.3M", marketCap: "$174.35B", status: "down" },
  { symbol: "IBM", name: "IBM Corp", price: "$132.87", change: "-1.35%", volume: "5.6M", marketCap: "$121.56B", status: "down" },
  { symbol: "CSCO", name: "Cisco Systems", price: "$48.54", change: "+0.78%", volume: "12.3M", marketCap: "$196.92B", status: "up" },
  { symbol: "VZ", name: "Verizon Communications", price: "$39.84", change: "+0.43%", volume: "8.9M", marketCap: "$167.48B", status: "up" },
]

export default function StockList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredStocks, setFilteredStocks] = useState(stocksData)
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim() === "") {
      setFilteredStocks(stocksData)
    } else {
      const filtered = stocksData.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
        stock.name.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredStocks(filtered)
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
            placeholder="Search stocks..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">{stock.price}</TableCell>
                <TableCell className={`text-right ${stock.status === "up" ? "text-green-500" : "text-red-500"} flex items-center justify-end`}>
                  {stock.status === "up" ? 
                    <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                    <ArrowDownRight className="mr-1 h-3 w-3" />
                  }
                  {stock.change}
                </TableCell>
                <TableCell className="text-right">{stock.volume}</TableCell>
                <TableCell className="text-right">{stock.marketCap}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Details</Button>
                    <Button size="sm">Buy</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredStocks.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No stocks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredStocks.length} of {stocksData.length} stocks
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}