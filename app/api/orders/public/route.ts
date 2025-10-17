import { NextResponse } from "next/server"

// In-memory storage for public orders (in production, use a database)
const publicOrders: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tableNumber, items, totalAmount } = body

    if (!tableNumber || !items || items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 })
    }

    const newOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tableNumber,
      items,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    publicOrders.push(newOrder)

    // TODO: Emit socket event to kitchen display
    console.log("[v0] New public order created:", newOrder)

    return NextResponse.json({
      data: newOrder,
      success: true,
    })
  } catch (error) {
    console.error("Error creating public order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      data: publicOrders,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching public orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
