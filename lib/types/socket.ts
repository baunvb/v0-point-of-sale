export interface SocketEvents {
  "order:created": (order: any) => void
  "order:updated": (order: any) => void
  "order:status-changed": (data: { orderId: string; status: string }) => void
  "menu:updated": (menu: any) => void
  "table:status-changed": (data: { tableId: string; status: string }) => void
}
