"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock } from "lucide-react"

interface BadgeData {
  id: number
  name: string
  description: string
  icon: ReactNode
  earned: boolean
  earnedDate?: string
}

interface BadgeCollectionProps {
  badges: BadgeData[]
}

export default function BadgeCollection({ badges }: BadgeCollectionProps) {
  const earnedBadges = badges.filter(badge => badge.earned)
  const availableBadges = badges.filter(badge => !badge.earned)

  const BadgeCard = ({ badge }: { badge: BadgeData }) => (
    <Card className={`relative transition-all duration-200 ${
      badge.earned 
        ? 'bg-gradient-to-br from-primary/5 via-secondary/5 to-background border-primary/20 hover:shadow-md' 
        : 'bg-muted/30 border-muted hover:bg-muted/50'
    }`}>
      {!badge.earned && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
          <Lock className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${
            badge.earned 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {badge.icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{badge.name}</CardTitle>
            {badge.earned && badge.earnedDate && (
              <Badge variant="outline" className="mt-1 text-xs">
                Earned {new Date(badge.earnedDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className={badge.earned ? 'text-foreground/80' : 'text-muted-foreground'}>
          {badge.description}
        </CardDescription>
      </CardContent>
    </Card>
  )

  return (
    <Tabs defaultValue="earned" className="space-y-4">
      <TabsList>
        <TabsTrigger value="earned">
          Earned ({earnedBadges.length})
        </TabsTrigger>
        <TabsTrigger value="available">
          Available ({availableBadges.length})
        </TabsTrigger>
        <TabsTrigger value="all">
          All Badges ({badges.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="earned" className="space-y-4">
        {earnedBadges.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {earnedBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-medium">No badges earned yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Start trading to unlock your first achievement badge!
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="available" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}