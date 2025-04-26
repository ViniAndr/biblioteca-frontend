import React, { createContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Decodifica o token JWT

      // Verifica se o token ainda é válido
      const currentTime = Date.now() / 1000; // Tempo atual em segundos
      if (decodedToken.exp < currentTime) {
        // Token expirado, faz logout
        localStorage.removeItem("token");
        setUser(null);
      } else {
        setUser(decodedToken); // Se o token é válido, armazena o usuário decodificado
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    // Decodifica o token recebido após o login e salva no localStorage
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
