import type { Role } from "@/lib/constants/roles"

export interface RoleFeatures {
  role: Role
  features: Feature[]
}

export interface Feature {
  id: string
  name: string
  description: string
  module: FeatureModule
  actions: FeatureAction[]
}

export type FeatureModule =
  | "user-management"
  | "menu-management"
  | "order-management"
  | "table-management"
  | "topping-management"
  | "reports"
  | "kitchen"

export interface FeatureAction {
  id: string
  name: string
  description: string
  endpoint?: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
}

export interface UserRole {
  id: string
  email: string
  role: Role
  name: string
  createdAt: Date
  updatedAt: Date
}
