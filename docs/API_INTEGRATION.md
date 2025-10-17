# API Integration Guide

## Overview

This Point of Sale system integrates with a backend API for all data operations. The API uses REST endpoints with JWT authentication via Bearer tokens.

## Authentication

All API requests (except login) require a Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

The token is stored in localStorage after successful login and automatically included in all API requests via the `apiClient`.

## API Client Usage

The `apiClient` utility handles all HTTP requests with automatic token management:

\`\`\`typescript
import { apiClient } from "@/lib/api-client"

// GET request
const data = await apiClient.get<T>("/endpoint", token)

// POST request
const result = await apiClient.post<T>("/endpoint", data, token)

// PUT request
const updated = await apiClient.put<T>("/endpoint", data, token)

// DELETE request
await apiClient.delete<T>("/endpoint", token)
\`\`\`

## Socket.io Real-time Updates

The system uses Socket.io for real-time updates across all clients:

### Initialization

\`\`\`typescript
import { useSocket } from "@/hooks/use-socket"

export function MyComponent() {
  const socket = useSocket()
  // Socket is automatically initialized with auth token
}
\`\`\`

### Real-time Order Updates

\`\`\`typescript
import { useRealTimeOrders } from "@/hooks/use-real-time-orders"

export function OrderList() {
  const orders = useRealTimeOrders(initialOrders)
  // Orders automatically update when changes occur
}
\`\`\`

### Socket Events

#### Server → Client Events

- `order:created` - New order created
- `order:updated` - Order details updated
- `order:status-changed` - Order status changed
- `menu:updated` - Menu item updated
- `table:status-changed` - Table status changed

#### Client → Server Events

- `order:update-status` - Update order status
- `order:acknowledge` - Acknowledge order received

### Example: Kitchen Display System

\`\`\`typescript
import { useRealTimeOrders } from "@/hooks/use-real-time-orders"
import { emitOrderStatusUpdate } from "@/lib/socket-client"

export function KitchenDisplay() {
  const orders = useRealTimeOrders([])

  const handleMarkReady = (orderId: string) => {
    emitOrderStatusUpdate(orderId, "ready")
  }

  return (
    // Render orders with real-time updates
  )
}
\`\`\`

## API Endpoints

### Authentication

- `POST /auth/login` - Login with email and password
- `POST /auth/logout` - Logout current user

### Users Management

- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/:id/change-password` - Change password
- `POST /users/:id/reset-password` - Reset password

### Menu Management

- `GET /menus` - Get all menu items
- `POST /menus` - Create menu item
- `GET /menus/:id` - Get menu item by ID
- `PUT /menus/:id` - Update menu item
- `DELETE /menus/:id` - Delete menu item

### Order Management

- `GET /orders` - Get all orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order by ID
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order
- `PUT /orders/:id/status` - Change order status

### Table Management

- `GET /tables` - Get all tables
- `POST /tables` - Create table
- `GET /tables/:id` - Get table by ID
- `PUT /tables/:id` - Update table
- `DELETE /tables/:id` - Delete table

### Kitchen Display

- `GET /kitchen/orders` - Get orders for kitchen display

### Reports

- `GET /reports` - Get all reports
- `GET /reports/:id` - Get report by ID

## Error Handling

All API errors are thrown as exceptions. Handle them in try-catch blocks:

\`\`\`typescript
try {
  const data = await apiClient.get("/endpoint", token)
} catch (error) {
  console.error("API Error:", error)
  // Handle error appropriately
}
\`\`\`

## Environment Variables

Configure these environment variables for API integration:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
\`\`\`

## Socket.io Connection

The Socket.io client automatically:
- Connects on app initialization
- Authenticates using the JWT token
- Reconnects on disconnection (up to 5 attempts)
- Handles all real-time events

Connection status can be monitored via the socket instance returned from `useSocket()`.
