"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getCoinPriceHistory } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

interface CryptoChartProps {
  coinId: string
  days?: number
}

export function CryptoChart({ coinId, days = 7 }: CryptoChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const historyData = await getCoinPriceHistory(coinId, days)
        setData(historyData)
        setError(null)
      } catch (err) {
        setError("Failed to load chart data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [coinId, days])

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />
  }

  if (error) {
    return <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">{error}</div>
  }

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={(value, index) => {
              // Show fewer ticks for better readability
              return index % Math.ceil(data.length / 7) === 0 ? value : ""
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            domain={["auto", "auto"]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Date:</div>
                      <div className="text-sm font-medium">{payload[0].payload.date}</div>
                      <div className="text-sm text-muted-foreground">Time:</div>
                      <div className="text-sm font-medium">{payload[0].payload.time}</div>
                      <div className="text-sm text-muted-foreground">Price:</div>
                      <div className="text-sm font-medium">${payload[0].value?.toLocaleString()}</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, style: { fill: "hsl(var(--primary))" } }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

