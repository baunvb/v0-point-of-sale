"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle } from "lucide-react"
import type { Order } from "@/lib/types/manager"

interface OrderCardProps {
  order: Order
  onMarkReady: (orderId: string) => Promise<void>
  loading?: boolean
}

export function OrderCard({ order, onMarkReady, loading = false }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-800 border-red-300"
      case "confirmed":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "preparing":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "ready":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getTimeElapsed = (createdAt: string) => {
    const now = new Date()
    const created = new Date(createdAt)
    const minutes = Math.floor((now.getTime() - created.getTime()) / 60000)
    return `${minutes}m ago`
  }

  return (
    <Card className={`border-2 ${getStatusColor(order.status)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
            <p className="text-sm text-muted-foreground">Table {order.tableId}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">{getTimeElapsed(order.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span>
                {item.quantity}x Item #{item.menuItemId.slice(0, 4)}
              </span>
              {item.notes && <span className="text-xs text-muted-foreground italic">Note: {item.notes}</span>}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <Badge className={`${getStatusColor(order.status)} capitalize`}>{order.status}</Badge>
          {order.status !== "ready" && (
            <Button
              onClick={() => onMarkReady(order.id)}
              disabled={loading}
              size="sm"
              className="gap-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Ready
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
