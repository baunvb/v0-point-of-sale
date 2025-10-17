"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, LogOut } from "lucide-react"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (user?.role !== "admin") {
    return <div>Access Denied</div>
  }

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 border-r">
        <SidebarHeader className="border-b p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/dashboard" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/admin/accounts" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Manage Accounts
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <div className="border-t p-4">
          <p className="text-sm text-muted-foreground mb-2">Logged in as: {user?.name}</p>
          <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </Sidebar>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
