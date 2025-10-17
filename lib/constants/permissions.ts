import { ROLES, type Role } from "./roles"

export const PERMISSIONS = {
  // User Management
  CREATE_ADMIN: "create_admin",
  CREATE_MANAGER: "create_manager",
  CREATE_EMPLOYEE: "create_employee",
  VIEW_USERS: "view_users",
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",
  RESET_PASSWORD: "reset_password",

  // Menu Management
  VIEW_MENU: "view_menu",
  CREATE_MENU_ITEM: "create_menu_item",
  EDIT_MENU_ITEM: "edit_menu_item",
  DELETE_MENU_ITEM: "delete_menu_item",

  // Topping Management
  VIEW_TOPPINGS: "view_toppings",
  CREATE_TOPPING: "create_topping",
  EDIT_TOPPING: "edit_topping",
  DELETE_TOPPING: "delete_topping",

  // Table Management
  VIEW_TABLES: "view_tables",
  CREATE_TABLE: "create_table",
  EDIT_TABLE: "edit_table",
  DELETE_TABLE: "delete_table",

  // Order Management
  VIEW_ORDERS: "view_orders",
  CREATE_ORDER: "create_order",
  EDIT_ORDER: "edit_order",
  DELETE_ORDER: "delete_order",
  CHANGE_ORDER_STATUS: "change_order_status",
  SEND_TO_KITCHEN: "send_to_kitchen",

  // Kitchen
  VIEW_KITCHEN_ORDERS: "view_kitchen_orders",
  UPDATE_ORDER_STATUS: "update_order_status",

  // Reports
  VIEW_REPORTS: "view_reports",
  EXPORT_REPORTS: "export_reports",
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.ADMIN]: [
    // All permissions for Admin
    PERMISSIONS.CREATE_ADMIN,
    PERMISSIONS.CREATE_MANAGER,
    PERMISSIONS.CREATE_EMPLOYEE,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.EDIT_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.RESET_PASSWORD,
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.CREATE_MENU_ITEM,
    PERMISSIONS.EDIT_MENU_ITEM,
    PERMISSIONS.DELETE_MENU_ITEM,
    PERMISSIONS.VIEW_TOPPINGS,
    PERMISSIONS.CREATE_TOPPING,
    PERMISSIONS.EDIT_TOPPING,
    PERMISSIONS.DELETE_TOPPING,
    PERMISSIONS.VIEW_TABLES,
    PERMISSIONS.CREATE_TABLE,
    PERMISSIONS.EDIT_TABLE,
    PERMISSIONS.DELETE_TABLE,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.EDIT_ORDER,
    PERMISSIONS.DELETE_ORDER,
    PERMISSIONS.CHANGE_ORDER_STATUS,
    PERMISSIONS.SEND_TO_KITCHEN,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
  ],

  [ROLES.MANAGER]: [
    // Manager permissions (no user creation/deletion)
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.CREATE_MENU_ITEM,
    PERMISSIONS.EDIT_MENU_ITEM,
    PERMISSIONS.DELETE_MENU_ITEM,
    PERMISSIONS.VIEW_TOPPINGS,
    PERMISSIONS.CREATE_TOPPING,
    PERMISSIONS.EDIT_TOPPING,
    PERMISSIONS.DELETE_TOPPING,
    PERMISSIONS.VIEW_TABLES,
    PERMISSIONS.CREATE_TABLE,
    PERMISSIONS.EDIT_TABLE,
    PERMISSIONS.DELETE_TABLE,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.EDIT_ORDER,
    PERMISSIONS.DELETE_ORDER,
    PERMISSIONS.CHANGE_ORDER_STATUS,
    PERMISSIONS.SEND_TO_KITCHEN,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
  ],

  [ROLES.EMPLOYEE]: [
    // Employee permissions (limited to order creation)
    PERMISSIONS.VIEW_MENU,
    PERMISSIONS.VIEW_TOPPINGS,
    PERMISSIONS.VIEW_TABLES,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.SEND_TO_KITCHEN,
  ],

  [ROLES.KITCHEN]: [
    // Kitchen staff permissions (view and update order status only)
    PERMISSIONS.VIEW_KITCHEN_ORDERS,
    PERMISSIONS.UPDATE_ORDER_STATUS,
  ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}
