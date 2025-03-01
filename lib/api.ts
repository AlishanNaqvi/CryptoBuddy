const API_BASE_URL = "https://api.coingecko.com/api/v3"

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}

export async function getMarketData(currency = "usd", count = 50) {
  try {
    return await fetchWithRetry(
      `${API_BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=1&sparkline=false&price_change_percentage=24h`,
      { next: { revalidate: 60 } },
    )
  } catch (error) {
    console.error("Error fetching market data:", error)
    return []
  }
}

export async function getTrendingCoins() {
  try {
    const data = await fetchWithRetry(`${API_BASE_URL}/search/trending`, {
      next: { revalidate: 300 },
    })
    return data.coins || []
  } catch (error) {
    console.error("Error fetching trending coins:", error)
    return []
  }
}

export async function getGlobalData() {
  try {
    return await fetchWithRetry(`${API_BASE_URL}/global`, {
      next: { revalidate: 300 },
    })
  } catch (error) {
    console.error("Error fetching global data:", error)
    return { data: {} }
  }
}

export async function getCoinData(coinId: string) {
  try {
    return await fetchWithRetry(
      `${API_BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      { next: { revalidate: 60 } },
    )
  } catch (error) {
    console.error(`Error fetching data for coin ${coinId}:`, error)
    throw new Error(`Failed to fetch data for ${coinId}`)
  }
}

export async function getCoinPriceHistory(coinId: string, days: number | string, currency = "usd") {
  try {
    const data = await fetchWithRetry(
      `${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`,
      { next: { revalidate: 3600 } },
    )

    return data.prices.map((item: [number, number]) => {
      const [timestamp, price] = item
      const date = new Date(timestamp)
      return {
        timestamp,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        price,
      }
    })
  } catch (error) {
    console.error(`Error fetching price history for coin ${coinId}:`, error)
    throw new Error(`Failed to fetch price history for ${coinId}`)
  }
}

