"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle } from "lucide-react"
import type { PublicOrder } from "@/lib/types/public-order"

interface PublicOrderCardProps {
  order: PublicOrder
  onMarkReady: (orderId: string) => Promise<void>
  loading?: boolean
}

export function PublicOrderCard({ order, onMarkReady, loading = false }: PublicOrderCardProps) {
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
            <CardTitle className="text-lg">Table {order.tableNumber}</CardTitle>
            <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">{getTimeElapsed(order.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {order.items.map((item, idx) => (
            <div key={idx} className="border-b pb-2 last:border-b-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-xs text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              {item.toppings.length > 0 && (
                <p className="text-xs text-muted-foreground ml-2">
                  Toppings: {item.toppings.map((t) => t.name).join(", ")}
                </p>
              )}
              {item.notes && <p className="text-xs text-muted-foreground italic ml-2">Note: {item.notes}</p>}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex flex-col">
            <Badge className={`${getStatusColor(order.status)} capitalize w-fit`}>{order.status}</Badge>
            <span className="text-xs text-muted-foreground mt-1">Total: ${order.totalAmount.toFixed(2)}</span>
          </div>
          {order.status !== "ready" && order.status !== "completed" && order.status !== "paid" && (
            <Button
              onClick={() => onMarkReady(order.id)}
              disabled={loading}
              size="sm"
              className="gap-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              Ready
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
