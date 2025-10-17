"use client"

import { useEffect, useState } from "react"
import { useSocket } from "./use-socket"
import type { Order } from "@/lib/types/manager"

export function useRealTimeOrders(initialOrders: Order[]) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return

    // Listen for new orders
    socket.on("order:created", (newOrder: Order) => {
      console.log("[v0] New order received:", newOrder)
      setOrders((prev) => [newOrder, ...prev])
    })

    // Listen for order updates
    socket.on("order:updated", (updatedOrder: Order) => {
      console.log("[v0] Order updated:", updatedOrder)
      setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)))
    })

    // Listen for status changes
    socket.on("order:status-changed", (data: { orderId: string; status: string }) => {
      console.log("[v0] Order status changed:", data)
      setOrders((prev) =>
        prev.map((order) => (order.id === data.orderId ? { ...order, status: data.status as any } : order)),
      )
    })

    return () => {
      socket.off("order:created")
      socket.off("order:updated")
      socket.off("order:status-changed")
    }
  }, [socket])

  return orders
}
