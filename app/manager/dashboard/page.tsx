"use client"

import { useState, useEffect } from "react"
import { ManagerLayout } from "@/components/layouts/manager-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, TrendingUp, Clock } from "lucide-react"

export default function ManagerDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalTables: 0,
    totalRevenue: 0,
    activeOrders: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      // In a real app, you would fetch actual stats from the API
      setStats({
        totalOrders: 156,
        totalTables: 20,
        totalRevenue: 4250.5,
        activeOrders: 8,
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  return (
    <ManagerLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manager Dashboard</h1>
          <p className="text-muted-foreground">Overview of your restaurant operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">Being prepared</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tables</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTables}</div>
              <p className="text-xs text-muted-foreground">Total capacity</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common manager tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/manager/menu" className="p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-semibold">Manage Menu</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove menu items</p>
              </a>
              <a href="/manager/tables" className="p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-semibold">Manage Tables</h3>
                <p className="text-sm text-muted-foreground">Configure table settings</p>
              </a>
              <a href="/manager/reports" className="p-4 border rounded-lg hover:bg-accent transition-colors">
                <h3 className="font-semibold">View Reports</h3>
                <p className="text-sm text-muted-foreground">Analyze sales and performance</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  )
}
