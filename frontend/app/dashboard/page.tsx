import { BarChart3, PieChart, ArrowUpRight, ArrowDownRight, DollarSign, LineChart, Layers, ListFilter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PortfolioChart from "@/components/portfolio-chart"
import PortfolioHoldings from "@/components/portfolio-holdings"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ListFilter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <DollarSign className="h-3.5 w-3.5" />
            <span>Buy Stocks</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Portfolio Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$15,245.32</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +$843.12 (5.43%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Cash
                </CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4,320.67</div>
                <p className="text-xs text-muted-foreground">
                  Ready to invest
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Return
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$329.45</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +2.15%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Return
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245.32</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +12.45%
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>
                    Your portfolio's performance over time
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">1D</Badge>
                  <Badge variant="outline">1W</Badge>
                  <Badge variant="secondary">1M</Badge>
                  <Badge variant="outline">1Y</Badge>
                  <Badge variant="outline">All</Badge>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <PortfolioChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Breakdown of your portfolio by asset type
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[300px]">
                <PieChart className="h-48 w-48 text-muted-foreground/50" />
              </CardContent>
              <CardFooter className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Technology</span>
                  <span>42.5%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Finance</span>
                  <span>28.3%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Healthcare</span>
                  <span>15.7%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Consumer</span>
                  <span>8.2%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Energy</span>
                  <span>3.1%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">Other</span>
                  <span>2.2%</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Your best performing stocks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">TSLA</div>
                      <div>
                        <div className="font-medium">Tesla Inc</div>
                        <div className="text-xs text-muted-foreground">10 shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2,435.50</div>
                      <div className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +8.21%
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">AAPL</div>
                      <div>
                        <div className="font-medium">Apple Inc</div>
                        <div className="text-xs text-muted-foreground">15 shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$2,624.25</div>
                      <div className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +6.32%
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-primary/10 text-primary p-2 rounded">NVDA</div>
                      <div>
                        <div className="font-medium">NVIDIA Corp</div>
                        <div className="text-xs text-muted-foreground">8 shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,865.60</div>
                      <div className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        +5.87%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Worst Performers</CardTitle>
                <CardDescription>Your poorest performing stocks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-destructive/10 text-destructive p-2 rounded">META</div>
                      <div>
                        <div className="font-medium">Meta Platforms</div>
                        <div className="text-xs text-muted-foreground">5 shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,532.35</div>
                      <div className="text-xs text-destructive flex items-center justify-end">
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                        -3.42%
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-destructive/10 text-destructive p-2 rounded">NFLX</div>
                      <div>
                        <div className="font-medium">Netflix Inc</div>
                        <div className="text-xs text-muted-foreground">3 shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,243.62</div>
                      <div className="text-xs text-destructive flex items-center justify-end">
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                        -2.18%
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono bg-destructive/10 text-destructive p-2 rounded">INTC</div>
                      <div>
                        <div className="font-medium">Intel Corp</div>
                        <div className="text-xs text-muted-foreground">20 shares</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$854.80</div>
                      <div className="text-xs text-destructive flex items-center justify-end">
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                        -1.63%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="holdings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>
                All stocks currently in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioHoldings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent transactions and account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded ${i % 2 === 0 ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}>
                        {i % 2 === 0 ? "BUY" : "SELL"}
                      </div>
                      <div>
                        <div className="font-medium">
                          {["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"][i]} - {["Apple Inc", "Microsoft Corp", "Alphabet Inc", "Amazon.com Inc", "Tesla Inc"][i]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()} at {new Date(Date.now() - i * 3600000).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {i % 2 === 0 ? "-" : "+"} ${(Math.random() * 1000 + 500).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 10 + 1)} shares @ ${(Math.random() * 200 + 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}