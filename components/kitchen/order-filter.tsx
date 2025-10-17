"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface OrderFilterProps {
  selectedStatus: string
  onStatusChange: (status: string) => void
  statusCounts: Record<string, number>
}

export function OrderFilter({ selectedStatus, onStatusChange, statusCounts }: OrderFilterProps) {
  const statuses = ["all", "pending", "confirmed", "preparing", "ready"]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={selectedStatus === status ? "default" : "outline"}
          onClick={() => onStatusChange(status)}
          className="gap-2"
        >
          <span className="capitalize">{status}</span>
          <Badge variant="secondary">{statusCounts[status] || 0}</Badge>
        </Button>
      ))}
    </div>
  )
}
