"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowDown, ArrowUp, ChevronLeft, ExternalLink, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoDetailChart } from "@/components/crypto-detail-chart"
import { getCoinData } from "@/lib/api"
import { formatCurrency, formatPercentage, formatSupply } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoinDetailPage({ params }: { params: { id: string } }) {
  const [timeframe, setTimeframe] = useState<number | string>(1)
  const [coinData, setCoinData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCoinData() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCoinData(params.id)
        setCoinData(data)
      } catch (err) {
        setError(`Failed to load data for ${params.id}`)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCoinData()
  }, [params.id])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorDisplay message={error} />
  }

  if (!coinData) {
    return <ErrorDisplay message={`No data found for ${params.id}`} />
  }

  const { name, symbol, image, market_data: marketData, market_cap_rank: marketCapRank, links } = coinData

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image src={image.large || "/placeholder.svg"} alt={name} width={48} height={48} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{symbol.toUpperCase()}</span>
              <span>•</span>
              <span>Rank #{marketCapRank}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          {links.homepage[0] && (
            <Button variant="outline" size="sm" asChild>
              <a href={links.homepage[0]} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Website
              </a>
            </Button>
          )}
          <Button size="sm">Buy</Button>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">{formatCurrency(marketData.current_price.usd)}</CardTitle>
                <CardDescription className="flex items-center">
                  <span
                    className={`flex items-center ${marketData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {marketData.price_change_percentage_24h >= 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4" />
                    )}
                    {formatPercentage(marketData.price_change_percentage_24h)}
                  </span>
                  <span className="ml-2">(24h)</span>
                </CardDescription>
              </div>
              <Tabs
                defaultValue="1"
                onValueChange={(value) => setTimeframe(value === "max" ? "max" : Number.parseInt(value))}
              >
                <TabsList>
                  <TabsTrigger value="1">1D</TabsTrigger>
                  <TabsTrigger value="7">7D</TabsTrigger>
                  <TabsTrigger value="30">1M</TabsTrigger>
                  <TabsTrigger value="365">1Y</TabsTrigger>
                  <TabsTrigger value="max">ALL</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <CryptoDetailChart coinId={params.id} days={timeframe} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">Market Cap</div>
                <div className="text-sm font-medium text-right">{formatCurrency(marketData.market_cap.usd)}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">24h Volume</div>
                <div className="text-sm font-medium text-right">{formatCurrency(marketData.total_volume.usd)}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">Circulating Supply</div>
                <div className="text-sm font-medium text-right">
                  {formatSupply(marketData.circulating_supply, symbol)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">Total Supply</div>
                <div className="text-sm font-medium text-right">{formatSupply(marketData.total_supply, symbol)}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">All-Time High</div>
                <div className="text-sm font-medium text-right">{formatCurrency(marketData.ath.usd)}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm text-muted-foreground">ATH Date</div>
                <div className="text-sm font-medium text-right">
                  {new Date(marketData.ath_date.usd).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container py-6">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-4">
        <div className="md:col-span-3">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  )
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="container py-6">
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Link href="/" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}

