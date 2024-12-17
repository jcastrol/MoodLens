import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
  // NOTA: Este método NO es 100% confiable porque el middleware se ejecuta en el servidor
  const token = req.cookies.get("token")?.value || 
                req.headers.get("x-token") || 
                ''; // Añadir algún método para obtener el token del cliente

  const { pathname } = req.nextUrl;

  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};