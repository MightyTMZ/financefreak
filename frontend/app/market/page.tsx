import { Search, Filter, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import StockList from "@/components/stock-list"

export default function MarketPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Market</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
              placeholder="Search for stocks..." 
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="stocks">All Stocks</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="movers">Top Movers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  S&P 500
                </CardTitle>
                <Badge variant="outline">US</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,582.64</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +25.41 (0.56%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  NASDAQ
                </CardTitle>
                <Badge variant="outline">US</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14,346.02</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +120.66 (0.85%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  DOW JONES
                </CardTitle>
                <Badge variant="outline">US</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36,117.38</div>
                <p className="text-xs text-red-500 flex items-center">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  -34.34 (-0.09%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  RUSSELL 2000
                </CardTitle>
                <Badge variant="outline">US</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,912.81</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +15.14 (0.8%)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Gainers</CardTitle>
                <CardDescription>Stocks with the highest daily gains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {symbol: "TSLA", name: "Tesla Inc", change: "+8.21%", price: "$243.55"},
                    {symbol: "NVDA", name: "NVIDIA Corp", change: "+6.32%", price: "$233.17"},
                    {symbol: "AAPL", name: "Apple Inc", change: "+5.87%", price: "$174.95"},
                    {symbol: "AMD", name: "Advanced Micro Devices", change: "+4.91%", price: "$106.43"},
                    {symbol: "MSFT", name: "Microsoft Corp", change: "+3.86%", price: "$331.28"}
                  ].map((stock, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-mono bg-primary/10 text-primary p-2 rounded">
                            {stock.symbol}
                          </div>
                          <div>
                            <div className="font-medium">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stock.price}</div>
                          <div className="text-xs text-green-500 flex items-center justify-end">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            {stock.change}
                          </div>
                        </div>
                      </div>
                      {i < 4 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/market/gainers">View All Gainers</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Losers</CardTitle>
                <CardDescription>Stocks with the highest daily losses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {symbol: "META", name: "Meta Platforms", change: "-3.42%", price: "$306.42"},
                    {symbol: "NFLX", name: "Netflix Inc", change: "-2.18%", price: "$414.54"},
                    {symbol: "INTC", name: "Intel Corp", change: "-1.63%", price: "$42.74"},
                    {symbol: "IBM", name: "IBM Corp", change: "-1.35%", price: "$132.87"},
                    {symbol: "DIS", name: "Walt Disney Co", change: "-1.12%", price: "$95.33"}
                  ].map((stock, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-mono bg-destructive/10 text-destructive p-2 rounded">
                            {stock.symbol}
                          </div>
                          <div>
                            <div className="font-medium">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stock.price}</div>
                          <div className="text-xs text-destructive flex items-center justify-end">
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                            {stock.change}
                          </div>
                        </div>
                      </div>
                      {i < 4 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/market/losers">View All Losers</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Sectors</CardTitle>
              <CardDescription>Performance by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {name: "Technology", change: "+1.42%", status: "up"},
                  {name: "Healthcare", change: "+0.85%", status: "up"},
                  {name: "Consumer Cyclical", change: "+0.62%", status: "up"},
                  {name: "Communication Services", change: "+0.54%", status: "up"},
                  {name: "Industrials", change: "+0.21%", status: "up"},
                  {name: "Financial Services", change: "-0.12%", status: "down"},
                  {name: "Real Estate", change: "-0.34%", status: "down"},
                  {name: "Basic Materials", change: "-0.45%", status: "down"},
                  {name: "Energy", change: "-0.86%", status: "down"}
                ].map((sector, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="font-medium">{sector.name}</div>
                    <div className={`text-sm ${sector.status === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
                      {sector.status === "up" ? 
                        <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      }
                      {sector.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Stocks</CardTitle>
              <CardDescription>
                Browse and search for stocks to add to your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StockList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="watchlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>
                Stocks you're keeping an eye on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Your watchlist is empty</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add stocks to your watchlist to track their performance
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/market/stocks">Browse Stocks</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="movers" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Top Gainers</CardTitle>
                  <CardDescription>Highest % increase today</CardDescription>
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {symbol: "TSLA", name: "Tesla Inc", change: "+8.21%", price: "$243.55"},
                    {symbol: "NVDA", name: "NVIDIA Corp", change: "+6.32%", price: "$233.17"},
                    {symbol: "AAPL", name: "Apple Inc", change: "+5.87%", price: "$174.95"},
                    {symbol: "AMD", name: "Advanced Micro Devices", change: "+4.91%", price: "$106.43"},
                    {symbol: "MSFT", name: "Microsoft Corp", change: "+3.86%", price: "$331.28"}
                  ].map((stock, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-mono bg-primary/10 text-primary p-2 rounded">
                            {stock.symbol}
                          </div>
                          <div>
                            <div className="font-medium">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stock.price}</div>
                          <div className="text-xs text-green-500 flex items-center justify-end">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            {stock.change}
                          </div>
                        </div>
                      </div>
                      {i < 4 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Top Losers</CardTitle>
                  <CardDescription>Highest % decrease today</CardDescription>
                </div>
                <TrendingDown className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {symbol: "META", name: "Meta Platforms", change: "-3.42%", price: "$306.42"},
                    {symbol: "NFLX", name: "Netflix Inc", change: "-2.18%", price: "$414.54"},
                    {symbol: "INTC", name: "Intel Corp", change: "-1.63%", price: "$42.74"},
                    {symbol: "IBM", name: "IBM Corp", change: "-1.35%", price: "$132.87"},
                    {symbol: "DIS", name: "Walt Disney Co", change: "-1.12%", price: "$95.33"}
                  ].map((stock, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="font-mono bg-destructive/10 text-destructive p-2 rounded">
                            {stock.symbol}
                          </div>
                          <div>
                            <div className="font-medium">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stock.price}</div>
                          <div className="text-xs text-destructive flex items-center justify-end">
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                            {stock.change}
                          </div>
                        </div>
                      </div>
                      {i < 4 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Most Active</CardTitle>
              <CardDescription>Stocks with the highest trading volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {symbol: "AAPL", name: "Apple Inc", volume: "72.4M", price: "$174.95", change: "+5.87%", status: "up"},
                  {symbol: "TSLA", name: "Tesla Inc", volume: "65.2M", price: "$243.55", change: "+8.21%", status: "up"},
                  {symbol: "AMD", name: "Advanced Micro Devices", volume: "58.7M", price: "$106.43", change: "+4.91%", status: "up"},
                  {symbol: "NVDA", name: "NVIDIA Corp", volume: "49.3M", price: "$233.17", change: "+6.32%", status: "up"},
                  {symbol: "META", name: "Meta Platforms", volume: "42.8M", price: "$306.42", change: "-3.42%", status: "down"},
                  {symbol: "MSFT", name: "Microsoft Corp", volume: "38.6M", price: "$331.28", change: "+3.86%", status: "up"}
                ].map((stock, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`font-mono p-2 rounded ${stock.status === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                        {stock.symbol}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{stock.name}</div>
                        <div className="text-xs text-muted-foreground">Vol: {stock.volume}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{stock.price}</div>
                      <div className={`text-xs ${stock.status === "up" ? "text-green-500" : "text-red-500"} flex items-center justify-end`}>
                        {stock.status === "up" ? 
                          <ArrowUpRight className="mr-1 h-3 w-3" /> : 
                          <ArrowDownRight className="mr-1 h-3 w-3" />
                        }
                        {stock.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/market/active">View All Most Active</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}