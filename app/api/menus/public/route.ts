import { NextResponse } from "next/server"
import { mockMenuItems } from "@/app/api/mock-data"

export async function GET() {
  try {
    // In production, this would fetch from your database
    return NextResponse.json({
      data: mockMenuItems,
      success: true,
    })
  } catch (error) {
    console.error("Error fetching public menus:", error)
    return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 })
  }
}
