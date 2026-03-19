import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AutenticacaoContext = createContext();

export const AutenticacaoProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenDecodificado = jwtDecode(token); // Decodifica o token JWT

      // Verifica se o token ainda é válido
      const tempoAtual = Date.now() / 1000; // Tempo atual em segundos
      if (tokenDecodificado.exp < tempoAtual) {
        // Token expirado, faz logout
        localStorage.removeItem("token");
        setUsuario(null);
      } else {
        setUsuario(tokenDecodificado); // Se o token é válido, armazena o usuário decodificado
      }
    }
    setCarregando(false);
  }, []);

  // Mantemos 'login' e 'logout' pois são jargões universais no Brasil
  const login = (token) => {
    // Decodifica o token recebido após o login e salva no localStorage
    const tokenDecodificado = jwtDecode(token);
    setUsuario(tokenDecodificado);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
  };

  return (
    <AutenticacaoContext.Provider value={{ autenticado: !!usuario, usuario, login, logout, carregando }}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export const useAutenticacao = () => React.useContext(AutenticacaoContext);