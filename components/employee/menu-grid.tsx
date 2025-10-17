"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import type { MenuItem } from "@/lib/types/manager"

interface MenuGridProps {
  items: MenuItem[]
  onAddItem: (item: MenuItem) => void
  selectedCategory: string
}

export function MenuGrid({ items, onAddItem, selectedCategory }: MenuGridProps) {
  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((item) => (
        <Card key={item.id} className={!item.available ? "opacity-50" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription className="text-xs mt-1">{item.description}</CardDescription>
              </div>
              {!item.available && <Badge variant="secondary">Unavailable</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">${item.price.toFixed(2)}</span>
              <Button onClick={() => onAddItem(item)} disabled={!item.available} size="sm" className="gap-1">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
