// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

//const NEST_API_URL = process.env.NEXT_PUBLIC_NEST_API_URL;
const NEST_API_URL = "http://localhost:3002/upload";

// Define los métodos permitidos
export const OPTIONS = () => {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// app/api/upload/route.ts

export async function POST(request: NextRequest) {
  console.log("API Upload: Inicio de la solicitud");

  try {
    // Verificar Content-Type
    const contentType = request.headers.get("content-type");

    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Must be multipart/form-data" },
        { status: 400 }
      );
    }

    // Verificación de la URL de Nest API
    if (!NEST_API_URL) {
      return NextResponse.json(
        { error: "NEST API URL is not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convertir File a Blob para asegurar compatibilidad
    const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });

    // Crear nuevo FormData para enviar al backend de Nest
    const nestFormData = new FormData();
    nestFormData.append("file", fileBlob, file.name);

    // Hacer la solicitud al backend de Nest
    const response = await fetch(NEST_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWT_TOKEN || ""}`,
      },
      body: nestFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error en la respuesta de Nest API:", data);
      return NextResponse.json(
        { error: data.message || "Error uploading file" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error completo en la carga:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
