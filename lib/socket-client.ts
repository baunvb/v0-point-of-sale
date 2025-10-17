import io, { type Socket } from "socket.io-client"

let socket: Socket | null = null

export function initializeSocket(token: string): Socket {
  if (socket) {
    return socket
  }

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"

  socket = io(socketUrl, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  socket.on("connect", () => {
    console.log("[v0] Socket connected:", socket?.id)
  })

  socket.on("disconnect", () => {
    console.log("[v0] Socket disconnected")
  })

  socket.on("error", (error) => {
    console.error("[v0] Socket error:", error)
  })

  return socket
}

export function getSocket(): Socket | null {
  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

// Event listeners
export function onOrderCreated(callback: (order: any) => void) {
  const sock = getSocket()
  if (sock) {
    sock.on("order:created", callback)
  }
}

export function onOrderUpdated(callback: (order: any) => void) {
  const sock = getSocket()
  if (sock) {
    sock.on("order:updated", callback)
  }
}

export function onOrderStatusChanged(callback: (data: { orderId: string; status: string }) => void) {
  const sock = getSocket()
  if (sock) {
    sock.on("order:status-changed", callback)
  }
}

// Event emitters
export function emitOrderStatusUpdate(orderId: string, status: string) {
  const sock = getSocket()
  if (sock) {
    sock.emit("order:update-status", { orderId, status })
  }
}
