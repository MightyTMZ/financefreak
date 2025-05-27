import Link from "next/link"
import { TrendingUp, BarChart3, Trophy, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-background dark:from-primary/10 dark:via-secondary/10 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Virtual Trading Simulator and Game
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Trade real stocks with virtual money. Learn investing strategies without the risk. Build your portfolio and compete with friends.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Start Trading</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/discover">Explore Stocks</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div className="animate-pulse-slow absolute -top-4 -left-4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="animate-pulse-slow delay-1000 absolute -bottom-8 -right-8 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"></div>
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Portfolio Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$15,245.32</div>
                        <p className="text-xs text-green-500">+5.43% today</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Available Cash</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$4,320.67</div>
                        <p className="text-xs text-muted-foreground">Ready to invest</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Top Performing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">TSLA</div>
                        <p className="text-xs text-green-500">+8.21%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Leaderboard Rank</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold">#42</div>
                        <p className="text-xs text-green-500">+12 positions</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Everything you need to learn about stock trading in a risk-free environment
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
            <Card className="border-none shadow-lg shadow-primary/5">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <CardTitle>Real Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Trade with real-time stock market data. All prices reflect actual market conditions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg shadow-primary/5">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Wallet className="h-8 w-8 text-primary" />
                <CardTitle>Virtual Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start with $100,000 in virtual currency. Build and manage your portfolio without risking real money.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg shadow-primary/5">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <BarChart3 className="h-8 w-8 text-primary" />
                <CardTitle>Performance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor your investment performance with detailed analytics and historical data.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg shadow-primary/5">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Trophy className="h-8 w-8 text-primary" />
                <CardTitle>Competitive Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Compete with other players and climb the leaderboard with your investment strategies.
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 border-none shadow-lg shadow-primary/5">
              <CardHeader className="pb-2">
                <CardTitle>Ready to start trading?</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Create Your Account</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}