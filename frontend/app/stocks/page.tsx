"use client"

import { useState } from "react"
import { Search, Filter, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Plus, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock stock data with all the tickers you provided
const stocksData = [
  { symbol: "AAPL", name: "Apple Inc", price: 184.92, change: 5.70, volume: "72.4M", marketCap: "$2.89T", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corp", price: 359.83, change: 8.62, volume: "38.6M", marketCap: "$2.67T", sector: "Technology" },
  { symbol: "AMZN", name: "Amazon.com Inc", price: 162.62, change: 6.03, volume: "36.5M", marketCap: "$1.68T", sector: "Consumer Cyclical" },
  { symbol: "GOOGL", name: "Alphabet Inc Class A", price: 142.56, change: 5.82, volume: "33.2M", marketCap: "$1.80T", sector: "Technology" },
  { symbol: "GOOG", name: "Alphabet Inc Class C", price: 144.12, change: 5.95, volume: "28.1M", marketCap: "$1.82T", sector: "Technology" },
  { symbol: "TSLA", name: "Tesla Inc", price: 263.59, change: 8.23, volume: "65.2M", marketCap: "$838.69B", sector: "Consumer Cyclical" },
  { symbol: "META", name: "Meta Platforms", price: 296.10, change: -3.37, volume: "42.8M", marketCap: "$758.94B", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA Corp", price: 247.85, change: 6.30, volume: "49.3M", marketCap: "$610.58B", sector: "Technology" },
  { symbol: "JPM", name: "JPMorgan Chase & Co", price: 178.45, change: 2.15, volume: "15.2M", marketCap: "$524.67B", sector: "Financial Services" },
  { symbol: "V", name: "Visa Inc", price: 267.89, change: 1.87, volume: "8.9M", marketCap: "$567.23B", sector: "Financial Services" },
  { symbol: "UNH", name: "UnitedHealth Group", price: 542.31, change: 3.45, volume: "3.2M", marketCap: "$512.45B", sector: "Healthcare" },
  { symbol: "DIS", name: "Walt Disney Co", price: 95.33, change: -1.12, volume: "9.3M", marketCap: "$174.35B", sector: "Communication Services" },
  { symbol: "HD", name: "Home Depot Inc", price: 387.92, change: 2.78, volume: "4.1M", marketCap: "$398.76B", sector: "Consumer Cyclical" },
  { symbol: "PYPL", name: "PayPal Holdings", price: 68.15, change: 1.24, volume: "8.4M", marketCap: "$72.54B", sector: "Financial Services" },
  { symbol: "BAC", name: "Bank of America Corp", price: 42.87, change: 1.95, volume: "45.6M", marketCap: "$342.18B", sector: "Financial Services" },
  { symbol: "MA", name: "Mastercard Inc", price: 456.78, change: 2.34, volume: "3.7M", marketCap: "$434.56B", sector: "Financial Services" },
  { symbol: "NFLX", name: "Netflix Inc", price: 405.61, change: -2.15, volume: "11.2M", marketCap: "$176.84B", sector: "Communication Services" },
  { symbol: "VZ", name: "Verizon Communications", price: 39.84, change: 0.43, volume: "8.9M", marketCap: "$167.48B", sector: "Communication Services" },
  { symbol: "PFE", name: "Pfizer Inc", price: 28.95, change: -0.87, volume: "32.1M", marketCap: "$162.34B", sector: "Healthcare" },
  { symbol: "KO", name: "Coca-Cola Co", price: 62.45, change: 1.23, volume: "12.8M", marketCap: "$269.87B", sector: "Consumer Defensive" },
  { symbol: "INTC", name: "Intel Corp", price: 42.74, change: -1.63, volume: "26.7M", marketCap: "$179.82B", sector: "Technology" },
  { symbol: "CSCO", name: "Cisco Systems", price: 48.54, change: 0.78, volume: "12.3M", marketCap: "$196.92B", sector: "Technology" },
  { symbol: "MRK", name: "Merck & Co", price: 112.34, change: 2.45, volume: "8.7M", marketCap: "$284.56B", sector: "Healthcare" },
  { symbol: "T", name: "AT&T Inc", price: 18.92, change: -0.34, volume: "28.4M", marketCap: "$135.67B", sector: "Communication Services" },
  { symbol: "WMT", name: "Walmart Inc", price: 167.89, change: 1.56, volume: "7.2M", marketCap: "$456.78B", sector: "Consumer Defensive" },
  { symbol: "CVX", name: "Chevron Corp", price: 156.78, change: 2.87, volume: "9.8M", marketCap: "$298.45B", sector: "Energy" },
  { symbol: "XOM", name: "Exxon Mobil Corp", price: 112.45, change: 3.21, volume: "18.9M", marketCap: "$467.89B", sector: "Energy" },
  { symbol: "ABBV", name: "AbbVie Inc", price: 178.92, change: 1.87, volume: "6.4M", marketCap: "$316.78B", sector: "Healthcare" },
  { symbol: "CRM", name: "Salesforce Inc", price: 234.56, change: 4.23, volume: "5.8M", marketCap: "$234.67B", sector: "Technology" },
  { symbol: "ABT", name: "Abbott Laboratories", price: 108.76, change: 1.45, volume: "4.9M", marketCap: "$191.23B", sector: "Healthcare" },
  { symbol: "NKE", name: "Nike Inc", price: 98.45, change: 2.67, volume: "6.7M", marketCap: "$154.32B", sector: "Consumer Cyclical" },
  { symbol: "ORCL", name: "Oracle Corp", price: 118.92, change: 3.45, volume: "12.1M", marketCap: "$324.56B", sector: "Technology" },
  { symbol: "LLY", name: "Eli Lilly and Co", price: 567.89, change: 4.56, volume: "2.8M", marketCap: "$541.23B", sector: "Healthcare" },
  { symbol: "QCOM", name: "Qualcomm Inc", price: 156.78, change: 2.34, volume: "8.9M", marketCap: "$175.67B", sector: "Technology" },
  { symbol: "ACN", name: "Accenture PLC", price: 345.67, change: 1.89, volume: "1.9M", marketCap: "$218.45B", sector: "Technology" },
  { symbol: "C", name: "Citigroup Inc", price: 67.89, change: 2.45, volume: "15.6M", marketCap: "$134.56B", sector: "Financial Services" },
  { symbol: "UPS", name: "United Parcel Service", price: 178.45, change: 1.23, volume: "3.4M", marketCap: "$154.67B", sector: "Industrials" },
  { symbol: "MCD", name: "McDonald's Corp", price: 287.92, change: 0.87, volume: "2.8M", marketCap: "$213.45B", sector: "Consumer Cyclical" },
  { symbol: "COST", name: "Costco Wholesale Corp", price: 789.45, change: 3.21, volume: "1.7M", marketCap: "$349.87B", sector: "Consumer Defensive" },
  { symbol: "TXN", name: "Texas Instruments", price: 178.92, change: 2.45, volume: "4.5M", marketCap: "$164.32B", sector: "Technology" },
  { symbol: "BA", name: "Boeing Co", price: 234.56, change: -1.87, volume: "8.9M", marketCap: "$139.45B", sector: "Industrials" },
  { symbol: "MDT", name: "Medtronic PLC", price: 87.45, change: 1.23, volume: "5.6M", marketCap: "$116.78B", sector: "Healthcare" },
  { symbol: "AMGN", name: "Amgen Inc", price: 267.89, change: 2.34, volume: "2.9M", marketCap: "$147.56B", sector: "Healthcare" },
  { symbol: "BMY", name: "Bristol-Myers Squibb", price: 54.32, change: 0.87, volume: "8.7M", marketCap: "$116.45B", sector: "Healthcare" },
  { symbol: "CAT", name: "Caterpillar Inc", price: 298.76, change: 3.45, volume: "3.2M", marketCap: "$159.87B", sector: "Industrials" },
  { symbol: "HON", name: "Honeywell International", price: 198.45, change: 1.87, volume: "2.8M", marketCap: "$134.56B", sector: "Industrials" },
  { symbol: "IBM", name: "IBM Corp", price: 132.87, change: -1.35, volume: "5.6M", marketCap: "$121.56B", sector: "Technology" },
  { symbol: "UNP", name: "Union Pacific Corp", price: 234.56, change: 2.45, volume: "2.1M", marketCap: "$147.89B", sector: "Industrials" },
  { symbol: "SBUX", name: "Starbucks Corp", price: 98.76, change: 1.23, volume: "6.8M", marketCap: "$113.45B", sector: "Consumer Cyclical" },
  { symbol: "GS", name: "Goldman Sachs Group", price: 387.92, change: 2.87, volume: "2.4M", marketCap: "$132.67B", sector: "Financial Services" },
  { symbol: "GE", name: "General Electric Co", price: 156.78, change: 3.21, volume: "8.9M", marketCap: "$172.34B", sector: "Industrials" },
  { symbol: "DE", name: "Deere & Co", price: 398.45, change: 2.56, volume: "1.8M", marketCap: "$119.87B", sector: "Industrials" },
  { symbol: "LOW", name: "Lowe's Companies", price: 234.56, change: 1.87, volume: "3.9M", marketCap: "$147.23B", sector: "Consumer Cyclical" },
  { symbol: "BLK", name: "BlackRock Inc", price: 789.45, change: 3.45, volume: "0.8M", marketCap: "$119.56B", sector: "Financial Services" },
  { symbol: "SPGI", name: "S&P Global Inc", price: 456.78, change: 2.34, volume: "1.2M", marketCap: "$138.45B", sector: "Financial Services" },
  { symbol: "ADP", name: "Automatic Data Processing", price: 267.89, change: 1.56, volume: "1.9M", marketCap: "$112.34B", sector: "Technology" },
  { symbol: "MMM", name: "3M Co", price: 98.76, change: -0.87, volume: "4.5M", marketCap: "$56.78B", sector: "Industrials" },
  { symbol: "CVS", name: "CVS Health Corp", price: 67.89, change: 0.45, volume: "7.8M", marketCap: "$89.45B", sector: "Healthcare" },
  { symbol: "AMAT", name: "Applied Materials", price: 178.92, change: 4.56, volume: "6.7M", marketCap: "$159.87B", sector: "Technology" },
  { symbol: "ISRG", name: "Intuitive Surgical", price: 398.45, change: 3.21, volume: "1.4M", marketCap: "$142.67B", sector: "Healthcare" },
  { symbol: "NOW", name: "ServiceNow Inc", price: 678.92, change: 5.67, volume: "1.8M", marketCap: "$135.89B", sector: "Technology" },
  { symbol: "GILD", name: "Gilead Sciences", price: 78.45, change: 1.23, volume: "8.9M", marketCap: "$98.76B", sector: "Healthcare" },
  { symbol: "ZTS", name: "Zoetis Inc", price: 178.92, change: 2.34, volume: "2.1M", marketCap: "$84.56B", sector: "Healthcare" },
  { symbol: "SYK", name: "Stryker Corp", price: 298.76, change: 2.87, volume: "1.6M", marketCap: "$113.45B", sector: "Healthcare" },
  { symbol: "F", name: "Ford Motor Co", price: 12.45, change: -0.23, volume: "67.8M", marketCap: "$49.87B", sector: "Consumer Cyclical" },
  { symbol: "BKNG", name: "Booking Holdings", price: 3456.78, change: 12.34, volume: "0.4M", marketCap: "$134.56B", sector: "Consumer Cyclical" },
  { symbol: "ADI", name: "Analog Devices", price: 198.45, change: 3.21, volume: "2.8M", marketCap: "$103.45B", sector: "Technology" },
  { symbol: "MO", name: "Altria Group", price: 45.67, change: 0.87, volume: "8.9M", marketCap: "$84.32B", sector: "Consumer Defensive" },
  { symbol: "TMO", name: "Thermo Fisher Scientific", price: 567.89, change: 4.56, volume: "1.2M", marketCap: "$223.45B", sector: "Healthcare" },
  { symbol: "PLD", name: "Prologis Inc", price: 134.56, change: 2.34, volume: "3.4M", marketCap: "$99.87B", sector: "Real Estate" },
  { symbol: "EOG", name: "EOG Resources", price: 123.45, change: 3.87, volume: "4.5M", marketCap: "$72.34B", sector: "Energy" },
  { symbol: "FDX", name: "FedEx Corp", price: 267.89, change: 2.45, volume: "2.1M", marketCap: "$69.87B", sector: "Industrials" },
  { symbol: "CL", name: "Colgate-Palmolive Co", price: 78.92, change: 0.56, volume: "4.2M", marketCap: "$66.78B", sector: "Consumer Defensive" },
  { symbol: "CHTR", name: "Charter Communications", price: 398.45, change: -1.87, volume: "1.8M", marketCap: "$59.45B", sector: "Communication Services" },
  { symbol: "EMR", name: "Emerson Electric Co", price: 98.76, change: 1.23, volume: "3.9M", marketCap: "$58.67B", sector: "Industrials" },
  { symbol: "CSX", name: "CSX Corp", price: 34.56, change: 0.87, volume: "12.3M", marketCap: "$74.32B", sector: "Industrials" },
  { symbol: "SO", name: "Southern Co", price: 67.89, change: 0.45, volume: "5.6M", marketCap: "$72.45B", sector: "Utilities" },
  { symbol: "APD", name: "Air Products and Chemicals", price: 267.89, change: 2.34, volume: "1.4M", marketCap: "$59.87B", sector: "Basic Materials" },
  { symbol: "ICE", name: "Intercontinental Exchange", price: 134.56, change: 1.87, volume: "2.8M", marketCap: "$75.67B", sector: "Financial Services" },
  { symbol: "LRCX", name: "Lam Research Corp", price: 678.92, change: 8.45, volume: "1.2M", marketCap: "$94.56B", sector: "Technology" },
  { symbol: "SHW", name: "Sherwin-Williams Co", price: 298.76, change: 3.21, volume: "0.9M", marketCap: "$77.89B", sector: "Basic Materials" },
  { symbol: "AON", name: "Aon PLC", price: 345.67, change: 2.45, volume: "1.1M", marketCap: "$78.45B", sector: "Financial Services" },
  { symbol: "BIIB", name: "Biogen Inc", price: 234.56, change: -2.34, volume: "1.8M", marketCap: "$34.67B", sector: "Healthcare" },
  { symbol: "SPG", name: "Simon Property Group", price: 123.45, change: 1.87, volume: "2.4M", marketCap: "$45.67B", sector: "Real Estate" },
  { symbol: "NEM", name: "Newmont Corp", price: 45.67, change: 2.34, volume: "8.9M", marketCap: "$36.45B", sector: "Basic Materials" },
  { symbol: "ECL", name: "Ecolab Inc", price: 198.76, change: 1.56, volume: "1.2M", marketCap: "$56.78B", sector: "Basic Materials" },
  { symbol: "USB", name: "U.S. Bancorp", price: 45.67, change: 0.87, volume: "12.3M", marketCap: "$67.89B", sector: "Financial Services" },
  { symbol: "TGT", name: "Target Corp", price: 134.56, change: 2.45, volume: "4.5M", marketCap: "$61.23B", sector: "Consumer Cyclical" },
  { symbol: "PEP", name: "PepsiCo Inc", price: 167.89, change: 1.23, volume: "3.8M", marketCap: "$231.45B", sector: "Consumer Defensive" },
  { symbol: "AXP", name: "American Express Co", price: 198.76, change: 2.87, volume: "3.2M", marketCap: "$149.67B", sector: "Financial Services" },
  { symbol: "DD", name: "DuPont de Nemours", price: 78.92, change: 1.45, volume: "4.1M", marketCap: "$36.78B", sector: "Basic Materials" },
  { symbol: "GM", name: "General Motors Co", price: 45.67, change: -0.87, volume: "18.9M", marketCap: "$54.32B", sector: "Consumer Cyclical" },
  { symbol: "TWTR", name: "Twitter Inc", price: 54.32, change: 3.45, volume: "25.6M", marketCap: "$41.23B", sector: "Communication Services" },
  { symbol: "MRNA", name: "Moderna Inc", price: 123.45, change: -4.56, volume: "8.7M", marketCap: "$47.89B", sector: "Healthcare" },
  { symbol: "SQ", name: "Block Inc", price: 78.92, change: 5.67, volume: "12.3M", marketCap: "$45.67B", sector: "Technology" },
  { symbol: "SHOP", name: "Shopify Inc", price: 67.89, change: 4.23, volume: "8.9M", marketCap: "$85.43B", sector: "Technology" },
  { symbol: "DOCU", name: "DocuSign Inc", price: 56.78, change: -2.34, volume: "6.7M", marketCap: "$11.23B", sector: "Technology" },
  { symbol: "ROKU", name: "Roku Inc", price: 67.89, change: 6.78, volume: "9.8M", marketCap: "$7.45B", sector: "Communication Services" },
  { symbol: "SNAP", name: "Snap Inc", price: 12.34, change: -1.23, volume: "34.5M", marketCap: "$19.67B", sector: "Communication Services" },
  { symbol: "UBER", name: "Uber Technologies", price: 67.89, change: 3.45, volume: "18.9M", marketCap: "$139.45B", sector: "Technology" },
  { symbol: "LYFT", name: "Lyft Inc", price: 14.56, change: 2.34, volume: "12.3M", marketCap: "$5.67B", sector: "Technology" },
  { symbol: "ZM", name: "Zoom Video Communications", price: 78.92, change: -1.87, volume: "8.9M", marketCap: "$23.45B", sector: "Technology" },
  { symbol: "COIN", name: "Coinbase Global", price: 234.56, change: 8.92, volume: "6.7M", marketCap: "$60.23B", sector: "Financial Services" },
  { symbol: "PTON", name: "Peloton Interactive", price: 8.92, change: -0.45, volume: "15.6M", marketCap: "$3.12B", sector: "Consumer Cyclical" },
  { symbol: "BYND", name: "Beyond Meat Inc", price: 12.34, change: -2.34, volume: "4.5M", marketCap: "$0.78B", sector: "Consumer Defensive" },
  { symbol: "CRWD", name: "CrowdStrike Holdings", price: 198.76, change: 6.78, volume: "3.4M", marketCap: "$46.78B", sector: "Technology" },
  { symbol: "OKTA", name: "Okta Inc", price: 89.45, change: 4.56, volume: "2.8M", marketCap: "$14.56B", sector: "Technology" },
  { symbol: "TWLO", name: "Twilio Inc", price: 67.89, change: 3.21, volume: "4.5M", marketCap: "$12.34B", sector: "Technology" },
  { symbol: "MDB", name: "MongoDB Inc", price: 398.76, change: 7.89, volume: "1.8M", marketCap: "$26.78B", sector: "Technology" },
  { symbol: "TEAM", name: "Atlassian Corp", price: 178.92, change: 5.67, volume: "2.1M", marketCap: "$46.23B", sector: "Technology" },
  { symbol: "NET", name: "Cloudflare Inc", price: 78.92, change: 4.56, volume: "3.9M", marketCap: "$25.67B", sector: "Technology" },
  { symbol: "PINS", name: "Pinterest Inc", price: 34.56, change: 2.34, volume: "8.7M", marketCap: "$22.45B", sector: "Communication Services" },
  { symbol: "ETSY", name: "Etsy Inc", price: 123.45, change: 3.87, volume: "2.8M", marketCap: "$15.67B", sector: "Consumer Cyclical" },
  { symbol: "DKNG", name: "DraftKings Inc", price: 23.45, change: 4.56, volume: "12.3M", marketCap: "$9.78B", sector: "Consumer Cyclical" },
  { symbol: "PLTR", name: "Palantir Technologies", price: 16.78, change: 5.67, volume: "34.5M", marketCap: "$36.78B", sector: "Technology" },
  { symbol: "FSLY", name: "Fastly Inc", price: 12.34, change: -2.34, volume: "6.7M", marketCap: "$1.45B", sector: "Technology" },
  { symbol: "NIO", name: "NIO Inc", price: 8.92, change: 6.78, volume: "45.6M", marketCap: "$14.23B", sector: "Consumer Cyclical" },
  { symbol: "LI", name: "Li Auto Inc", price: 34.56, change: 7.89, volume: "18.9M", marketCap: "$34.67B", sector: "Consumer Cyclical" },
  { symbol: "XPEV", name: "XPeng Inc", price: 12.34, change: 5.67, volume: "23.4M", marketCap: "$10.45B", sector: "Consumer Cyclical" },
  { symbol: "RIVN", name: "Rivian Automotive", price: 23.45, change: -3.45, volume: "34.5M", marketCap: "$21.67B", sector: "Consumer Cyclical" },
  { symbol: "WKHS", name: "Workhorse Group", price: 1.23, change: 8.92, volume: "12.3M", marketCap: "$0.16B", sector: "Consumer Cyclical" },
  { symbol: "ZS", name: "Zscaler Inc", price: 178.92, change: 6.78, volume: "2.1M", marketCap: "$25.67B", sector: "Technology" },
  { symbol: "SNOW", name: "Snowflake Inc", price: 198.76, change: 8.45, volume: "3.4M", marketCap: "$62.34B", sector: "Technology" },
  { symbol: "HUBS", name: "HubSpot Inc", price: 567.89, change: 7.23, volume: "0.8M", marketCap: "$27.89B", sector: "Technology" },
  { symbol: "MSTR", name: "MicroStrategy Inc", price: 1234.56, change: 15.67, volume: "1.2M", marketCap: "$21.45B", sector: "Technology" },
  { symbol: "NVAX", name: "Novavax Inc", price: 12.34, change: -8.92, volume: "8.9M", marketCap: "$0.98B", sector: "Healthcare" },
  { symbol: "VEEV", name: "Veeva Systems", price: 198.76, change: 4.56, volume: "1.4M", marketCap: "$30.45B", sector: "Healthcare" },
  { symbol: "COUP", name: "Coupa Software", price: 78.92, change: 6.78, volume: "2.1M", marketCap: "$5.89B", sector: "Technology" },
  { symbol: "BILL", name: "Bill.com Holdings", price: 89.45, change: 5.67, volume: "1.8M", marketCap: "$9.23B", sector: "Technology" },
  { symbol: "UPST", name: "Upstart Holdings", price: 34.56, change: -4.56, volume: "3.9M", marketCap: "$2.78B", sector: "Technology" },
  { symbol: "AYX", name: "Alteryx Inc", price: 56.78, change: 3.45, volume: "1.2M", marketCap: "$3.89B", sector: "Technology" },
  { symbol: "PATH", name: "UiPath Inc", price: 23.45, change: 4.56, volume: "4.5M", marketCap: "$12.67B", sector: "Technology" },
  { symbol: "FVRR", name: "Fiverr International", price: 34.56, change: 6.78, volume: "2.8M", marketCap: "$1.23B", sector: "Technology" },
  { symbol: "ESTC", name: "Elastic NV", price: 78.92, change: 5.67, volume: "1.9M", marketCap: "$7.45B", sector: "Technology" },
  { symbol: "DASH", name: "DoorDash Inc", price: 89.45, change: 4.23, volume: "6.7M", marketCap: "$31.23B", sector: "Consumer Cyclical" },
  { symbol: "ABNB", name: "Airbnb Inc", price: 134.56, change: 3.87, volume: "4.5M", marketCap: "$86.78B", sector: "Consumer Cyclical" }
]

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
  sector: string
}

interface BuyModalProps {
  stock: Stock
  isOpen: boolean
  onClose: () => void
}

function BuyModal({ stock, isOpen, onClose }: BuyModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [limitPrice, setLimitPrice] = useState(stock.price)
  const { toast } = useToast()

  const totalCost = quantity * (orderType === 'market' ? stock.price : limitPrice)

  const handleBuy = () => {
    toast({
      title: "Order Placed!",
      description: `Successfully placed ${orderType} order for ${quantity} shares of ${stock.symbol} at $${(orderType === 'market' ? stock.price : limitPrice).toFixed(2)} per share.`,
    })
    onClose()
    setQuantity(1)
    setOrderType('market')
    setLimitPrice(stock.price)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy {stock.symbol}</DialogTitle>
          <DialogDescription>
            {stock.name} - ${stock.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Order Type</Label>
            <div className="flex gap-2">
              <Button
                variant={orderType === 'market' ? 'default' : 'outline'}
                onClick={() => setOrderType('market')}
                className="flex-1"
              >
                Market Order
              </Button>
              <Button
                variant={orderType === 'limit' ? 'default' : 'outline'}
                onClick={() => setOrderType('limit')}
                className="flex-1"
              >
                Limit Order
              </Button>
            </div>
          </div>

          {orderType === 'limit' && (
            <div className="space-y-2">
              <Label htmlFor="limit-price">Limit Price</Label>
              <Input
                id="limit-price"
                type="number"
                step="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Shares:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price per share:</span>
              <span>${(orderType === 'market' ? stock.price : limitPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total Cost:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Available Cash: <span className="font-medium text-foreground">$25,430.67</span>
            </div>
            <div className="text-sm text-muted-foreground">
              After Purchase: <span className="font-medium text-foreground">${(25430.67 - totalCost).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBuy} disabled={totalCost > 25430.67}>
            {totalCost > 25430.67 ? 'Insufficient Funds' : `Buy ${quantity} Share${quantity > 1 ? 's' : ''}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function StockCard({ stock }: { stock: Stock }) {
  const [showBuyModal, setShowBuyModal] = useState(false)
  const isPositive = stock.change >= 0

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-bold">{stock.symbol}</CardTitle>
              <CardDescription className="text-sm">{stock.name}</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {stock.sector}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
            <div className={`flex items-center text-sm font-medium ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {isPositive ? '+' : ''}{stock.change.toFixed(2)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="font-medium">Volume</div>
              <div>{stock.volume}</div>
            </div>
            <div>
              <div className="font-medium">Market Cap</div>
              <div>{stock.marketCap}</div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1" 
              onClick={() => setShowBuyModal(true)}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Buy
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <BuyModal 
        stock={stock} 
        isOpen={showBuyModal} 
        onClose={() => setShowBuyModal(false)} 
      />
    </>
  )
}

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState<string>("all")
  const [sortBy, setSortBy] = useState<'symbol' | 'price' | 'change' | 'volume'>('symbol')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Get unique sectors
  const sectors = Array.from(new Set(stocksData.map(stock => stock.sector))).sort()

  // Filter and sort stocks
  const filteredStocks = stocksData
    .filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSector = selectedSector === "all" || stock.sector === selectedSector
      return matchesSearch && matchesSector
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]
      
      if (sortBy === 'volume') {
        aValue = parseFloat(a.volume.replace('M', '').replace('B', '000'))
        bValue = parseFloat(b.volume.replace('M', '').replace('B', '000'))
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock Search</h2>
          <p className="text-muted-foreground">Find and buy stocks from our extensive catalog</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredStocks.length} of {stocksData.length} stocks
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
            placeholder="Search by symbol or company name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background text-sm"
          >
            <option value="all">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Sort by:</span>
        <Button
          variant={sortBy === 'symbol' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleSort('symbol')}
        >
          Symbol {sortBy === 'symbol' && (sortOrder === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          variant={sortBy === 'price' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleSort('price')}
        >
          Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          variant={sortBy === 'change' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleSort('change')}
        >
          Change {sortBy === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          variant={sortBy === 'volume' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleSort('volume')}
        >
          Volume {sortBy === 'volume' && (sortOrder === 'asc' ? '↑' : '↓')}
        </Button>
      </div>

      {/* Stock Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No stocks found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  )
}