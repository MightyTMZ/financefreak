"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface BenchmarkComparisonChartProps {
  timeframe: string
  benchmark: string
}

const data = [
  { date: "Jan", portfolio: 100, spy: 100, qqq: 100, dia: 100, iwm: 100 },
  { date: "Feb", portfolio: 103.2, spy: 101.8, qqq: 104.5, dia: 100.9, iwm: 102.1 },
  { date: "Mar", portfolio: 107.8, spy: 104.2, qqq: 109.1, dia: 103.5, iwm: 105.8 },
  { date: "Apr", portfolio: 112.4, spy: 106.9, qqq: 113.7, dia: 105.2, iwm: 108.9 },
  { date: "May", portfolio: 115.9, spy: 109.1, qqq: 117.2, dia: 107.8, iwm: 111.2 },
  { date: "Jun", portfolio: 119.3, spy: 111.8, qqq: 120.9, dia: 109.4, iwm: 113.7 },
  { date: "Jul", portfolio: 123.7, spy: 114.2, qqq: 125.1, dia: 112.1, iwm: 116.8 },
  { date: "Aug", portfolio: 118.9, spy: 110.7, qqq: 119.8, dia: 108.9, iwm: 112.4 },
  { date: "Sep", portfolio: 122.1, spy: 113.5, qqq: 123.4, dia: 111.7, iwm: 115.9 },
  { date: "Oct", portfolio: 126.8, spy: 116.9, qqq: 128.2, dia: 114.8, iwm: 119.3 },
  { date: "Nov", portfolio: 131.2, spy: 119.7, qqq: 132.8, dia: 117.2, iwm: 122.1 },
  { date: "Dec", portfolio: 124.67, spy: 116.23, qqq: 122.45, dia: 112.78, iwm: 114.32 }
]

const benchmarkColors = {
  spy: "#3b82f6",
  qqq: "#10b981",
  dia: "#f59e0b",
  iwm: "#ef4444"
}

const benchmarkNames = {
  spy: "S&P 500",
  qqq: "NASDAQ 100", 
  dia: "Dow Jones",
  iwm: "Russell 2000"
}

export default function BenchmarkComparisonChart({ timeframe, benchmark }: BenchmarkComparisonChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
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
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <Tooltip 
          formatter={(value, name) => [
            `${Number(value).toFixed(1)}%`, 
            name === 'portfolio' ? 'Your Portfolio' : benchmarkNames[name as keyof typeof benchmarkNames]
          ]}
          labelFormatter={(label) => `Month: ${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="portfolio" 
          stroke="hsl(var(--primary))" 
          strokeWidth={3}
          dot={false}
          name="Your Portfolio"
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--card))" }}
        />
        <Line 
          type="monotone" 
          dataKey={benchmark.toLowerCase()} 
          stroke={benchmarkColors[benchmark.toLowerCase() as keyof typeof benchmarkColors]} 
          strokeWidth={2}
          dot={false}
          name={benchmarkNames[benchmark.toLowerCase() as keyof typeof benchmarkNames]}
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}