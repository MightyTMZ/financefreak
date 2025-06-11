"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const data = [
  { date: "Apr 15", realized: 0, unrealized: 0, total: 0 },
  { date: "Apr 16", realized: 45.30, unrealized: 74.70, total: 120.00 },
  { date: "Apr 17", realized: 45.30, unrealized: 18.70, total: 64.00 },
  { date: "Apr 18", realized: 78.90, unrealized: 157.10, total: 236.00 },
  { date: "Apr 19", realized: 123.45, unrealized: 286.55, total: 410.00 },
  { date: "Apr 20", realized: 156.78, unrealized: 486.22, total: 643.00 },
  { date: "Apr 21", realized: 189.12, unrealized: 702.88, total: 892.00 },
  { date: "Apr 22", realized: 189.12, unrealized: 598.88, total: 788.00 },
  { date: "Apr 23", realized: 234.67, unrealized: 742.33, total: 977.00 },
  { date: "Apr 24", realized: 234.67, unrealized: 1066.33, total: 1301.00 },
  { date: "Apr 25", realized: 234.67, unrealized: 1224.33, total: 1459.00 },
  { date: "Apr 26", realized: 234.67, unrealized: 1388.33, total: 1623.00 },
  { date: "Apr 27", realized: 234.67, unrealized: 1605.33, total: 1840.00 },
  { date: "Apr 28", realized: 234.67, unrealized: 1865.33, total: 2100.00 },
  { date: "Apr 29", realized: 234.67, unrealized: 2010.33, total: 2245.00 },
  { date: "May 1", realized: 234.67, unrealized: 2297.33, total: 2532.00 },
  { date: "May 2", realized: 234.67, unrealized: 2661.33, total: 2896.00 },
  { date: "May 3", realized: 234.67, unrealized: 2885.33, total: 3120.00 },
  { date: "May 4", realized: 234.67, unrealized: 3019.33, total: 3254.00 },
  { date: "May 5", realized: 234.67, unrealized: 3367.33, total: 3602.00 },
  { date: "May 6", realized: 234.67, unrealized: 3657.33, total: 3892.00 },
  { date: "May 7", realized: 234.67, unrealized: 3996.33, total: 4231.00 },
  { date: "May 8", realized: 234.67, unrealized: 4284.33, total: 4519.00 },
  { date: "May 9", realized: 234.67, unrealized: 4485.33, total: 4720.00 },
  { date: "May 10", realized: 234.67, unrealized: 4655.33, total: 4890.00 },
  { date: "May 11", realized: 234.67, unrealized: 4752.33, total: 4987.00 },
  { date: "May 12", realized: 234.67, unrealized: 4880.33, total: 5115.00 },
  { date: "May 13", realized: 234.67, unrealized: 5010.33, total: 5245.00 },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ProfitLossChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="realizedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="unrealizedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            const date = new Date(value)
            return value.split(" ")[0].substring(0, 3) + " " + value.split(" ")[1]
          }}
          tickMargin={10}
          minTickGap={40}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => formatCurrency(value)}
          tickMargin={10}
          domain={[0, "dataMax + 500"]}
        />
        <Tooltip 
          formatter={(value, name) => [
            formatCurrency(Number(value)), 
            name === 'total' ? 'Total P&L' : 
            name === 'realized' ? 'Realized P&L' : 
            'Unrealized P&L'
          ]}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          fill="url(#totalGradient)"
          dot={false}
        />
        <Area 
          type="monotone" 
          dataKey="realized" 
          stroke="#10b981" 
          strokeWidth={2}
          fill="url(#realizedGradient)"
          dot={false}
        />
        <Area 
          type="monotone" 
          dataKey="unrealized" 
          stroke="#3b82f6" 
          strokeWidth={2}
          fill="url(#unrealizedGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}