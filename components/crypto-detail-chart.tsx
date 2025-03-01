"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getCoinPriceHistory } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

interface CryptoDetailChartProps {
  coinId: string
  days: number | string
}

export function CryptoDetailChart({ coinId, days }: CryptoDetailChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const historyData = await getCoinPriceHistory(coinId, days)
        setData(historyData)
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
    return <Skeleton className="h-[300px] w-full" />
  }

  if (error) {
    return <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">{error}</div>
  }

  const formatXAxis = (value: string) => {
    const date = new Date(value)
    if (days === 1) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    if (days <= 7) return date.toLocaleDateString([], { month: "short", day: "numeric" })
    if (days <= 30) return date.toLocaleDateString([], { month: "short", day: "numeric" })
    if (days <= 365) return date.toLocaleDateString([], { month: "short", year: "2-digit" })
    return date.toLocaleDateString([], { month: "short", year: "numeric" })
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={(value) => formatXAxis(value)}
            interval={Math.ceil(data.length / 6)}
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
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

