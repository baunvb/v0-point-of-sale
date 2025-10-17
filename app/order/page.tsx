"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"
import { TableSelectorPublic } from "@/components/public/table-selector-public"
import { MenuGridPublic } from "@/components/public/menu-grid-public"
import { OrderCartPublic } from "@/components/public/order-cart-public"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { apiClient } from "@/lib/api-client"
import type { PublicMenuItem, PublicCartItem } from "@/lib/types/public-order"
import { v4 as uuidv4 } from "crypto"

export default function PublicOrderPage() {
  const { t } = useLanguage()
  const [menuItems, setMenuItems] = useState<PublicMenuItem[]>([])
  const [cartItems, setCartItems] = useState<PublicCartItem[]>([])
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchMenuItems()
    const savedCart = localStorage.getItem("publicOrderCart")
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        setCartItems(parsed.items || [])
        setSelectedTable(parsed.tableNumber || null)
      } catch (e) {
        console.error("Failed to load saved cart:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedTable) {
      localStorage.setItem(
        "publicOrderCart",
        JSON.stringify({
          tableNumber: selectedTable,
          items: cartItems,
        }),
      )
    }
  }, [cartItems, selectedTable])

  const fetchMenuItems = async () => {
    try {
      const data = await apiClient.get<{ data: PublicMenuItem[] }>("/menus/public")
      setMenuItems(data.data || [])
    } catch (error) {
      console.error("Failed to fetch menu items:", error)
      setError(t("failedToLoadMenuItems"))
    }
  }

  const handleAddItem = (item: PublicMenuItem) => {
    const cartItem: PublicCartItem = {
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
      setError(t("pleaseSelectTable"))
      return
    }

    if (cartItems.length === 0) {
      setError(t("cartIsEmpty"))
      return
    }

    try {
      setLoading(true)
      setError("")

      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      const orderData = {
        tableNumber: selectedTable,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          toppings: item.toppings,
          notes: item.notes,
        })),
        totalAmount,
      }

      await apiClient.post("/orders/public", orderData)

      setSuccess(t("orderSubmittedSuccessfully"))
      setCartItems([])
      localStorage.removeItem("publicOrderCart")

      setTimeout(() => {
        setSuccess("")
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t("failedToSubmitOrder"))
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = () => {
    if (!selectedTable) {
      setError(t("pleaseSelectTable"))
      return
    }

    if (cartItems.length === 0) {
      setError(t("cartIsEmpty"))
      return
    }

    // TODO: Implement payment gateway integration
    alert(t("paymentFeatureComingSoon"))
  }

  const categories = ["all", ...new Set(menuItems.map((item) => item.category))]
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{t("restaurantOrder")}</h1>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-600 mt-2">{t("selectTableAndOrder")}</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <TableSelectorPublic selectedTable={selectedTable} onSelectTable={setSelectedTable} />

            {selectedTable && (
              <div className="space-y-4">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList
                    className="grid w-full gap-2"
                    style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 5)}, 1fr)` }}
                  >
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="capitalize text-xs md:text-sm">
                        {category === "all" ? t("all") : category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {categories.map((category) => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <MenuGridPublic items={menuItems} selectedCategory={category} onAddItem={handleAddItem} />
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div>
            <OrderCartPublic
              items={cartItems}
              selectedTable={selectedTable?.toString() || ""}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onUpdateNotes={handleUpdateNotes}
              onSubmitOrder={handleSubmitOrder}
              onPayment={handlePayment}
              loading={loading}
              totalAmount={totalAmount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
