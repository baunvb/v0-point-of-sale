"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { MenuGrid } from "@/components/employee/menu-grid"
import { OrderCart, type CartItem } from "@/components/employee/order-cart"
import { TableSelector } from "@/components/employee/table-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiClient } from "@/lib/api-client"
import type { MenuItem, Table } from "@/lib/types/manager"
import { v4 as uuidv4 } from "crypto"

export default function EmployeeDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchMenuItems()
    fetchTables()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await apiClient.get<{ data: MenuItem[] }>("/menus", token || "")
      setMenuItems(data.data || [])
    } catch (error) {
      console.error("Failed to fetch menu items:", error)
      setError("Failed to load menu items")
    }
  }

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await apiClient.get<{ data: Table[] }>("/tables", token || "")
      setTables(data.data || [])
    } catch (error) {
      console.error("Failed to fetch tables:", error)
      setError("Failed to load tables")
    }
  }

  const handleAddItem = (item: MenuItem) => {
    const cartItem: CartItem = {
      id: uuidv4(),
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      toppings: [],
      notes: "",
    }
    setCartItems([...cartItems, cartItem])
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleUpdateNotes = (id: string, notes: string) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, notes } : item)))
  }

  const handleSubmitOrder = async () => {
    if (!selectedTable) {
      setError("Please select a table")
      return
    }

    if (cartItems.length === 0) {
      setError("Cart is empty")
      return
    }

    try {
      setLoading(true)
      setError("")
      const token = localStorage.getItem("token")

      const orderData = {
        tableId: selectedTable,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          toppings: item.toppings,
          notes: item.notes,
        })),
        totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }

      await apiClient.post("/orders", orderData, token || "")

      setSuccess("Order submitted to kitchen successfully!")
      setCartItems([])
      setSelectedTable(null)

      setTimeout(() => {
        setSuccess("")
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit order")
    } finally {
      setLoading(false)
    }
  }

  const categories = ["all", ...new Set(menuItems.map((item) => item.category))]

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TableSelector tables={tables} selectedTable={selectedTable} onSelectTable={setSelectedTable} />

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category === "all" ? "All" : category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <MenuGrid items={menuItems} onAddItem={handleAddItem} selectedCategory={category} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div>
            <OrderCart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onUpdateNotes={handleUpdateNotes}
              onSubmitOrder={handleSubmitOrder}
              loading={loading}
              selectedTable={
                selectedTable ? tables.find((t) => t.id === selectedTable)?.tableNumber.toString() || "" : ""
              }
            />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  )
}
