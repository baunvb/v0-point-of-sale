export interface PublicMenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: string
  image?: string
}

export interface PublicTopping {
  id: string
  name: string
  price: number
}

export interface PublicCartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  toppings: PublicTopping[]
  notes: string
}

export interface PublicOrder {
  id: string
  tableNumber: number
  items: PublicCartItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "paid"
  createdAt: string
  updatedAt: string
}

export interface PublicOrderSession {
  tableNumber: number
  orderId?: string
  items: PublicCartItem[]
  totalAmount: number
}
