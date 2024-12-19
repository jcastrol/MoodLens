import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Llamar al servicio de autenticación de tu backend
    const response = await fetch("http://localhost:3002/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
   // console.log(response)
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const {accessToken:token}= await response.json();
    
    // Crear una respuesta y establecer una cookie segura con el token
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 día
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}