import Image from "next/image"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatCurrency, formatPercentage, formatSupply } from "@/lib/utils"

interface CoinDetailsModalProps {
  coin: any
  isOpen: boolean
  onClose: () => void
  currency: string
}

export function CoinDetailsModal({ coin, isOpen, onClose, currency }: CoinDetailsModalProps) {
  if (!coin) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image
              src={coin.id_icon || "/placeholder.svg"}
              alt={coin.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            {coin.name} ({coin.symbol})
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-sm font-medium">Price:</span>
            <span className="text-sm">{formatCurrency(coin.price_usd, currency)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-sm font-medium">24h Change:</span>
            <span
              className={`text-sm flex items-center ${
                coin.price_change_percent_24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {coin.price_change_percent_24h >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {formatPercentage(coin.price_change_percent_24h)}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-sm font-medium">Market Cap:</span>
            <span className="text-sm">{formatCurrency(coin.market_cap, currency)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-sm font-medium">24h Volume:</span>
            <span className="text-sm">{formatCurrency(coin.volume_1day_usd, currency)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-sm font-medium">Circulating Supply:</span>
            <span className="text-sm">{formatSupply(coin.circulating_supply, coin.symbol)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="text-sm font-medium">Total Supply:</span>
            <span className="text-sm">{formatSupply(coin.total_supply, coin.symbol)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

