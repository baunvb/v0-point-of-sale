"use client"

import { useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { initializeSocket, getSocket } from "@/lib/socket-client"
import type { Socket } from "socket.io-client"

export function useSocket() {
  const { user } = useAuth()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!user) return

    const token = localStorage.getItem("token")
    if (!token) return

    try {
      socketRef.current = initializeSocket(token)
    } catch (error) {
      console.error("[v0] Failed to initialize socket:", error)
    }

    return () => {
      // Don't disconnect on unmount, keep connection alive
      // disconnectSocket()
    }
  }, [user])

  return getSocket()
}
