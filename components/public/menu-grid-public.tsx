"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import type { PublicMenuItem } from "@/lib/types/public-order"

interface MenuGridPublicProps {
  items: PublicMenuItem[]
  selectedCategory: string
  onAddItem: (item: PublicMenuItem) => void
}

export function MenuGridPublic({ items, selectedCategory, onAddItem }: MenuGridPublicProps) {
  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                {item.description && <CardDescription className="text-xs mt-1">{item.description}</CardDescription>}
              </div>
              <Badge variant="secondary" className="whitespace-nowrap">
                {item.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</span>
              <Button size="sm" onClick={() => onAddItem(item)} className="gap-1">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
