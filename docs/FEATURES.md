# Point of Sale System - Features & Roles Definition

## Overview
This document defines the features and permissions for each role in the Point of Sale system.

## Roles

### 1. Admin
**Description**: Full system access with ability to manage all aspects of the POS system.

**Key Responsibilities**:
- Create and manage Admin and Manager accounts
- Manage all system configurations
- Oversee all operations

**Features**:
- ✅ User Management (Create Admin/Manager, Edit, Delete, Reset Password)
- ✅ Menu Management (Create, Edit, Delete menu items)
- ✅ Topping Management (Create, Edit, Delete toppings)
- ✅ Table Management (Create, Edit, Delete tables)
- ✅ Order Management (View, Create, Edit, Delete, Change Status)
- ✅ Reports & Analytics (View and Export)

**API Endpoints**:
- `POST /auth/login` - Login
- `POST /users` - Create user (Admin/Manager)
- `GET /users` - Get all users
- `GET /users/managers` - Get all managers
- `GET /users/employees` - Get all employees
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `POST /users/admin-change-password` - Change user password
- `GET /menus` - Get all menu items
- `POST /menus` - Create menu item
- `PUT /menus/:id` - Update menu item
- `DELETE /menus/:id` - Delete menu item
- `GET /toppings` - Get all toppings
- `POST /toppings` - Create topping
- `PUT /toppings/:id` - Update topping
- `DELETE /toppings/:id` - Delete topping
- `GET /tables` - Get all tables
- `POST /tables` - Create table
- `PUT /tables/:id` - Update table
- `DELETE /tables/:id` - Delete table
- `GET /orders` - Get all orders
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order
- `PATCH /orders/:id/status` - Change order status
- `GET /reports` - Get reports
- `GET /reports/export` - Export reports

---

### 2. Manager
**Description**: Operational management with ability to manage menu, tables, and orders. Cannot create/delete user accounts.

**Key Responsibilities**:
- Manage daily operations
- Oversee menu and table configurations
- Monitor and manage orders
- View business reports

**Features**:
- ✅ Menu Management (Create, Edit, Delete menu items)
- ✅ Topping Management (Create, Edit, Delete toppings)
- ✅ Table Management (Create, Edit, Delete tables)
- ✅ Order Management (View, Create, Edit, Delete, Change Status)
- ✅ Reports & Analytics (View and Export)
- ❌ User Management (Cannot create/delete users)

**API Endpoints**:
- `POST /auth/login` - Login
- `GET /menus` - Get all menu items
- `POST /menus` - Create menu item
- `PUT /menus/:id` - Update menu item
- `DELETE /menus/:id` - Delete menu item
- `GET /toppings` - Get all toppings
- `POST /toppings` - Create topping
- `PUT /toppings/:id` - Update topping
- `DELETE /toppings/:id` - Delete topping
- `GET /tables` - Get all tables
- `POST /tables` - Create table
- `PUT /tables/:id` - Update table
- `DELETE /tables/:id` - Delete table
- `GET /orders` - Get all orders
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order
- `PATCH /orders/:id/status` - Change order status
- `GET /reports` - Get reports
- `GET /reports/export` - Export reports

---

### 3. Employee
**Description**: Limited access focused on order creation and management.

**Key Responsibilities**:
- Create orders for customers
- Send orders to kitchen
- View menu and available tables
- View their own orders

**Features**:
- ✅ Order Creation (Create orders, View menu, View tables, View toppings)
- ✅ Send to Kitchen (Send orders for preparation)
- ✅ View Orders (View orders created by this employee)
- ❌ Menu Management
- ❌ Table Management
- ❌ Reports
- ❌ User Management

**API Endpoints**:
- `POST /auth/login` - Login
- `GET /menus` - Get menu items
- `GET /toppings` - Get toppings
- `GET /tables` - Get tables
- `POST /orders` - Create order
- `GET /orders` - Get orders
- `PATCH /orders/:id/send-to-kitchen` - Send order to kitchen
- `POST /users/change-password` - Change own password

---

### 4. Kitchen Staff
**Description**: Specialized role for kitchen operations. Can only view and update order status.

**Key Responsibilities**:
- View orders sent from front-of-house
- Update order preparation status
- Mark orders as ready for delivery

**Features**:
- ✅ View Kitchen Orders (View all orders sent to kitchen)
- ✅ Update Order Status (Mark as preparing, ready, completed)
- ❌ Create Orders
- ❌ Menu Management
- ❌ User Management
- ❌ Reports

**API Endpoints**:
- `POST /auth/login` - Login
- `GET /kitchen/orders` - Get kitchen orders
- `PATCH /kitchen/orders/:id/status` - Update order status
- `POST /users/change-password` - Change own password

---

## Permission Matrix

| Feature | Admin | Manager | Employee | Kitchen |
|---------|-------|---------|----------|---------|
| **User Management** | ✅ | ❌ | ❌ | ❌ |
| **Menu Management** | ✅ | ✅ | ❌ | ❌ |
| **Topping Management** | ✅ | ✅ | ❌ | ❌ |
| **Table Management** | ✅ | ✅ | ❌ | ❌ |
| **Order Creation** | ✅ | ✅ | ✅ | ❌ |
| **Order Management** | ✅ | ✅ | ✅ | ❌ |
| **Send to Kitchen** | ✅ | ✅ | ✅ | ❌ |
| **Kitchen Orders** | ✅ | ✅ | ❌ | ✅ |
| **Update Order Status** | ✅ | ✅ | ❌ | ✅ |
| **Reports** | ✅ | ✅ | ❌ | ❌ |

---

## Order Status Flow

\`\`\`
Created (Employee) 
  ↓
Sent to Kitchen (Employee)
  ↓
Preparing (Kitchen Staff)
  ↓
Ready (Kitchen Staff)
  ↓
Completed (Kitchen Staff)
\`\`\`

---

## Implementation Notes

1. **Authentication**: All endpoints require authentication via JWT token
2. **Authorization**: Each endpoint should validate user role and permissions
3. **Audit Trail**: All user actions should be logged for compliance
4. **Data Isolation**: Employees can only view their own orders
5. **Real-time Updates**: Kitchen display should update in real-time when orders are sent
