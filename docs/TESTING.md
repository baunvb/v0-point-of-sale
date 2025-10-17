# Testing Guide

## Manual Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials shows error
- [ ] Logout clears session
- [ ] Protected routes redirect to login when not authenticated

### Admin Dashboard
- [ ] View admin dashboard
- [ ] Create new admin account
- [ ] Create new manager account
- [ ] View list of accounts
- [ ] Delete account

### Manager Dashboard
- [ ] View manager dashboard with stats
- [ ] Add menu item
- [ ] View menu items list
- [ ] Delete menu item
- [ ] View tables
- [ ] View orders
- [ ] View reports

### Employee Dashboard
- [ ] Select table
- [ ] Browse menu by category
- [ ] Add items to cart
- [ ] Update item quantity
- [ ] Add notes to items
- [ ] Submit order
- [ ] Order appears in kitchen display

### Kitchen Display
- [ ] View pending orders
- [ ] Filter orders by status
- [ ] Mark order as ready
- [ ] Order status updates in real-time

### Real-time Updates
- [ ] Create order in employee dashboard
- [ ] Order appears immediately in kitchen display
- [ ] Update order status in kitchen
- [ ] Status updates in manager dashboard

## API Testing

Use tools like Postman or curl to test API endpoints:

\`\`\`bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# Get menu items
curl -X GET http://localhost:3001/api/menus \
  -H "Authorization: Bearer <token>"

# Create order
curl -X POST http://localhost:3001/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"tableId":"1","items":[...],"totalAmount":50.00}'
\`\`\`

## Performance Testing

Monitor:
- Page load times
- API response times
- Socket.io connection latency
- Memory usage
- CPU usage

Use browser DevTools Performance tab for profiling.
