import { BarChart3, PieChart, ArrowUpRight, ArrowDownRight, DollarSign, LineChart, Layers, ListFilter, Trophy, Medal, Award, Target, TrendingUp, Calendar, Users, Crown, Star, Zap, Shield, Flame, TrendingDown, Activity, Percent } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import PortfolioChart from "@/components/portfolio-chart"
import PortfolioHoldings from "@/components/portfolio-holdings"
import RankHistoryChart from "@/components/rank-history-chart"
import TournamentCard from "@/components/tournament-card"
import BadgeCollection from "@/components/badge-collection"
import ProfitLossChart from "@/components/profit-loss-chart"
import DiversificationChart from "@/components/diversification-chart"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  // Mock data for active tournaments
  const activeTournaments = [
    {
      id: 1,
      name: "Tech Stock Challenge",
      description: "Trade only technology stocks for maximum returns",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      participants: 1247,
      prize: "$500",
      currentRank: 23,
      totalParticipants: 1247,
      progress: 65,
      status: "active" as const
    },
    {
      id: 2,
      name: "Dividend Masters",
      description: "Focus on dividend-paying stocks for steady income",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      participants: 892,
      prize: "$300",
      currentRank: 8,
      totalParticipants: 892,
      progress: 45,
      status: "active" as const
    },
    {
      id: 3,
      name: "Rookie Tournament",
      description: "For new traders to learn and compete",
      startDate: "2025-01-20",
      endDate: "2025-02-20",
      participants: 2156,
      prize: "$200",
      currentRank: null,
      totalParticipants: 2156,
      progress: 25,
      status: "upcoming" as const
    }
  ]

  // Mock data for user badges
  const userBadges = [
    { id: 1, name: "First Trade", description: "Made your first trade", icon: <Target className="h-6 w-6" />, earned: true, earnedDate: "2025-01-01" },
    { id: 2, name: "Profit Maker", description: "Achieved 10% portfolio growth", icon: <TrendingUp className="h-6 w-6" />, earned: true, earnedDate: "2025-01-05" },
    { id: 3, name: "Diversified", description: "Own stocks from 5 different sectors", icon: <PieChart className="h-6 w-6" />, earned: true, earnedDate: "2025-01-08" },
    { id: 4, name: "Day Trader", description: "Complete 10 trades in one day", icon: <Zap className="h-6 w-6" />, earned: false },
    { id: 5, name: "Diamond Hands", description: "Hold a stock for 30+ days", icon: <Shield className="h-6 w-6" />, earned: false },
    { id: 6, name: "Hot Streak", description: "5 profitable trades in a row", icon: <Flame className="h-6 w-6" />, earned: true, earnedDate: "2025-01-12" },
    { id: 7, name: "Tournament Winner", description: "Win a trading tournament", icon: <Crown className="h-6 w-6" />, earned: false },
    { id: 8, name: "Consistent Trader", description: "Trade for 30 consecutive days", icon: <Calendar className="h-6 w-6" />, earned: false }
  ]

  const earnedBadges = userBadges.filter(badge => badge.earned)
  const availableBadges = userBadges.filter(badge => !badge.earned)

  // Mock P&L data
  const portfolioMetrics = {
    totalValue: 15245.32,
    totalCost: 14402.20,
    totalGainLoss: 843.12,
    totalGainLossPercent: 5.85,
    dayGainLoss: 127.45,
    dayGainLossPercent: 0.84,
    realizedGainLoss: 234.67,
    unrealizedGainLoss: 608.45,
    dividendsReceived: 45.30
  }

  // Mock diversification data
  const diversificationData = [
    { sector: "Technology", value: 5523.45, percentage: 36.2, color: "#3b82f6" },
    { sector: "Healthcare", value: 2287.34, percentage: 15.0, color: "#10b981" },
    { sector: "Financial", value: 1829.12, percentage: 12.0, color: "#f59e0b" },
    { sector: "Consumer", value: 1524.53, percentage: 10.0, color: "#ef4444" },
    { sector: "Industrial", value: 1372.89, percentage: 9.0, color: "#8b5cf6" },
    { sector: "Energy", value: 1219.67, percentage: 8.0, color: "#06b6d4" },
    { sector: "Utilities", value: 914.75, percentage: 6.0, color: "#84cc16" },
    { sector: "Materials", value: 573.57, percentage: 3.8, color: "#f97316" }
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your trading overview.</p>
        </div>
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
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">P&L Analytics</TabsTrigger>
          <TabsTrigger value="diversification">Diversification</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Portfolio Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Portfolio Value
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioMetrics.totalValue.toLocaleString()}</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +${portfolioMetrics.totalGainLoss.toFixed(2)} ({portfolioMetrics.totalGainLossPercent.toFixed(2)}%)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Day's Gain/Loss
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+${portfolioMetrics.dayGainLoss.toFixed(2)}</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +{portfolioMetrics.dayGainLossPercent.toFixed(2)}% today
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Rank
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#42</div>
                <p className="text-xs text-green-500 flex items-center">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +3 positions this week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Badges Earned
                </CardTitle>
                <Medal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{earnedBadges.length}</div>
                <p className="text-xs text-muted-foreground">
                  {availableBadges.length} more to unlock
                </p>
              </CardContent>
            </Card>
          </div>

          {/* P&L Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Realized P&L
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+${portfolioMetrics.realizedGainLoss.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  From closed positions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unrealized P&L
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+${portfolioMetrics.unrealizedGainLoss.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  From open positions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dividends Received
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioMetrics.dividendsReceived.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Diversification Score
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.2/10</div>
                <p className="text-xs text-green-500">
                  Well diversified
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Performance Chart */}
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
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>
                  Portfolio diversification by sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {diversificationData.slice(0, 5).map((sector, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: sector.color }}
                        />
                        <span className="text-sm font-medium">{sector.sector}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{sector.percentage}%</div>
                        <div className="text-xs text-muted-foreground">${sector.value.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Breakdown
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Active Tournaments Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Tournaments</CardTitle>
                <CardDescription>
                  Compete with other traders and win prizes
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {activeTournaments.slice(0, 2).map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} compact />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Profit & Loss Analytics</h3>
              <p className="text-sm text-muted-foreground">Detailed breakdown of your trading performance</p>
            </div>
          </div>

          {/* P&L Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Cost Basis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioMetrics.totalCost.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Amount invested</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Market Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${portfolioMetrics.totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current worth</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Net Gain/Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+${portfolioMetrics.totalGainLoss.toFixed(2)}</div>
                <p className="text-xs text-green-500">+{portfolioMetrics.totalGainLossPercent.toFixed(2)}% return</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.5%</div>
                <p className="text-xs text-muted-foreground">87 of 127 trades</p>
              </CardContent>
            </Card>
          </div>

          {/* P&L Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Over Time</CardTitle>
              <CardDescription>Track your realized and unrealized gains/losses</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfitLossChart />
            </CardContent>
          </Card>

          {/* Detailed P&L Breakdown */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>P&L Breakdown</CardTitle>
                <CardDescription>Realized vs unrealized gains</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Realized Gains</span>
                  <span className="text-sm font-bold text-green-500">+${portfolioMetrics.realizedGainLoss.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Unrealized Gains</span>
                  <span className="text-sm font-bold text-green-500">+${portfolioMetrics.unrealizedGainLoss.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Dividend Income</span>
                  <span className="text-sm font-bold">+${portfolioMetrics.dividendsReceived.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total P&L</span>
                  <span className="font-bold text-green-500">+${(portfolioMetrics.realizedGainLoss + portfolioMetrics.unrealizedGainLoss + portfolioMetrics.dividendsReceived).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Statistics</CardTitle>
                <CardDescription>Your trading performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Winning Trades</span>
                  <span className="font-medium text-green-500">87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Losing Trades</span>
                  <span className="font-medium text-red-500">40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Win</span>
                  <span className="font-medium text-green-500">+$247.32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Loss</span>
                  <span className="font-medium text-red-500">-$105.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Profit Factor</span>
                  <span className="font-medium">2.34</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diversification" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Portfolio Diversification</h3>
              <p className="text-sm text-muted-foreground">Analyze your portfolio's risk distribution</p>
            </div>
            <Badge variant="outline" className="text-green-500 border-green-500">
              Diversification Score: 8.2/10
            </Badge>
          </div>

          {/* Diversification Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sectors Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Out of 11 sectors</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Largest Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36.2%</div>
                <p className="text-xs text-muted-foreground">Technology sector</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">Medium</div>
                <p className="text-xs text-muted-foreground">Balanced allocation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Concentration Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">Low</div>
                <p className="text-xs text-muted-foreground">Well distributed</p>
              </CardContent>
            </Card>
          </div>

          {/* Diversification Chart */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Portfolio distribution by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <DiversificationChart data={diversificationData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Breakdown</CardTitle>
                <CardDescription>Detailed allocation percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {diversificationData.map((sector, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: sector.color }}
                          />
                          <span className="text-sm font-medium">{sector.sector}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{sector.percentage}%</div>
                          <div className="text-xs text-muted-foreground">${sector.value.toLocaleString()}</div>
                        </div>
                      </div>
                      <Progress value={sector.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diversification Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Diversification Recommendations</CardTitle>
              <CardDescription>Suggestions to improve your portfolio balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="p-1 bg-blue-500 rounded-full">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100">Consider reducing Technology exposure</div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your Technology allocation (36.2%) is above the recommended 25-30% for balanced portfolios.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="p-1 bg-green-500 rounded-full">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100">Add Real Estate exposure</div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Consider adding REITs or real estate stocks to improve diversification (currently 0%).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <div className="p-1 bg-yellow-500 rounded-full">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-yellow-900 dark:text-yellow-100">Increase International exposure</div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Consider adding international stocks or ETFs to reduce geographic concentration risk.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+52.45%</div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+18.7%</div>
                <p className="text-xs text-muted-foreground">January 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.84</div>
                <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">-8.2%</div>
                <p className="text-xs text-muted-foreground">Largest decline</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rank History</CardTitle>
                <CardDescription>Your leaderboard position over time</CardDescription>
              </CardHeader>
              <CardContent>
                <RankHistoryChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Returns by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { month: "January 2025", return: "+18.7%", status: "positive" },
                    { month: "December 2024", return: "+12.3%", status: "positive" },
                    { month: "November 2024", return: "-2.1%", status: "negative" },
                    { month: "October 2024", return: "+8.9%", status: "positive" },
                    { month: "September 2024", return: "+15.2%", status: "positive" }
                  ].map((month, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{month.month}</span>
                      <span className={`font-medium ${month.status === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                        {month.return}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed analysis of your trading performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Win Rate</span>
                      <span>68.5%</span>
                    </div>
                    <Progress value={68.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profit Factor</span>
                      <span>2.34</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Win</span>
                      <span>$247.32</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Loss</span>
                      <span>-$105.67</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Largest Win</span>
                      <span>$1,247.32</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Largest Loss</span>
                      <span>-$432.18</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Tournaments</h3>
              <p className="text-sm text-muted-foreground">Compete with other traders and win prizes</p>
            </div>
            <Button>
              <Trophy className="mr-2 h-4 w-4" />
              Create Tournament
            </Button>
          </div>

          <div className="grid gap-4">
            {activeTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tournament History</CardTitle>
              <CardDescription>Your past tournament performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "December Growth Challenge", rank: 5, participants: 1834, prize: "$100", status: "completed" },
                  { name: "Black Friday Trading", rank: 12, participants: 2156, prize: "$50", status: "completed" },
                  { name: "Thanksgiving Special", rank: 3, participants: 892, prize: "$200", status: "completed" }
                ].map((tournament, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{tournament.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Rank #{tournament.rank} of {tournament.participants} participants
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={tournament.rank <= 3 ? "default" : "secondary"}>
                        {tournament.rank <= 3 ? `Won ${tournament.prize}` : "Completed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Achievement Badges</h3>
              <p className="text-sm text-muted-foreground">
                Unlock badges by completing trading milestones and challenges
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {earnedBadges.length} of {userBadges.length} earned
            </div>
          </div>

          <BadgeCollection badges={userBadges} />
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
      </Tabs>
    </div>
  )
}