"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Dec 1", rank: 89 },
  { date: "Dec 5", rank: 76 },
  { date: "Dec 10", rank: 68 },
  { date: "Dec 15", rank: 72 },
  { date: "Dec 20", rank: 59 },
  { date: "Dec 25", rank: 51 },
  { date: "Dec 30", rank: 47 },
  { date: "Jan 5", rank: 42 },
  { date: "Jan 10", rank: 38 },
  { date: "Jan 15", rank: 45 },
  { date: "Jan 20", rank: 42 },
]

export default function RankHistoryChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          domain={['dataMin - 5', 'dataMax + 5']}
          reversed={true} // Lower rank numbers are better
        />
        <Tooltip 
          formatter={(value) => [`#${value}`, 'Rank']}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Line 
          type="monotone" 
          dataKey="rank" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--card))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}