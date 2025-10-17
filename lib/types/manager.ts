export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
  createdAt: string
  updatedAt: string
}

export interface Table {
  id: string
  tableNumber: number
  capacity: number
  status: "available" | "occupied" | "reserved"
  createdAt: string
  updatedAt: string
}

export interface Topping {
  id: string
  name: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  tableId: string
  items: OrderItem[]
  status: "pending" | "confirmed" | "preparing" | "ready" | "served" | "completed"
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  menuItemId: string
  quantity: number
  toppings: string[]
  notes: string
}

export interface Report {
  id: string
  date: string
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  topItems: MenuItem[]
}
