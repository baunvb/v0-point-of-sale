// API route definitions based on the OpenAPI specification
export const API_ROUTES = {
  // Auth
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },

  // Users
  users: {
    getAll: "/users",
    create: "/users",
    getById: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    changePassword: (id: string) => `/users/${id}/change-password`,
    resetPassword: (id: string) => `/users/${id}/reset-password`,
  },

  // Managers
  managers: {
    getAll: "/managers",
    create: "/managers",
    getById: (id: string) => `/managers/${id}`,
    update: (id: string) => `/managers/${id}`,
    delete: (id: string) => `/managers/${id}`,
  },

  // Employees
  employees: {
    getAll: "/employees",
    create: "/employees",
    getById: (id: string) => `/employees/${id}`,
    update: (id: string) => `/employees/${id}`,
    delete: (id: string) => `/employees/${id}`,
  },

  // Menus
  menus: {
    getAll: "/menus",
    create: "/menus",
    getById: (id: string) => `/menus/${id}`,
    update: (id: string) => `/menus/${id}`,
    delete: (id: string) => `/menus/${id}`,
    getPublic: "/menus/public",
  },

  // Orders
  orders: {
    getAll: "/orders",
    create: "/orders",
    getById: (id: string) => `/orders/${id}`,
    update: (id: string) => `/orders/${id}`,
    delete: (id: string) => `/orders/${id}`,
    changeStatus: (id: string) => `/orders/${id}/status`,
    createPublic: "/orders/public",
    updatePublic: (id: string) => `/orders/public/${id}`,
  },

  // Tables
  tables: {
    getAll: "/tables",
    create: "/tables",
    getById: (id: string) => `/tables/${id}`,
    update: (id: string) => `/tables/${id}`,
    delete: (id: string) => `/tables/${id}`,
  },

  // Toppings
  toppings: {
    getAll: "/toppings",
    create: "/toppings",
    getById: (id: string) => `/toppings/${id}`,
    update: (id: string) => `/toppings/${id}`,
    delete: (id: string) => `/toppings/${id}`,
  },

  // Reports
  reports: {
    getAll: "/reports",
    getById: (id: string) => `/reports/${id}`,
  },

  // Kitchen
  kitchen: {
    getOrders: "/kitchen/orders",
    getPublicOrders: "/kitchen/orders/public",
  },
}
