import Link from "next/link"
import Image from "next/image"
import { ArrowDown, ArrowUp, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoChart } from "@/components/crypto-chart"
import { CryptoNews } from "@/components/crypto-news"
import { ThemeToggle } from "@/components/theme-toggle"
import { getGlobalData, getMarketData, getTrendingCoins } from "@/lib/api"
import { formatCurrency, formatPercentage } from "@/lib/utils"

export default async function Home() {
  const marketData = await getMarketData()
  const globalData = await getGlobalData()
  const trendingCoinsData = await getTrendingCoins()

  // Extract global market data
  const global = globalData.data || {}
  const marketCap = global.total_market_cap?.usd
  const marketCapChange = global.market_cap_change_percentage_24h_usd
  const volume = global.total_volume?.usd
  const btcDominance = global.market_cap_percentage?.btc

  // Format trending coins data
  const trendingCoins = trendingCoinsData.map((item: any) => item.item)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">CryptoBuddy</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/portfolio" className="transition-colors hover:text-foreground/80">
                Portfolio
              </Link>
              <Link href="/news" className="transition-colors hover:text-foreground/80">
                News
              </Link>
              <Link href="/settings" className="transition-colors hover:text-foreground/80">
                Settings
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search coins..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(marketCap)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`flex items-center ${marketCapChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {marketCapChange >= 0 ? (
                      <ArrowUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4" />
                    )}
                    {formatPercentage(marketCapChange)}
                  </span>{" "}
                  from yesterday
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(volume)}</div>
                <p className="text-xs text-muted-foreground">Global trading volume</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">BTC Dominance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPercentage(btcDominance)}</div>
                <p className="text-xs text-muted-foreground">Of total market cap</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Tabs defaultValue="all" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Coins</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                  <TabsTrigger value="losers">Top Losers</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    USD <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <TabsContent value="all" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                    <div>Name</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">24h %</div>
                    <div className="text-right">Market Cap</div>
                    <div className="text-right">Volume (24h)</div>
                  </div>
                  <div className="divide-y">
                    {marketData.map((coin: any) => (
                      <Link
                        key={coin.id}
                        href={`/coin/${coin.id}`}
                        className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image src={coin.image || "/placeholder.svg"} alt={coin.name} width={32} height={32} />
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                        <div className="text-right self-center">{formatCurrency(coin.current_price)}</div>
                        <div
                          className={`text-right self-center ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </div>
                        <div className="text-right self-center">{formatCurrency(coin.market_cap)}</div>
                        <div className="text-right self-center">{formatCurrency(coin.total_volume)}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="trending" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                    <div>Name</div>
                    <div className="text-right">Price (BTC)</div>
                    <div className="text-right">Market Cap Rank</div>
                    <div className="text-right">Score</div>
                    <div className="text-right"></div>
                  </div>
                  <div className="divide-y">
                    {trendingCoins.map((coin: any) => (
                      <Link
                        key={coin.id}
                        href={`/coin/${coin.id}`}
                        className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image src={coin.small || "/placeholder.svg"} alt={coin.name} width={32} height={32} />
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right self-center">{coin.price_btc.toFixed(8)}</div>
                        <div className="text-right self-center">{coin.market_cap_rank || "N/A"}</div>
                        <div className="text-right self-center">{coin.score + 1}</div>
                        <div className="text-right self-center">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                            Trending
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="gainers" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                    <div>Name</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">24h %</div>
                    <div className="text-right">Market Cap</div>
                    <div className="text-right">Volume (24h)</div>
                  </div>
                  <div className="divide-y">
                    {[...marketData]
                      .filter((coin: any) => coin.price_change_percentage_24h > 0)
                      .sort((a: any, b: any) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                      .slice(0, 5)
                      .map((coin: any) => (
                        <Link
                          key={coin.id}
                          href={`/coin/${coin.id}`}
                          className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image src={coin.image || "/placeholder.svg"} alt={coin.name} width={32} height={32} />
                            </div>
                            <div>
                              <div className="font-medium">{coin.name}</div>
                              <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                          <div className="text-right self-center">{formatCurrency(coin.current_price)}</div>
                          <div className="text-right self-center text-green-500">
                            {formatPercentage(coin.price_change_percentage_24h)}
                          </div>
                          <div className="text-right self-center">{formatCurrency(coin.market_cap)}</div>
                          <div className="text-right self-center">{formatCurrency(coin.total_volume)}</div>
                        </Link>
                      ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="losers" className="space-y-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                    <div>Name</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">24h %</div>
                    <div className="text-right">Market Cap</div>
                    <div className="text-right">Volume (24h)</div>
                  </div>
                  <div className="divide-y">
                    {[...marketData]
                      .filter((coin: any) => coin.price_change_percentage_24h < 0)
                      .sort((a: any, b: any) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                      .slice(0, 5)
                      .map((coin: any) => (
                        <Link
                          key={coin.id}
                          href={`/coin/${coin.id}`}
                          className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image src={coin.image || "/placeholder.svg"} alt={coin.name} width={32} height={32} />
                            </div>
                            <div>
                              <div className="font-medium">{coin.name}</div>
                              <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                            </div>
                          </div>
                          <div className="text-right self-center">{formatCurrency(coin.current_price)}</div>
                          <div className="text-right self-center text-red-500">
                            {formatPercentage(coin.price_change_percentage_24h)}
                          </div>
                          <div className="text-right self-center">{formatCurrency(coin.market_cap)}</div>
                          <div className="text-right self-center">{formatCurrency(coin.total_volume)}</div>
                        </Link>
                      ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Bitcoin Price Chart</CardTitle>
                <CardDescription>Last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <CryptoChart coinId="bitcoin" days={7} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Latest News</CardTitle>
                <CardDescription>Crypto market updates</CardDescription>
              </CardHeader>
              <CardContent>
                <CryptoNews />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 CryptoTracker. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

