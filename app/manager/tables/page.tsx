"use client"

import { useState, useEffect } from "react"
import { ManagerLayout } from "@/components/layouts/manager-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { apiClient } from "@/lib/api-client"
import type { Table } from "@/lib/types/manager"

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([])

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await apiClient.get<{ data: Table[] }>("/tables", token || "")
      setTables(data.data || [])
    } catch (error) {
      console.error("Failed to fetch tables:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-orange-100 text-orange-800"
      case "reserved":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ManagerLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Table Management</h1>
          <p className="text-muted-foreground">View and manage restaurant tables</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tables.map((table) => (
            <Card key={table.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Table {table.tableNumber}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Capacity: {table.capacity}</p>
                  <Badge className={`${getStatusColor(table.status)} capitalize`}>{table.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ManagerLayout>
  )
}
