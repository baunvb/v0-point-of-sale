"use client"

import { useState, useEffect } from "react"
import { ManagerLayout } from "@/components/layouts/manager-layout"
import { MenuForm } from "@/components/manager/menu-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2 } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { MenuItem } from "@/lib/types/manager"

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await apiClient.get<{ data: MenuItem[] }>("/menus", token || "")
      setMenuItems(data.data || [])
    } catch (error) {
      console.error("Failed to fetch menu items:", error)
    }
  }

  const handleCreateMenuItem = async (data: {
    name: string
    description: string
    price: number
    category: string
    available: boolean
  }) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      await apiClient.post("/menus", data, token || "")
      await fetchMenuItems()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return

    try {
      const token = localStorage.getItem("token")
      await apiClient.delete(`/menus/${id}`, token || "")
      await fetchMenuItems()
    } catch (error) {
      console.error("Failed to delete menu item:", error)
    }
  }

  return (
    <ManagerLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Add, edit, or remove menu items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MenuForm onSubmit={handleCreateMenuItem} loading={loading} />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>All available menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menuItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={item.available ? "default" : "secondary"}>
                              {item.available ? "Available" : "Unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ManagerLayout>
  )
}
