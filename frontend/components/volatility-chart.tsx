"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { date: "Jan", volatility: 12.3, benchmark: 14.2 },
  { date: "Feb", volatility: 15.7, benchmark: 16.8 },
  { date: "Mar", volatility: 18.9, benchmark: 19.4 },
  { date: "Apr", volatility: 14.2, benchmark: 15.6 },
  { date: "May", volatility: 11.8, benchmark: 13.2 },
  { date: "Jun", volatility: 13.4, benchmark: 14.8 },
  { date: "Jul", volatility: 16.7, benchmark: 17.9 },
  { date: "Aug", volatility: 19.2, benchmark: 21.3 },
  { date: "Sep", volatility: 17.1, benchmark: 18.7 },
  { date: "Oct", volatility: 15.8, benchmark: 16.9 },
  { date: "Nov", volatility: 14.3, benchmark: 15.1 },
  { date: "Dec", volatility: 16.2, benchmark: 17.4 }
]

export default function VolatilityChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="volatilityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
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
        />
        <Tooltip 
          formatter={(value, name) => [
            `${Number(value).toFixed(1)}%`, 
            name === 'volatility' ? 'Your Portfolio' : 'Benchmark'
          ]}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Area 
          type="monotone" 
          dataKey="benchmark" 
          stroke="#94a3b8" 
          strokeWidth={2}
          fill="url(#benchmarkGradient)"
          dot={false}
        />
        <Area 
          type="monotone" 
          dataKey="volatility" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          fill="url(#volatilityGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}