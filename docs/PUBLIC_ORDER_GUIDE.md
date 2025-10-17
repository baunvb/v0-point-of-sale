# Public Order System Guide

## Overview

The Public Order System allows customers to place orders directly from their tables without needing to log in. This system is designed to be simple, intuitive, and fast.

## Features

### 1. Table Selection
- Customers can select their table number from a grid (1-12)
- Or manually enter a custom table number
- Selected table is displayed and saved in browser storage

### 2. Menu Browsing
- Browse all menu items organized by categories
- View item names, descriptions, and prices
- Filter by category (Burgers, Salads, Pizza, Beverages, Desserts, etc.)

### 3. Order Management
- Add items to cart with quantity control
- Add special notes/requests for each item
- Add toppings to items (if available)
- Remove items from cart
- View real-time total amount

### 4. Order Submission
- Submit order to kitchen with one click
- Order is saved with table number and timestamp
- Cart is cleared after successful submission
- Confirmation message displayed

### 5. Payment
- Payment feature coming soon
- Will support multiple payment methods

## User Flow

1. **Landing Page** → Customer clicks "Start Ordering"
2. **Table Selection** → Customer selects their table number
3. **Menu Browsing** → Customer browses menu items by category
4. **Add to Cart** → Customer adds items with quantity and notes
5. **Review Order** → Customer reviews cart with total amount
6. **Submit Order** → Order is sent to kitchen
7. **Continue Ordering** → Customer can add more items to the same table
8. **Payment** → Customer pays when ready

## API Endpoints

### Get Public Menu
\`\`\`
GET /api/menus/public
Response: { data: PublicMenuItem[] }
\`\`\`

### Create Public Order
\`\`\`
POST /api/orders/public
Body: {
  tableNumber: number,
  items: [{
    menuItemId: string,
    quantity: number,
    toppings: Topping[],
    notes: string
  }],
  totalAmount: number
}
Response: { data: PublicOrder }
\`\`\`

### Update Public Order Status
\`\`\`
PUT /api/orders/public/:id
Body: { status: string }
Response: { data: PublicOrder }
\`\`\`

### Get Public Orders for Kitchen
\`\`\`
GET /api/kitchen/orders/public
Response: { data: PublicOrder[] }
\`\`\`

## Data Persistence

- Cart data is saved to browser localStorage
- If customer refreshes page, cart is restored
- Cart is cleared after successful order submission
- Multiple orders can be placed for the same table

## Kitchen Display Integration

- Public orders appear in Kitchen Display System
- Kitchen staff can see:
  - Table number
  - Order items with quantities
  - Special notes and toppings
  - Order status (pending, preparing, ready)
  - Time elapsed since order creation
- Kitchen staff can mark orders as ready
- Orders are displayed in real-time with 3-second refresh

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] QR code table identification
- [ ] Order history and favorites
- [ ] Dietary restrictions and allergies
- [ ] Real-time order status updates via WebSocket
- [ ] Multi-language support
- [ ] Mobile app version
