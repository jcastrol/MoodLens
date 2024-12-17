import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  console.log(token)
  // Si el usuario intenta acceder a la ruta principal '/' sin token, redirigir a '/login'
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si el usuario está autenticado y trata de ir a '/login', redirigir a '/'
  if ((pathname === "/login" || pathname === "/register" )&& token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();

  // // Verificar si la ruta es una ruta protegida
  // if (protectedRoutes.some((route) => pathname.startsWith(route))) {
  //   // Si no hay token, redirigir al login
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  // // Continuar con la solicitud si el token existe o la ruta no es protegida
  // return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};