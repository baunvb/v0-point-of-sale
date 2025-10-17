"use client"

import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus } from "lucide-react"
import type { PublicCartItem } from "@/lib/types/public-order"

interface OrderCartPublicProps {
  items: PublicCartItem[]
  selectedTable: string
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onUpdateNotes: (id: string, notes: string) => void
  onSubmitOrder: () => void
  onPayment: () => void
  loading: boolean
  totalAmount: number
}

export function OrderCartPublic({
  items,
  selectedTable,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
  onSubmitOrder,
  onPayment,
  loading,
  totalAmount,
}: OrderCartPublicProps) {
  const { t } = useLanguage()

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>{t("orderSummary")}</CardTitle>
        {selectedTable && (
          <CardDescription>
            {t("table")} {selectedTable}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-96 overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">{t("noItemsInCart")}</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    {item.toppings.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {t("toppings")}: {item.toppings.map((t) => t.name).join(", ")}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)} className="h-6 w-6 p-0">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 border rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="h-6 w-6 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <Input
                  placeholder={t("addNotes")}
                  value={item.notes}
                  onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                  className="h-8 text-xs"
                />
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{t("total")}:</span>
            <span className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <Button onClick={onSubmitOrder} disabled={items.length === 0 || loading} className="w-full" size="lg">
              {loading ? t("submitting") : t("addToOrder")}
            </Button>
            <Button
              onClick={onPayment}
              disabled={items.length === 0}
              variant="outline"
              className="w-full bg-transparent"
              size="lg"
            >
              {t("payment")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
