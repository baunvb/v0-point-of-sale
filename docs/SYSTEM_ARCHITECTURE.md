# System Architecture

## Overview

RestaurantPOS is a full-stack Next.js application with role-based access control, real-time order management, and kitchen display system.

## Technology Stack

- **Frontend**: Next.js 14+ with React
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: JWT-based
- **Real-time**: Socket.io (planned)
- **Database**: API-based (mock data for development)

## Project Structure

\`\`\`
├── app/
│   ├── api/                    # API routes
│   │   ├── menus/
│   │   ├── orders/
│   │   ├── kitchen/
│   │   └── mock-data.ts
│   ├── admin/                  # Admin dashboard
│   ├── manager/                # Manager dashboard
│   ├── employee/               # Employee dashboard
│   ├── kitchen/                # Kitchen display
│   ├── order/                  # Public order page
│   ├── login/                  # Login page
│   ├── layout.tsx
│   ├── page.tsx                # Landing page
│   └── globals.css
├── components/
│   ├── layouts/                # Layout components
│   ├── admin/                  # Admin components
│   ├── manager/                # Manager components
│   ├── employee/               # Employee components
│   ├── kitchen/                # Kitchen components
│   ├── public/                 # Public order components
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── types/                  # TypeScript types
│   ├── api-client.ts           # API client
│   ├── api-routes.ts           # API route definitions
│   ├── auth-context.tsx        # Auth context
│   └── socket-client.ts        # Socket.io client
├── hooks/                      # Custom React hooks
├── docs/                       # Documentation
└── public/                     # Static assets
\`\`\`

## Authentication Flow

1. User enters email and password on login page
2. Frontend sends credentials to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token included in all authenticated API requests
6. Middleware validates token and redirects if invalid

## Role-Based Access Control

### Admin
- Create/manage admin and manager accounts
- View all system data
- Access all features

### Manager
- View reports and analytics
- Manage menu items
- Manage tables
- View all orders
- Cannot create admin/manager accounts

### Employee
- Create orders
- Submit orders to kitchen
- Cannot access reports or management features

### Kitchen
- View real-time orders
- Update order status
- Cannot create orders or manage menu

## API Architecture

### Public Endpoints (No Auth Required)
- `GET /api/menus/public` - Get menu items
- `POST /api/orders/public` - Create public order
- `GET /api/kitchen/orders/public` - Get public orders for kitchen

### Protected Endpoints (Auth Required)
- `POST /api/auth/login` - User login
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order
- And more...

## Data Flow

### Order Creation Flow
1. Customer selects table and items
2. Frontend sends order to `/api/orders/public`
3. Backend creates order and stores in database
4. Kitchen Display System fetches updated orders
5. Kitchen staff sees new order in real-time

### Order Status Update Flow
1. Kitchen staff marks order as ready
2. Frontend sends status update to `/api/orders/public/:id`
3. Backend updates order status
4. Kitchen Display System refreshes and shows updated status
5. (Future) Socket.io emits event to all connected clients

## Real-Time Updates (Planned)

- Socket.io integration for instant order updates
- No need for polling/refresh
- Real-time notifications for new orders
- Live status synchronization across all displays

## Security Considerations

1. **JWT Authentication** - Secure token-based auth
2. **Role-Based Access** - Different permissions per role
3. **Input Validation** - Validate all user inputs
4. **CORS** - Configure CORS for API security
5. **HTTPS** - Use HTTPS in production
6. **Environment Variables** - Store secrets in env vars

## Deployment

### Development
\`\`\`bash
npm install
npm run dev
\`\`\`

### Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Environment Variables
\`\`\`
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SOCKET_URL=https://socket.example.com
\`\`\`

## Future Enhancements

- [ ] WebSocket/Socket.io for real-time updates
- [ ] Payment gateway integration
- [ ] Advanced analytics and reporting
- [ ] Multi-restaurant support
- [ ] Mobile app
- [ ] QR code table identification
- [ ] Inventory management
- [ ] Staff scheduling
