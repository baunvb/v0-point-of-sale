export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "employee" | "kitchen"
  restaurantId?: string
  createdAt: string
  updatedAt: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}
