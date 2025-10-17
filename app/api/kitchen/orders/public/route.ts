import { NextResponse } from "next/server"

// In-memory storage (in production, use a database)
const publicOrders: any[] = []

export async function GET() {
  try {
    // Filter orders that are not completed or paid
    const activeOrders = publicOrders.filter((o) => !["completed", "paid"].includes(o.status))

    return NextResponse.json({
      data: activeOrders,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching kitchen public orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
