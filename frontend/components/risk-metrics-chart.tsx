"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
  { metric: "Sharpe Ratio", value: 1.84, benchmark: 1.23, color: "#10b981" },
  { metric: "Sortino Ratio", value: 2.31, benchmark: 1.67, color: "#3b82f6" },
  { metric: "Calmar Ratio", value: 2.25, benchmark: 1.45, color: "#8b5cf6" },
  { metric: "Information Ratio", value: 0.89, benchmark: 0.0, color: "#f59e0b" },
  { metric: "Treynor Ratio", value: 16.47, benchmark: 13.21, color: "#ef4444" }
]

export default function RiskMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.1} />
        <XAxis 
          dataKey="metric" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickMargin={10}
        />
        <Tooltip 
          formatter={(value, name) => [
            Number(value).toFixed(2), 
            name === 'value' ? 'Your Portfolio' : 'Benchmark'
          ]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Bar dataKey="value" name="value" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
        <Bar dataKey="benchmark" name="benchmark" fill="#94a3b8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}