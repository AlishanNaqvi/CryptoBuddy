import { ArrowUp, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioChart } from "@/components/portfolio-chart"

export default function PortfolioPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                3.2%
              </span>{" "}
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+$395.42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                3.2%
              </span>{" "}
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+$2,145.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" />
                21.5%
              </span>{" "}
              all time
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioChart />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="assets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="assets" className="space-y-4">
            <div className="rounded-lg border">
              <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium">
                <div>Asset</div>
                <div className="text-right">Price</div>
                <div className="text-right">Holdings</div>
                <div className="text-right">Value</div>
                <div className="text-right">Allocation</div>
                <div className="text-right">Profit/Loss</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-6 gap-4 p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 text-xs font-bold">BTC</span>
                    </div>
                    <div>
                      <div className="font-medium">Bitcoin</div>
                      <div className="text-xs text-muted-foreground">BTC</div>
                    </div>
                  </div>
                  <div className="text-right self-center">$42,350.12</div>
                  <div className="text-right self-center">0.15 BTC</div>
                  <div className="text-right self-center">$6,352.52</div>
                  <div className="text-right self-center">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={51} className="h-2 w-16" />
                      <span>51%</span>
                    </div>
                  </div>
                  <div className="text-right self-center text-green-500">+$1,245.32</div>
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">ETH</span>
                    </div>
                    <div>
                      <div className="font-medium">Ethereum</div>
                      <div className="text-xs text-muted-foreground">ETH</div>
                    </div>
                  </div>
                  <div className="text-right self-center">$2,245.67</div>
                  <div className="text-right self-center">2.1 ETH</div>
                  <div className="text-right self-center">$4,715.91</div>
                  <div className="text-right self-center">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={38} className="h-2 w-16" />
                      <span>38%</span>
                    </div>
                  </div>
                  <div className="text-right self-center text-green-500">+$715.45</div>
                </div>
                <div className="grid grid-cols-6 gap-4 p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">SOL</span>
                    </div>
                    <div>
                      <div className="font-medium">Solana</div>
                      <div className="text-xs text-muted-foreground">SOL</div>
                    </div>
                  </div>
                  <div className="text-right self-center">$98.45</div>
                  <div className="text-right self-center">13 SOL</div>
                  <div className="text-right self-center">$1,279.85</div>
                  <div className="text-right self-center">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={11} className="h-2 w-16" />
                      <span>11%</span>
                    </div>
                  </div>
                  <div className="text-right self-center text-green-500">+$185.12</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <div className="rounded-lg border">
              <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
                <div>Date</div>
                <div>Type</div>
                <div>Asset</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Value</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50">
                  <div className="self-center">2025-02-25</div>
                  <div className="self-center">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Buy
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 text-xs font-bold">BTC</span>
                    </div>
                    <span>Bitcoin</span>
                  </div>
                  <div className="text-right self-center">0.05 BTC</div>
                  <div className="text-right self-center">$2,117.51</div>
                </div>
                <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50">
                  <div className="self-center">2025-02-20</div>
                  <div className="self-center">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Buy
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-xs font-bold">ETH</span>
                    </div>
                    <span>Ethereum</span>
                  </div>
                  <div className="text-right self-center">1.0 ETH</div>
                  <div className="text-right self-center">$2,245.67</div>
                </div>
                <div className="grid grid-cols-5 gap-4 p-4 hover:bg-muted/50">
                  <div className="self-center">2025-02-15</div>
                  <div className="self-center">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                      Sell
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">SOL</span>
                    </div>
                    <span>Solana</span>
                  </div>
                  <div className="text-right self-center">5.0 SOL</div>
                  <div className="text-right self-center">$492.25</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

