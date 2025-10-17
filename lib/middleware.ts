import { type NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/login"]
const roleRoutes: Record<string, string[]> = {
  admin: ["/admin", "/dashboard"],
  manager: ["/manager", "/dashboard"],
  employee: ["/employee", "/dashboard"],
  kitchen: ["/kitchen"],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Require authentication for protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
