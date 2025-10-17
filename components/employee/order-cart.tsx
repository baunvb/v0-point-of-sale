"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus } from "lucide-react"

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  toppings: string[]
  notes: string
}

interface OrderCartProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onUpdateNotes: (id: string, notes: string) => void
  onSubmitOrder: () => Promise<void>
  loading?: boolean
  selectedTable: string
}

export function OrderCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
  onSubmitOrder,
  loading = false,
  selectedTable,
}: OrderCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Cart</CardTitle>
        {selectedTable && <p className="text-sm text-muted-foreground">Table: {selectedTable}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No items in cart</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                  <span className="ml-auto font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <Input
                  placeholder="Add notes..."
                  value={item.notes}
                  onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                  className="text-xs"
                />
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button onClick={onSubmitOrder} disabled={items.length === 0 || loading || !selectedTable} className="w-full">
            {loading ? "Submitting..." : "Submit Order to Kitchen"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
