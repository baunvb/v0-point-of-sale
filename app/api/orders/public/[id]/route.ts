import { NextResponse } from "next/server"

// In-memory storage (in production, use a database)
const publicOrders: any[] = []

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body
    const { id } = params

    // Find and update order
    const orderIndex = publicOrders.findIndex((o) => o.id === id)
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    publicOrders[orderIndex].status = status
    publicOrders[orderIndex].updatedAt = new Date().toISOString()

    // TODO: Emit socket event to kitchen display
    console.log("[v0] Public order updated:", publicOrders[orderIndex])

    return NextResponse.json({
      data: publicOrders[orderIndex],
      success: true,
    })
  } catch (error) {
    console.error("Error updating public order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
