"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { AccountForm } from "@/components/admin/account-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { apiClient } from "@/lib/api-client"

interface Account {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token")
      const data = await apiClient.get<{ data: Account[] }>("/users", token || "")
      setAccounts(data.data || [])
    } catch (error) {
      console.error("Failed to fetch accounts:", error)
    }
  }

  const handleCreateAccount = async (data: { email: string; name: string; password: string; role: string }) => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      await apiClient.post("/users", data, token || "")
      await fetchAccounts()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async (id: string) => {
    if (!confirm("Are you sure you want to delete this account?")) return

    try {
      const token = localStorage.getItem("token")
      await apiClient.delete(`/users/${id}`, token || "")
      await fetchAccounts()
    } catch (error) {
      console.error("Failed to delete account:", error)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Accounts</h1>
          <p className="text-muted-foreground">Create and manage admin and manager accounts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AccountForm onSubmit={handleCreateAccount} loading={loading} />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Existing Accounts</CardTitle>
                <CardDescription>All admin and manager accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.name}</TableCell>
                          <TableCell>{account.email}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm capitalize">
                              {account.role}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(account.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAccount(account.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
