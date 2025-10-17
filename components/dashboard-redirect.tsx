"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DashboardRedirect() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Route to appropriate dashboard based on role
    switch (user?.role) {
      case "admin":
        router.push("/admin/dashboard")
        break
      case "manager":
        router.push("/manager/dashboard")
        break
      case "employee":
        router.push("/employee/dashboard")
        break
      case "kitchen":
        router.push("/kitchen/display")
        break
      default:
        router.push("/login")
    }
  }, [user, isAuthenticated, loading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}
