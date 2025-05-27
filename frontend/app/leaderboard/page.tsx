import { Trophy, Medal, Award, Users, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function LeaderboardPage() {
  const generateLeaderboardData = (count = 10) => {
    return Array.from({ length: count }).map((_, i) => {
      const firstName = ["John", "Jane", "Alex", "Sarah", "Michael", "Emma", "David", "Olivia"][Math.floor(Math.random() * 8)];
      const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"][Math.floor(Math.random() * 8)];
      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
      const initialValue = 10000;
      const portfolioValue = Math.round((initialValue * (1 + (Math.random() * 0.4 - 0.1))) * 100) / 100;
      const percentChange = Math.round(((portfolioValue / initialValue) - 1) * 10000) / 100;
      const prevRank = i + 1 + (Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0) * (Math.random() > 0.5 ? 1 : -1);
      
      return {
        rank: i + 1,
        prevRank,
        username,
        name: `${firstName} ${lastName}`,
        initials: `${firstName[0]}${lastName[0]}`,
        portfolioValue: portfolioValue.toFixed(2),
        percentChange: percentChange.toFixed(2),
        avatar: null,
      };
    }).sort((a, b) => parseFloat(b.portfolioValue) - parseFloat(a.portfolioValue))
      .map((user, idx) => ({ ...user, rank: idx + 1 }));
  };

  const weeklyLeaderboard = generateLeaderboardData();
  const monthlyLeaderboard = generateLeaderboardData();
  const allTimeLeaderboard = generateLeaderboardData();
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
          <p className="text-muted-foreground">See how you stack up against other traders</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-background">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Trader</CardTitle>
              <CardDescription>Highest portfolio value</CardDescription>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-yellow-500">
                <AvatarFallback className="bg-yellow-500/10 text-yellow-500">{allTimeLeaderboard[0].initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">{allTimeLeaderboard[0].name}</div>
                <div className="text-sm text-muted-foreground">@{allTimeLeaderboard[0].username}</div>
                <div className="mt-1 font-bold text-xl">${allTimeLeaderboard[0].portfolioValue}</div>
                <div className="text-xs text-green-500">+{allTimeLeaderboard[0].percentChange}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-400/10 via-gray-400/5 to-background">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Second Place</CardTitle>
              <CardDescription>Runner-up trader</CardDescription>
            </div>
            <Medal className="h-8 w-8 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-gray-400">
                <AvatarFallback className="bg-gray-400/10 text-gray-400">{allTimeLeaderboard[1].initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">{allTimeLeaderboard[1].name}</div>
                <div className="text-sm text-muted-foreground">@{allTimeLeaderboard[1].username}</div>
                <div className="mt-1 font-bold text-xl">${allTimeLeaderboard[1].portfolioValue}</div>
                <div className="text-xs text-green-500">+{allTimeLeaderboard[1].percentChange}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-600/10 via-amber-600/5 to-background">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Third Place</CardTitle>
              <CardDescription>Third best trader</CardDescription>
            </div>
            <Award className="h-8 w-8 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-amber-600">
                <AvatarFallback className="bg-amber-600/10 text-amber-600">{allTimeLeaderboard[2].initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-lg">{allTimeLeaderboard[2].name}</div>
                <div className="text-sm text-muted-foreground">@{allTimeLeaderboard[2].username}</div>
                <div className="mt-1 font-bold text-xl">${allTimeLeaderboard[2].portfolioValue}</div>
                <div className="text-xs text-green-500">+{allTimeLeaderboard[2].percentChange}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Your Ranking</h3>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                42
              </div>
              <Avatar>
                <AvatarFallback>YS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Your Account</div>
                <div className="text-sm text-muted-foreground">@yourusername</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold">$11,824.75</div>
              <div className="text-xs text-green-500">+18.25%</div>
              <div className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span>+3 positions this week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Top Traders</CardTitle>
              <CardDescription>Best performing traders this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyLeaderboard.map((user, idx) => {
                  let rankChangeIcon = <Minus className="h-3 w-3 text-muted-foreground" />;
                  let rankChangeColor = "text-muted-foreground";
                  
                  if (user.rank < user.prevRank) {
                    rankChangeIcon = <ArrowUp className="h-3 w-3 text-green-500" />;
                    rankChangeColor = "text-green-500";
                  } else if (user.rank > user.prevRank) {
                    rankChangeIcon = <ArrowDown className="h-3 w-3 text-red-500" />;
                    rankChangeColor = "text-red-500";
                  }
                  
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 min-w-[60px]">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {user.rank}
                          </div>
                          <div className={`flex items-center ${rankChangeColor}`}>
                            {rankChangeIcon}
                            {user.rank !== user.prevRank && (
                              <span className="text-xs">{Math.abs(user.rank - user.prevRank)}</span>
                            )}
                          </div>
                        </div>
                        <Avatar>
                          <AvatarFallback>{user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${user.portfolioValue}</div>
                        <div className="text-xs text-green-500">+{user.percentChange}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Top Traders</CardTitle>
              <CardDescription>Best performing traders this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyLeaderboard.map((user, idx) => {
                  let rankChangeIcon = <Minus className="h-3 w-3 text-muted-foreground" />;
                  let rankChangeColor = "text-muted-foreground";
                  
                  if (user.rank < user.prevRank) {
                    rankChangeIcon = <ArrowUp className="h-3 w-3 text-green-500" />;
                    rankChangeColor = "text-green-500";
                  } else if (user.rank > user.prevRank) {
                    rankChangeIcon = <ArrowDown className="h-3 w-3 text-red-500" />;
                    rankChangeColor = "text-red-500";
                  }
                  
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 min-w-[60px]">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {user.rank}
                          </div>
                          <div className={`flex items-center ${rankChangeColor}`}>
                            {rankChangeIcon}
                            {user.rank !== user.prevRank && (
                              <span className="text-xs">{Math.abs(user.rank - user.prevRank)}</span>
                            )}
                          </div>
                        </div>
                        <Avatar>
                          <AvatarFallback>{user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${user.portfolioValue}</div>
                        <div className="text-xs text-green-500">+{user.percentChange}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alltime">
          <Card>
            <CardHeader>
              <CardTitle>All-Time Top Traders</CardTitle>
              <CardDescription>Best performing traders overall</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allTimeLeaderboard.map((user, idx) => {
                  let rankChangeIcon = <Minus className="h-3 w-3 text-muted-foreground" />;
                  let rankChangeColor = "text-muted-foreground";
                  
                  if (user.rank < user.prevRank) {
                    rankChangeIcon = <ArrowUp className="h-3 w-3 text-green-500" />;
                    rankChangeColor = "text-green-500";
                  } else if (user.rank > user.prevRank) {
                    rankChangeIcon = <ArrowDown className="h-3 w-3 text-red-500" />;
                    rankChangeColor = "text-red-500";
                  }
                  
                  const badge = idx < 3 ? (
                    <Badge variant="outline" className={
                      idx === 0 ? "border-yellow-500 text-yellow-500" : 
                      idx === 1 ? "border-gray-400 text-gray-400" : 
                      "border-amber-600 text-amber-600"
                    }>
                      {idx === 0 ? "1st" : idx === 1 ? "2nd" : "3rd"}
                    </Badge>
                  ) : null;
                  
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 min-w-[60px]">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {user.rank}
                          </div>
                          <div className={`flex items-center ${rankChangeColor}`}>
                            {rankChangeIcon}
                            {user.rank !== user.prevRank && (
                              <span className="text-xs">{Math.abs(user.rank - user.prevRank)}</span>
                            )}
                          </div>
                        </div>
                        <Avatar>
                          <AvatarFallback>{user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            {badge}
                          </div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${user.portfolioValue}</div>
                        <div className="text-xs text-green-500">+{user.percentChange}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}