"use client";
import React, { useState } from "react";
import { login } from "@/services/authService";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log(data);
      if (typeof window !== "undefined") {
        // Usar sessionStorage o localStorage según tu preferencia
        //localStorage.setItem("token", data.token);

        // O si prefieres usar sessionStorage (se borra al cerrar el navegador)
        sessionStorage.setItem("token", data.token);
      }

      // Limpiar cualquier estado de error
      setError("");

      // Redirigir a la página principal
      router.push("/");
     
      // alert("Login successful!");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background text-foreground">
      <div className="card max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondary-text mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded bg-background text-foreground border-border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-secondary-text mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded bg-background text-foreground border-border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button type="submit" className="w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
