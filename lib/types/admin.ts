export interface Manager {
  id: string
  email: string
  name: string
  restaurantId: string
  createdAt: string
  updatedAt: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin"
  createdAt: string
  updatedAt: string
}

export interface CreateManagerRequest {
  email: string
  name: string
  password: string
}

export interface CreateAdminRequest {
  email: string
  name: string
  password: string
}
