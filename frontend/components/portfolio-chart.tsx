"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Apr 15", value: 10000 },
  { name: "Apr 16", value: 10120 },
  { name: "Apr 17", value: 10064 },
  { name: "Apr 18", value: 10236 },
  { name: "Apr 19", value: 10410 },
  { name: "Apr 20", value: 10643 },
  { name: "Apr 21", value: 10892 },
  { name: "Apr 22", value: 10788 },
  { name: "Apr 23", value: 10977 },
  { name: "Apr 24", value: 11301 },
  { name: "Apr 25", value: 11459 },
  { name: "Apr 26", value: 11623 },
  { name: "Apr 27", value: 11840 },
  { name: "Apr 28", value: 12100 },
  { name: "Apr 29", value: 12245 },
  { name: "Apr 30", value: 12532 },
  { name: "May 1", value: 12896 },
  { name: "May 2", value: 13120 },
  { name: "May 3", value: 13254 },
  { name: "May 4", value: 13602 },
  { name: "May 5", value: 13892 },
  { name: "May 6", value: 14231 },
  { name: "May 7", value: 14519 },
  { name: "May 8", value: 14720 },
  { name: "May 9", value: 14890 },
  { name: "May 10", value: 14987 },
  { name: "May 11", value: 15115 },
  { name: "May 12", value: 15245 },
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function PortfolioChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
        <XAxis 
          dataKey="name" 
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
          domain={["dataMin - 500", "dataMax + 500"]}
        />
        <Tooltip 
          formatter={(value) => formatCurrency(Number(value))}
          labelFormatter={(label) => `Date: ${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--card))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}