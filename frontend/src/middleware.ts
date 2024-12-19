import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log({token})
  const { pathname } = req.nextUrl;

  // Redirigir a login si no hay token y se intenta acceder a una ruta protegida
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirigir a la página principal si ya hay un token y se accede a /login o /register
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};