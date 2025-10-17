# Deployment Guide

## Prerequisites

- Node.js 18+ and npm/pnpm
- Backend API server running
- Socket.io server running

## Environment Setup

Create a `.env.local` file with:

\`\`\`
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOCKET_URL=https://yourdomain.com
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Traditional Server

\`\`\`bash
npm run build
npm start
\`\`\`

## Production Checklist

- [ ] API URL configured correctly
- [ ] Socket.io URL configured correctly
- [ ] HTTPS enabled
- [ ] CORS configured on backend
- [ ] JWT secret configured
- [ ] Database backups enabled
- [ ] Error logging configured
- [ ] Performance monitoring enabled

## Troubleshooting

### Socket.io Connection Issues

- Verify Socket.io server is running
- Check CORS settings on backend
- Verify token is being sent correctly
- Check browser console for errors

### API Request Failures

- Verify API URL is correct
- Check network tab in browser DevTools
- Verify authentication token is valid
- Check backend logs for errors

### Performance Issues

- Enable caching headers
- Optimize images
- Use CDN for static assets
- Monitor database query performance
