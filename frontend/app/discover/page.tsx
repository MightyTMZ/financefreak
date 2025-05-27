import { Search, Filter, TrendingUp, DollarSign, Briefcase, Monitor } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import StockCategoryList from "@/components/stock-category-list"

export default function DiscoverPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Discover</h2>
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Trending Stocks</CardTitle>
            </div>
            <CardDescription>
              Most viewed stocks today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {symbol: "TSLA", name: "Tesla Inc", price: "$243.55"},
                {symbol: "AAPL", name: "Apple Inc", price: "$174.95"},
                {symbol: "NVDA", name: "NVIDIA Corp", price: "$233.17"},
                {symbol: "META", name: "Meta Platforms", price: "$306.42"},
                {symbol: "MSFT", name: "Microsoft Corp", price: "$331.28"}
              ].map((stock, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">
                        {stock.symbol}
                      </div>
                      <div className="font-medium">{stock.name}</div>
                    </div>
                    <div className="font-medium">{stock.price}</div>
                  </div>
                  {i < 4 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/market/trending">View All Trending</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <CardTitle>Dividend Stocks</CardTitle>
            </div>
            <CardDescription>
              Stocks with the highest dividend yields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {symbol: "VZ", name: "Verizon Communications", yield: "6.83%"},
                {symbol: "XOM", name: "Exxon Mobil Corp", yield: "4.12%"},
                {symbol: "IBM", name: "IBM Corp", yield: "3.92%"},
                {symbol: "PFE", name: "Pfizer Inc", yield: "3.78%"},
                {symbol: "CVX", name: "Chevron Corp", yield: "3.65%"}
              ].map((stock, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">
                        {stock.symbol}
                      </div>
                      <div className="font-medium">{stock.name}</div>
                    </div>
                    <div className="font-medium">{stock.yield}</div>
                  </div>
                  {i < 4 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/market/dividends">View All Dividend Stocks</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle>Growth Stocks</CardTitle>
            </div>
            <CardDescription>
              Stocks with high growth potential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {symbol: "NVDA", name: "NVIDIA Corp", growth: "+124.7%"},
                {symbol: "TSLA", name: "Tesla Inc", growth: "+83.2%"},
                {symbol: "AMD", name: "Advanced Micro Devices", growth: "+69.5%"},
                {symbol: "SHOP", name: "Shopify Inc", growth: "+58.3%"},
                {symbol: "AMZN", name: "Amazon.com Inc", growth: "+53.7%"}
              ].map((stock, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">
                        {stock.symbol}
                      </div>
                      <div className="font-medium">{stock.name}</div>
                    </div>
                    <div className="font-medium text-green-500">{stock.growth}</div>
                  </div>
                  {i < 4 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/market/growth">View All Growth Stocks</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
          <CardDescription>
            Explore stocks by industry sector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StockCategoryList />
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <CardTitle>Technology Sector Spotlight</CardTitle>
            </div>
            <CardDescription>
              Top performing technology stocks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                {symbol: "NVDA", name: "NVIDIA Corp", price: "$233.17", change: "+6.32%"},
                {symbol: "AAPL", name: "Apple Inc", price: "$174.95", change: "+5.87%"},
                {symbol: "AMD", name: "Advanced Micro Devices", price: "$106.43", change: "+4.91%"},
                {symbol: "MSFT", name: "Microsoft Corp", price: "$331.28", change: "+3.86%"},
                {symbol: "GOOG", name: "Alphabet Inc", price: "$134.72", change: "+2.54%"}
              ].map((stock, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">
                        {stock.symbol}
                      </div>
                      <div className="font-medium">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{stock.price}</div>
                      <div className="text-xs text-green-500">{stock.change}</div>
                    </div>
                  </div>
                  {i < 4 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/market/sectors/technology">View All Technology Stocks</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Investment Ideas</CardTitle>
            <CardDescription>
              Curated stock collections for different investment strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/market/collections/blue-chip" className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="font-medium">Blue Chip Stocks</div>
                <p className="text-sm text-muted-foreground">
                  Established, financially sound companies with reliable performance
                </p>
              </Link>
              <Link href="/market/collections/growth" className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="font-medium">Growth Stocks</div>
                <p className="text-sm text-muted-foreground">
                  Companies expected to grow at an above-average rate
                </p>
              </Link>
              <Link href="/market/collections/value" className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="font-medium">Value Stocks</div>
                <p className="text-sm text-muted-foreground">
                  Companies that appear to be undervalued based on fundamental analysis
                </p>
              </Link>
              <Link href="/market/collections/dividend" className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="font-medium">Dividend Stocks</div>
                <p className="text-sm text-muted-foreground">
                  Companies that regularly distribute earnings to shareholders
                </p>
              </Link>
              <Link href="/market/collections/tech" className="block p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="font-medium">Tech Leaders</div>
                <p className="text-sm text-muted-foreground">
                  Leading companies in the technology sector
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}