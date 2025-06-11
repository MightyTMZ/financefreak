"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target, AlertTriangle, Award, Calendar, DollarSign, Percent, ArrowUpRight, ArrowDownRight, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RiskMetricsChart from "@/components/risk-metrics-chart"
import BenchmarkComparisonChart from "@/components/benchmark-comparison-chart"
import TradeHistoryTable from "@/components/trade-history-table"
import VolatilityChart from "@/components/volatility-chart"
import DrawdownChart from "@/components/drawdown-chart"

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("1Y")
  const [benchmark, setBenchmark] = useState("SPY")

  // Mock performance data
  const performanceMetrics = {
    totalReturn: 24.67,
    annualizedReturn: 18.45,
    volatility: 16.23,
    sharpeRatio: 1.84,
    sortinoRatio: 2.31,
    maxDrawdown: -8.2,
    calmarRatio: 2.25,
    beta: 1.12,
    alpha: 6.78,
    informationRatio: 0.89,
    trackingError: 4.56,
    winRate: 68.5,
    profitFactor: 2.34,
    averageWin: 247.32,
    averageLoss: -105.67,
    largestWin: 1247.32,
    largestLoss: -432.18,
    consecutiveWins: 7,
    consecutiveLosses: 3,
    totalTrades: 127,
    winningTrades: 87,
    losingTrades: 40
  }

  // Mock benchmark data
  const benchmarkData = {
    SPY: { name: "S&P 500", return: 16.23, volatility: 14.56 },
    QQQ: { name: "NASDAQ 100", return: 22.45, volatility: 18.92 },
    DIA: { name: "Dow Jones", return: 12.78, volatility: 13.21 },
    IWM: { name: "Russell 2000", return: 14.32, volatility: 19.87 }
  }

  // Risk assessment
  const getRiskLevel = (volatility: number) => {
    if (volatility < 10) return { level: "Low", color: "text-green-500", bg: "bg-green-50 dark:bg-green-950/20" }
    if (volatility < 20) return { level: "Medium", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20" }
    return { level: "High", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" }
  }

  const riskLevel = getRiskLevel(performanceMetrics.volatility)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Performance Analytics</h2>
          <p className="text-muted-foreground">Comprehensive analysis of your portfolio performance and risk metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">1M</SelectItem>
              <SelectItem value="3M">3M</SelectItem>
              <SelectItem value="6M">6M</SelectItem>
              <SelectItem value="1Y">1Y</SelectItem>
              <SelectItem value="3Y">3Y</SelectItem>
              <SelectItem value="ALL">All</SelectItem>
            </SelectContent>
          </Select>
          <Select value={benchmark} onValueChange={setBenchmark}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SPY">S&P 500</SelectItem>
              <SelectItem value="QQQ">NASDAQ 100</SelectItem>
              <SelectItem value="DIA">Dow Jones</SelectItem>
              <SelectItem value="IWM">Russell 2000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="risk-metrics">Risk Metrics</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmark Comparison</TabsTrigger>
          <TabsTrigger value="trade-history">Trade History</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Performance Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+{performanceMetrics.totalReturn}%</div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Annualized Return</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+{performanceMetrics.annualizedReturn}%</div>
                <p className="text-xs text-muted-foreground">Per year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.sharpeRatio}</div>
                <p className="text-xs text-green-500">Excellent risk-adjusted return</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{performanceMetrics.maxDrawdown}%</div>
                <p className="text-xs text-muted-foreground">Largest decline</p>
              </CardContent>
            </Card>
          </div>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Overall portfolio risk evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className={`p-4 rounded-lg ${riskLevel.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`h-5 w-5 ${riskLevel.color}`} />
                    <span className="font-medium">Risk Level</span>
                  </div>
                  <div className={`text-2xl font-bold ${riskLevel.color}`}>{riskLevel.level}</div>
                  <p className="text-sm text-muted-foreground">Volatility: {performanceMetrics.volatility}%</p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Beta</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-500">{performanceMetrics.beta}</div>
                  <p className="text-sm text-muted-foreground">vs {benchmarkData[benchmark as keyof typeof benchmarkData].name}</p>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Alpha</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-500">+{performanceMetrics.alpha}%</div>
                  <p className="text-sm text-muted-foreground">Excess return</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance vs Benchmark */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance vs Benchmark</CardTitle>
                <CardDescription>Your portfolio vs {benchmarkData[benchmark as keyof typeof benchmarkData].name}</CardDescription>
              </CardHeader>
              <CardContent>
                <BenchmarkComparisonChart timeframe={timeframe} benchmark={benchmark} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Metrics</CardTitle>
                <CardDescription>Detailed performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Your Return</span>
                  <span className="text-sm font-bold text-green-500">+{performanceMetrics.annualizedReturn}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{benchmarkData[benchmark as keyof typeof benchmarkData].name} Return</span>
                  <span className="text-sm font-bold">{benchmarkData[benchmark as keyof typeof benchmarkData].return}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Outperformance</span>
                  <span className="text-sm font-bold text-green-500">+{(performanceMetrics.annualizedReturn - benchmarkData[benchmark as keyof typeof benchmarkData].return).toFixed(2)}%</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Your Volatility</span>
                  <span className="text-sm font-bold">{performanceMetrics.volatility}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Benchmark Volatility</span>
                  <span className="text-sm font-bold">{benchmarkData[benchmark as keyof typeof benchmarkData].volatility}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Information Ratio</span>
                  <span className="text-sm font-bold">{performanceMetrics.informationRatio}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Performance Summary</CardTitle>
              <CardDescription>Overview of your trading statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{performanceMetrics.totalTrades}</div>
                  <div className="text-sm text-muted-foreground">Total Trades</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{performanceMetrics.winRate}%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{performanceMetrics.profitFactor}</div>
                  <div className="text-sm text-muted-foreground">Profit Factor</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-500">${performanceMetrics.averageWin}</div>
                  <div className="text-sm text-muted-foreground">Avg Win</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.volatility}%</div>
                <p className="text-xs text-muted-foreground">Annualized standard deviation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{performanceMetrics.sharpeRatio}</div>
                <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sortino Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{performanceMetrics.sortinoRatio}</div>
                <p className="text-xs text-muted-foreground">Downside risk-adjusted</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Calmar Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.calmarRatio}</div>
                <p className="text-xs text-muted-foreground">Return vs max drawdown</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Volatility Analysis</CardTitle>
                <CardDescription>Rolling volatility over time</CardDescription>
              </CardHeader>
              <CardContent>
                <VolatilityChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drawdown Analysis</CardTitle>
                <CardDescription>Portfolio drawdowns and recovery periods</CardDescription>
              </CardHeader>
              <CardContent>
                <DrawdownChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics Breakdown</CardTitle>
              <CardDescription>Detailed risk analysis of your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskMetricsChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Ratios</CardTitle>
                <CardDescription>Key risk-adjusted performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sharpe Ratio</span>
                    <span className="font-medium">{performanceMetrics.sharpeRatio}</span>
                  </div>
                  <Progress value={Math.min(performanceMetrics.sharpeRatio * 33.33, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Excellent (&gt;1.5)</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sortino Ratio</span>
                    <span className="font-medium">{performanceMetrics.sortinoRatio}</span>
                  </div>
                  <Progress value={Math.min(performanceMetrics.sortinoRatio * 25, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Excellent (&gt;2.0)</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Calmar Ratio</span>
                    <span className="font-medium">{performanceMetrics.calmarRatio}</span>
                  </div>
                  <Progress value={Math.min(performanceMetrics.calmarRatio * 25, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Good (&gt;1.5)</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Information Ratio</span>
                    <span className="font-medium">{performanceMetrics.informationRatio}</span>
                  </div>
                  <Progress value={Math.min(performanceMetrics.informationRatio * 50, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Good (&gt;0.5)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Recommendations</CardTitle>
                <CardDescription>Suggestions to optimize your risk profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="p-1 bg-green-500 rounded-full">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">Excellent Sharpe Ratio</div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your risk-adjusted returns are excellent. Continue your current strategy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="p-1 bg-yellow-500 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-yellow-900 dark:text-yellow-100">Monitor Volatility</div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Your portfolio volatility is moderate. Consider adding defensive positions during market uncertainty.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="p-1 bg-blue-500 rounded-full">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">Drawdown Management</div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Your maximum drawdown is well-controlled. Consider position sizing to maintain this level.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Alpha</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+{performanceMetrics.alpha}%</div>
                <p className="text-xs text-muted-foreground">Excess return vs benchmark</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Beta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.beta}</div>
                <p className="text-xs text-muted-foreground">Market sensitivity</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tracking Error</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.trackingError}%</div>
                <p className="text-xs text-muted-foreground">Deviation from benchmark</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Information Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.informationRatio}</div>
                <p className="text-xs text-muted-foreground">Alpha per unit of tracking error</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Your portfolio vs major market indices</CardDescription>
            </CardHeader>
            <CardContent>
              <BenchmarkComparisonChart timeframe={timeframe} benchmark={benchmark} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Benchmark Analysis</CardTitle>
                <CardDescription>Performance vs {benchmarkData[benchmark as keyof typeof benchmarkData].name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Portfolio</span>
                    <div className="text-right">
                      <div className="font-medium text-green-500">+{performanceMetrics.annualizedReturn}%</div>
                      <div className="text-xs text-muted-foreground">Volatility: {performanceMetrics.volatility}%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{benchmarkData[benchmark as keyof typeof benchmarkData].name}</span>
                    <div className="text-right">
                      <div className="font-medium">+{benchmarkData[benchmark as keyof typeof benchmarkData].return}%</div>
                      <div className="text-xs text-muted-foreground">Volatility: {benchmarkData[benchmark as keyof typeof benchmarkData].volatility}%</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Outperformance</span>
                    <span className="font-bold text-green-500">+{(performanceMetrics.annualizedReturn - benchmarkData[benchmark as keyof typeof benchmarkData].return).toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk-Return Profile</CardTitle>
                <CardDescription>Risk vs return comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <div className="text-lg font-bold text-green-600">Superior Performance</div>
                    <p className="text-sm text-muted-foreground">Higher returns with controlled risk</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Risk-Adjusted Return</div>
                      <div className="text-lg font-bold text-green-500">{performanceMetrics.sharpeRatio}</div>
                      <div className="text-xs text-muted-foreground">Sharpe Ratio</div>
                    </div>
                    <div>
                      <div className="font-medium">Market Correlation</div>
                      <div className="text-lg font-bold">{(performanceMetrics.beta * 0.89).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Correlation</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trade-history" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.totalTrades}</div>
                <p className="text-xs text-muted-foreground">Since inception</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{performanceMetrics.winRate}%</div>
                <p className="text-xs text-muted-foreground">{performanceMetrics.winningTrades} winning trades</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceMetrics.profitFactor}</div>
                <p className="text-xs text-muted-foreground">Gross profit / Gross loss</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{performanceMetrics.consecutiveWins}</div>
                <p className="text-xs text-muted-foreground">Consecutive wins</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>Complete record of all your trades</CardDescription>
            </CardHeader>
            <CardContent>
              <TradeHistoryTable />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trade Performance</CardTitle>
                <CardDescription>Win/Loss statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Winning Trades</span>
                  <span className="font-medium text-green-500">{performanceMetrics.winningTrades}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Losing Trades</span>
                  <span className="font-medium text-red-500">{performanceMetrics.losingTrades}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Win</span>
                  <span className="font-medium text-green-500">${performanceMetrics.averageWin}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Loss</span>
                  <span className="font-medium text-red-500">${performanceMetrics.averageLoss}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Largest Win</span>
                  <span className="font-medium text-green-500">${performanceMetrics.largestWin}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Largest Loss</span>
                  <span className="font-medium text-red-500">${performanceMetrics.largestLoss}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Patterns</CardTitle>
                <CardDescription>Analysis of your trading behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Win Rate</span>
                    <span>{performanceMetrics.winRate}%</span>
                  </div>
                  <Progress value={performanceMetrics.winRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profit Factor</span>
                    <span>{performanceMetrics.profitFactor}</span>
                  </div>
                  <Progress value={Math.min(performanceMetrics.profitFactor * 25, 100)} className="h-2" />
                </div>
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Best Winning Streak</span>
                    <span className="font-medium text-green-500">{performanceMetrics.consecutiveWins} trades</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Worst Losing Streak</span>
                    <span className="font-medium text-red-500">{performanceMetrics.consecutiveLosses} trades</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Value at Risk (VaR)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">-$1,247</div>
                <p className="text-xs text-muted-foreground">95% confidence, 1-day</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Expected Shortfall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">-$1,856</div>
                <p className="text-xs text-muted-foreground">Conditional VaR</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Skewness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-0.23</div>
                <p className="text-xs text-muted-foreground">Return distribution asymmetry</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Kurtosis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.45</div>
                <p className="text-xs text-muted-foreground">Tail risk measure</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ulcer Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.23</div>
                <p className="text-xs text-muted-foreground">Drawdown severity</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pain Index</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.87</div>
                <p className="text-xs text-muted-foreground">Average drawdown</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Decomposition</CardTitle>
                <CardDescription>Sources of portfolio risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Systematic Risk</span>
                      <span>67.8%</span>
                    </div>
                    <Progress value={67.8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Idiosyncratic Risk</span>
                      <span>32.2%</span>
                    </div>
                    <Progress value={32.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Sector Risk</span>
                      <span>45.6%</span>
                    </div>
                    <Progress value={45.6} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Style Risk</span>
                      <span>23.4%</span>
                    </div>
                    <Progress value={23.4} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Metrics</CardTitle>
                <CardDescription>Sophisticated risk measures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Treynor Ratio</span>
                  <span className="font-medium">16.47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Jensen's Alpha</span>
                  <span className="font-medium text-green-500">+5.23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Modigliani Risk-Adjusted Performance</span>
                  <span className="font-medium">19.87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Omega Ratio</span>
                  <span className="font-medium">1.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Gain-Loss Ratio</span>
                  <span className="font-medium">2.34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Upside Capture</span>
                  <span className="font-medium text-green-500">112.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Downside Capture</span>
                  <span className="font-medium text-green-500">87.6%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monte Carlo Analysis</CardTitle>
              <CardDescription>Probabilistic portfolio projections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold text-green-500">78.3%</div>
                  <div className="text-sm text-muted-foreground">Probability of positive return (1Y)</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold text-blue-500">$18,450</div>
                  <div className="text-sm text-muted-foreground">Expected portfolio value (1Y)</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold text-yellow-500">$12,340</div>
                  <div className="text-sm text-muted-foreground">5th percentile outcome (1Y)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}