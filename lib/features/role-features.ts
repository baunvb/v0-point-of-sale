import type { RoleFeatures, Feature } from "@/lib/types/features"
import { ROLES } from "@/lib/constants/roles"

const adminFeatures: Feature[] = [
  {
    id: "admin-user-management",
    name: "User Management",
    description: "Create, edit, and delete Admin and Manager accounts",
    module: "user-management",
    actions: [
      {
        id: "create-admin",
        name: "Create Admin Account",
        description: "Create new admin user account",
        endpoint: "POST /users",
        method: "POST",
      },
      {
        id: "create-manager",
        name: "Create Manager Account",
        description: "Create new manager user account",
        endpoint: "POST /users",
        method: "POST",
      },
      {
        id: "view-all-users",
        name: "View All Users",
        description: "View all users in the system",
        endpoint: "GET /users",
        method: "GET",
      },
      {
        id: "edit-user",
        name: "Edit User",
        description: "Edit user information",
        endpoint: "PUT /users/:id",
        method: "PUT",
      },
      {
        id: "delete-user",
        name: "Delete User",
        description: "Delete user account",
        endpoint: "DELETE /users/:id",
        method: "DELETE",
      },
      {
        id: "reset-password",
        name: "Reset User Password",
        description: "Reset password for any user",
        endpoint: "POST /users/admin-change-password",
        method: "POST",
      },
    ],
  },
  {
    id: "admin-menu-management",
    name: "Menu Management",
    description: "Manage menu items and categories",
    module: "menu-management",
    actions: [
      {
        id: "view-menu",
        name: "View Menu",
        description: "View all menu items",
        endpoint: "GET /menus",
        method: "GET",
      },
      {
        id: "create-menu-item",
        name: "Create Menu Item",
        description: "Add new menu item",
        endpoint: "POST /menus",
        method: "POST",
      },
      {
        id: "edit-menu-item",
        name: "Edit Menu Item",
        description: "Update menu item details",
        endpoint: "PUT /menus/:id",
        method: "PUT",
      },
      {
        id: "delete-menu-item",
        name: "Delete Menu Item",
        description: "Remove menu item",
        endpoint: "DELETE /menus/:id",
        method: "DELETE",
      },
    ],
  },
  {
    id: "admin-topping-management",
    name: "Topping Management",
    description: "Manage toppings and add-ons",
    module: "topping-management",
    actions: [
      {
        id: "view-toppings",
        name: "View Toppings",
        description: "View all available toppings",
        endpoint: "GET /toppings",
        method: "GET",
      },
      {
        id: "create-topping",
        name: "Create Topping",
        description: "Add new topping",
        endpoint: "POST /toppings",
        method: "POST",
      },
      {
        id: "edit-topping",
        name: "Edit Topping",
        description: "Update topping details",
        endpoint: "PUT /toppings/:id",
        method: "PUT",
      },
      {
        id: "delete-topping",
        name: "Delete Topping",
        description: "Remove topping",
        endpoint: "DELETE /toppings/:id",
        method: "DELETE",
      },
    ],
  },
  {
    id: "admin-table-management",
    name: "Table Management",
    description: "Manage restaurant tables",
    module: "table-management",
    actions: [
      {
        id: "view-tables",
        name: "View Tables",
        description: "View all tables",
        endpoint: "GET /tables",
        method: "GET",
      },
      {
        id: "create-table",
        name: "Create Table",
        description: "Add new table",
        endpoint: "POST /tables",
        method: "POST",
      },
      {
        id: "edit-table",
        name: "Edit Table",
        description: "Update table details",
        endpoint: "PUT /tables/:id",
        method: "PUT",
      },
      {
        id: "delete-table",
        name: "Delete Table",
        description: "Remove table",
        endpoint: "DELETE /tables/:id",
        method: "DELETE",
      },
    ],
  },
  {
    id: "admin-order-management",
    name: "Order Management",
    description: "Manage all orders",
    module: "order-management",
    actions: [
      {
        id: "view-orders",
        name: "View Orders",
        description: "View all orders",
        endpoint: "GET /orders",
        method: "GET",
      },
      {
        id: "create-order",
        name: "Create Order",
        description: "Create new order",
        endpoint: "POST /orders",
        method: "POST",
      },
      {
        id: "edit-order",
        name: "Edit Order",
        description: "Update order details",
        endpoint: "PUT /orders/:id",
        method: "PUT",
      },
      {
        id: "delete-order",
        name: "Delete Order",
        description: "Cancel order",
        endpoint: "DELETE /orders/:id",
        method: "DELETE",
      },
      {
        id: "change-order-status",
        name: "Change Order Status",
        description: "Update order status",
        endpoint: "PATCH /orders/:id/status",
        method: "PATCH",
      },
    ],
  },
  {
    id: "admin-reports",
    name: "Reports & Analytics",
    description: "View sales reports and analytics",
    module: "reports",
    actions: [
      {
        id: "view-reports",
        name: "View Reports",
        description: "View sales and performance reports",
        endpoint: "GET /reports",
        method: "GET",
      },
      {
        id: "export-reports",
        name: "Export Reports",
        description: "Export reports to CSV/PDF",
        endpoint: "GET /reports/export",
        method: "GET",
      },
    ],
  },
]

const managerFeatures: Feature[] = [
  {
    id: "manager-menu-management",
    name: "Menu Management",
    description: "Manage menu items and categories",
    module: "menu-management",
    actions: [
      {
        id: "view-menu",
        name: "View Menu",
        description: "View all menu items",
        endpoint: "GET /menus",
        method: "GET",
      },
      {
        id: "create-menu-item",
        name: "Create Menu Item",
        description: "Add new menu item",
        endpoint: "POST /menus",
        method: "POST",
      },
      {
        id: "edit-menu-item",
        name: "Edit Menu Item",
        description: "Update menu item details",
        endpoint: "PUT /menus/:id",
        method: "PUT",
      },
      {
        id: "delete-menu-item",
        name: "Delete Menu Item",
        description: "Remove menu item",
        endpoint: "DELETE /menus/:id",
        method: "DELETE",
      },
    ],
  },
  {
    id: "manager-topping-management",
    name: "Topping Management",
    description: "Manage toppings and add-ons",
    module: "topping-management",
    actions: [
      {
        id: "view-toppings",
        name: "View Toppings",
        description: "View all available toppings",
        endpoint: "GET /toppings",
        method: "GET",
      },
      {
        id: "create-topping",
        name: "Create Topping",
        description: "Add new topping",
        endpoint: "POST /toppings",
        method: "POST",
      },
      {
        id: "edit-topping",
        name: "Edit Topping",
        description: "Update topping details",
        endpoint: "PUT /toppings/:id",
        method: "PUT",
      },
      {
        id: "delete-topping",
        name: "Delete Topping",
        description: "Remove topping",
        endpoint: "DELETE /toppings/:id",
        method: "DELETE",
      },
    ],
  },
  {
    id: "manager-table-management",
    name: "Table Management",
    description: "Manage restaurant tables",
    module: "table-management",
    actions: [
      {
        id: "view-tables",
        name: "View Tables",
        description: "View all tables",
        endpoint: "GET /tables",
        method: "GET",
      },
      {
        id: "create-table",
        name: "Create Table",
        description: "Add new table",
        endpoint: "POST /tables",
        method: "POST",
      },
      {
        id: "edit-table",
        name: "Edit Table",
        description: "Update table details",
        endpoint: "PUT /tables/:id",
        method: "PUT",
      },
      {
        id: "delete-table",
        name: "Delete Table",
        description: "Remove table",
        endpoint: "DELETE /tables/:id",
        method: "DELETE",
      },
    ],
  },
  {
    id: "manager-order-management",
    name: "Order Management",
    description: "Manage all orders",
    module: "order-management",
    actions: [
      {
        id: "view-orders",
        name: "View Orders",
        description: "View all orders",
        endpoint: "GET /orders",
        method: "GET",
      },
      {
        id: "create-order",
        name: "Create Order",
        description: "Create new order",
        endpoint: "POST /orders",
        method: "POST",
      },
      {
        id: "edit-order",
        name: "Edit Order",
        description: "Update order details",
        endpoint: "PUT /orders/:id",
        method: "PUT",
      },
      {
        id: "delete-order",
        name: "Delete Order",
        description: "Cancel order",
        endpoint: "DELETE /orders/:id",
        method: "DELETE",
      },
      {
        id: "change-order-status",
        name: "Change Order Status",
        description: "Update order status",
        endpoint: "PATCH /orders/:id/status",
        method: "PATCH",
      },
    ],
  },
  {
    id: "manager-reports",
    name: "Reports & Analytics",
    description: "View sales reports and analytics",
    module: "reports",
    actions: [
      {
        id: "view-reports",
        name: "View Reports",
        description: "View sales and performance reports",
        endpoint: "GET /reports",
        method: "GET",
      },
      {
        id: "export-reports",
        name: "Export Reports",
        description: "Export reports to CSV/PDF",
        endpoint: "GET /reports/export",
        method: "GET",
      },
    ],
  },
]

const employeeFeatures: Feature[] = [
  {
    id: "employee-order-creation",
    name: "Order Creation",
    description: "Create and manage orders",
    module: "order-management",
    actions: [
      {
        id: "view-menu",
        name: "View Menu",
        description: "View available menu items",
        endpoint: "GET /menus",
        method: "GET",
      },
      {
        id: "view-toppings",
        name: "View Toppings",
        description: "View available toppings",
        endpoint: "GET /toppings",
        method: "GET",
      },
      {
        id: "view-tables",
        name: "View Tables",
        description: "View available tables",
        endpoint: "GET /tables",
        method: "GET",
      },
      {
        id: "create-order",
        name: "Create Order",
        description: "Create new order for table",
        endpoint: "POST /orders",
        method: "POST",
      },
      {
        id: "view-orders",
        name: "View Orders",
        description: "View orders created by this employee",
        endpoint: "GET /orders",
        method: "GET",
      },
      {
        id: "send-to-kitchen",
        name: "Send Order to Kitchen",
        description: "Send order to kitchen for preparation",
        endpoint: "PATCH /orders/:id/send-to-kitchen",
        method: "PATCH",
      },
    ],
  },
]

const kitchenFeatures: Feature[] = [
  {
    id: "kitchen-order-management",
    name: "Kitchen Orders",
    description: "View and manage orders in kitchen",
    module: "kitchen",
    actions: [
      {
        id: "view-kitchen-orders",
        name: "View Kitchen Orders",
        description: "View all orders sent to kitchen",
        endpoint: "GET /kitchen/orders",
        method: "GET",
      },
      {
        id: "update-order-status",
        name: "Update Order Status",
        description: "Mark order as preparing, ready, or completed",
        endpoint: "PATCH /kitchen/orders/:id/status",
        method: "PATCH",
      },
    ],
  },
]

export const ROLE_FEATURES_MAP: Record<string, RoleFeatures> = {
  [ROLES.ADMIN]: {
    role: ROLES.ADMIN,
    features: adminFeatures,
  },
  [ROLES.MANAGER]: {
    role: ROLES.MANAGER,
    features: managerFeatures,
  },
  [ROLES.EMPLOYEE]: {
    role: ROLES.EMPLOYEE,
    features: employeeFeatures,
  },
  [ROLES.KITCHEN]: {
    role: ROLES.KITCHEN,
    features: kitchenFeatures,
  },
}

export function getFeaturesByRole(role: string): Feature[] {
  return ROLE_FEATURES_MAP[role]?.features ?? []
}
