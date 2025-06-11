"use client"

import { Calendar, Users, Trophy, Target, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Tournament {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  participants: number
  prize: string
  currentRank?: number | null
  totalParticipants: number
  progress: number
  status: 'active' | 'upcoming' | 'completed'
}

interface TournamentCardProps {
  tournament: Tournament
  compact?: boolean
}

export default function TournamentCard({ tournament, compact = false }: TournamentCardProps) {
  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'upcoming':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: Tournament['status']) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'upcoming':
        return 'Upcoming'
      case 'completed':
        return 'Completed'
      default:
        return 'Unknown'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysRemaining = () => {
    const endDate = new Date(tournament.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  if (compact) {
    return (
      <Card className="relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(tournament.status)}`} />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{tournament.name}</CardTitle>
              <CardDescription className="text-sm mt-1">
                {tournament.description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              {getStatusText(tournament.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{tournament.participants.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{tournament.prize}</span>
              </div>
            </div>
            {tournament.currentRank && (
              <div className="flex items-center gap-1 text-primary font-medium">
                <Target className="h-4 w-4" />
                <span>Rank #{tournament.currentRank}</span>
              </div>
            )}
          </div>
          
          {tournament.status === 'active' && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{getDaysRemaining()} days left</span>
              </div>
              <Progress value={tournament.progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${getStatusColor(tournament.status)}`} />
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{tournament.name}</CardTitle>
            <CardDescription className="mt-2">
              {tournament.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4">
            {getStatusText(tournament.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</div>
              <div className="text-muted-foreground">Duration</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{tournament.participants.toLocaleString()}</div>
              <div className="text-muted-foreground">Participants</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{tournament.prize}</div>
              <div className="text-muted-foreground">Prize Pool</div>
            </div>
          </div>
          {tournament.currentRank ? (
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-primary">#{tournament.currentRank}</div>
                <div className="text-muted-foreground">Your Rank</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Not Joined</div>
                <div className="text-muted-foreground">Status</div>
              </div>
            </div>
          )}
        </div>

        {tournament.status === 'active' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tournament Progress</span>
              <span>{getDaysRemaining()} days remaining</span>
            </div>
            <Progress value={tournament.progress} className="h-3" />
          </div>
        )}

        <div className="flex gap-2">
          {tournament.status === 'upcoming' ? (
            <Button className="flex-1">
              Join Tournament
            </Button>
          ) : tournament.status === 'active' && !tournament.currentRank ? (
            <Button className="flex-1">
              Join Tournament
            </Button>
          ) : (
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
          )}
          <Button variant="outline">
            Leaderboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}