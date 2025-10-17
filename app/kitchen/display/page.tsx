"use client"

import { useState, useEffect } from "react"
import { KitchenLayout } from "@/components/layouts/kitchen-layout"
import { OrderCard } from "@/components/kitchen/order-card"
import { PublicOrderCard } from "@/components/kitchen/public-order-card"
import { OrderFilter } from "@/components/kitchen/order-filter"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiClient } from "@/lib/api-client"
import type { Order } from "@/lib/types/manager"
import type { PublicOrder } from "@/lib/types/public-order"

export default function KitchenDisplayPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [publicOrders, setPublicOrders] = useState<PublicOrder[]>([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      const [authData, publicData] = await Promise.all([
        apiClient.get<{ data: Order[] }>("/kitchen/orders", token || "").catch(() => ({ data: [] })),
        apiClient.get<{ data: PublicOrder[] }>("/kitchen/orders/public").catch(() => ({ data: [] })),
      ])
      setOrders(authData.data || [])
      setPublicOrders(publicData.data || [])
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      setError("Failed to load orders")
    }
  }

  const handleMarkReady = async (orderId: string, isPublic = false) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const endpoint = isPublic ? `/orders/public/${orderId}` : `/orders/${orderId}`
      await apiClient.put(endpoint, { status: "ready" }, token || "")
      await fetchOrders()
    } catch (error) {
      console.error("Failed to update order:", error)
      setError("Failed to update order status")
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = selectedStatus === "all" ? orders : orders.filter((order) => order.status === selectedStatus)
  const filteredPublicOrders =
    selectedStatus === "all" ? publicOrders : publicOrders.filter((order) => order.status === selectedStatus)

  const statusCounts = {
    all: orders.length + publicOrders.length,
    pending:
      orders.filter((o) => o.status === "pending").length + publicOrders.filter((o) => o.status === "pending").length,
    confirmed:
      orders.filter((o) => o.status === "confirmed").length +
      publicOrders.filter((o) => o.status === "confirmed").length,
    preparing:
      orders.filter((o) => o.status === "preparing").length +
      publicOrders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length + publicOrders.filter((o) => o.status === "ready").length,
  }

  return (
    <KitchenLayout>
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <OrderFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} statusCounts={statusCounts} />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Orders ({statusCounts.all})</TabsTrigger>
            <TabsTrigger value="employee">Employee Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="public">Public Orders ({publicOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.length === 0 && filteredPublicOrders.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No orders to display</p>
                </div>
              ) : (
                <>
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onMarkReady={() => handleMarkReady(order.id, false)}
                      loading={loading}
                    />
                  ))}
                  {filteredPublicOrders.map((order) => (
                    <PublicOrderCard
                      key={order.id}
                      order={order}
                      onMarkReady={() => handleMarkReady(order.id, true)}
                      loading={loading}
                    />
                  ))}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="employee" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No employee orders</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={() => handleMarkReady(order.id, false)}
                    loading={loading}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="public" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPublicOrders.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">No public orders</p>
                </div>
              ) : (
                filteredPublicOrders.map((order) => (
                  <PublicOrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={() => handleMarkReady(order.id, true)}
                    loading={loading}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </KitchenLayout>
  )
}
