"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface DiversificationData {
  sector: string
  value: number
  percentage: number
  color: string
}

interface DiversificationChartProps {
  data?: DiversificationData[] // Allowing it to be optional/nullable
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function DiversificationChart({ data = [] }: DiversificationChartProps) {
  const isDataEmpty = !data || data.length === 0

  return (
    <ResponsiveContainer width="100%" height={300}>
      {isDataEmpty ? (
        <div style={{ textAlign: "center", paddingTop: "2rem" }}>
          No data available
        </div>
      ) : (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || "#ccc"} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [
              formatCurrency(Number(value ?? 0)), 
              `${props?.payload?.percentage ?? 0}%`
            ]}
            labelFormatter={(label) => `${label} Sector`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          {/* <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: entry?.color ?? "#000" }}>
                {value} ({entry?.payload?.percentage ?? 0}%)
              </span>
            )}
          /> */}
        </PieChart>
      )}
    </ResponsiveContainer>
  )
}
