export function formatCurrency(value: number | undefined): string {
  if (value === undefined || value === null) return "N/A"

  // Format based on the size of the number
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`
  } else if (value >= 1) {
    return `$${value.toFixed(2)}`
  } else {
    // For very small values like $0.00001234
    return `$${value.toFixed(8)}`
  }
}

export function formatPercentage(value: number | undefined): string {
  if (value === undefined || value === null) return "N/A"
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

export function formatSupply(supply: number | null, symbol: string): string {
  if (!supply) return "N/A"

  if (supply >= 1e9) {
    return `${(supply / 1e9).toFixed(2)}B ${symbol.toUpperCase()}`
  } else if (supply >= 1e6) {
    return `${(supply / 1e6).toFixed(2)}M ${symbol.toUpperCase()}`
  } else if (supply >= 1e3) {
    return `${(supply / 1e3).toFixed(2)}K ${symbol.toUpperCase()}`
  } else {
    return `${supply.toLocaleString()} ${symbol.toUpperCase()}`
  }
}

export const cn = (...inputs: (string | undefined)[]) => {
  return inputs.filter(Boolean).join(" ")
}

