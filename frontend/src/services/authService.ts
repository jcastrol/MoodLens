const API_URL = "http://localhost:3002/auth";

export const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  export const logout = () => {
    // Eliminar el token de sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
    }
    // Redirigir al login
    window.location.href = '/login';
  };
  
  // Función para verificar si el usuario está autenticado
  export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('token');
    }
    return false;
  };

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};