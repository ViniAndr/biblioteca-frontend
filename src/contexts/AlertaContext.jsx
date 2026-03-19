import { createContext, useContext, useState, useCallback } from "react";
import Alerta from "../components/common/Alerta";

// Cria o contexto
const AlertaContext = createContext();

export const AlertaProvider = ({ children }) => {
  const [alerta, setAlerta] = useState(null);

  // Função para mostrar o alerta
  const mostrarAlerta = useCallback((mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
  }, []);

  // Função para fechar o alerta
  const fecharAlerta = () => {
    setAlerta(null);
  };

  return (
    <AlertaContext.Provider value={{ mostrarAlerta }}>
      {children}
      {alerta && <Alerta mensagem={alerta.mensagem} tipo={alerta.tipo} aoFechar={fecharAlerta} />}
    </AlertaContext.Provider>
  );
};

// Hook para usar o contexto do alerta
export const useAlerta = () => useContext(AlertaContext);
