"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan", drawdown: 0 },
  { date: "Feb", drawdown: -1.2 },
  { date: "Mar", drawdown: 0 },
  { date: "Apr", drawdown: -2.8 },
  { date: "May", drawdown: -1.1 },
  { date: "Jun", drawdown: 0 },
  { date: "Jul", drawdown: -3.4 },
  { date: "Aug", drawdown: -8.2 },
  { date: "Sep", drawdown: -5.7 },
  { date: "Oct", drawdown: -2.3 },
  { date: "Nov", drawdown: 0 },
  { date: "Dec", drawdown: -4.1 }
]

export default function DrawdownChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
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
          tickFormatter={(value) => `${value}%`}
          domain={['dataMin - 1', 1]}
        />
        <Tooltip 
          formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Drawdown']}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Area 
          type="monotone" 
          dataKey="drawdown" 
          stroke="#ef4444" 
          strokeWidth={2}
          fill="url(#drawdownGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}