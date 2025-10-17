"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Table } from "@/lib/types/manager"

interface TableSelectorProps {
  tables: Table[]
  selectedTable: string | null
  onSelectTable: (tableId: string) => void
}

export function TableSelector({ tables, selectedTable, onSelectTable }: TableSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Table</CardTitle>
        <CardDescription>Choose a table for this order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {tables.map((table) => (
            <Button
              key={table.id}
              variant={selectedTable === table.id ? "default" : "outline"}
              className="h-auto flex flex-col items-center justify-center py-3"
              onClick={() => onSelectTable(table.id)}
              disabled={table.status !== "available"}
            >
              <span className="font-semibold">T{table.tableNumber}</span>
              <span className="text-xs text-muted-foreground">Cap: {table.capacity}</span>
              <Badge variant="secondary" className="mt-1 text-xs">
                {table.status}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
