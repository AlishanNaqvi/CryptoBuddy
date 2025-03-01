"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsItem {
  id: string
  title: string
  url: string
  source: string
  time: string
}

export function CryptoNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        // In a production app, you would fetch from a real crypto news API
        // For this demo, we'll use a timeout to simulate an API call
        setLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample news data
        const latestNews = [
          {
            id: "1",
            title: "Bitcoin Surges Past $60K as Institutional Demand Grows",
            url: "#",
            source: "CryptoNews",
            time: "2 hours ago",
          },
          {
            id: "2",
            title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
            url: "#",
            source: "BlockchainDaily",
            time: "5 hours ago",
          },
          {
            id: "3",
            title: "Major Bank Launches Crypto Trading Services for Institutional Clients",
            url: "#",
            source: "FinanceToday",
            time: "8 hours ago",
          },
          {
            id: "4",
            title: "New Regulatory Framework for Cryptocurrencies Proposed in EU",
            url: "#",
            source: "CryptoInsider",
            time: "12 hours ago",
          },
        ]

        setNews(latestNews)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-b pb-3 last:border-0">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.id} className="border-b pb-3 last:border-0">
          <h3 className="font-medium">{item.title}</h3>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <span>{item.source}</span>
            <span className="mx-1">•</span>
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

