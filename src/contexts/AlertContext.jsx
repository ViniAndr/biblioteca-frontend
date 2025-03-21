import { createContext, useContext, useState, useCallback } from "react";
import Alert from "../components/common/Alert";

// Cria o contexto
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  // Função para mostrar o alerta
  const showAlert = useCallback((message, type) => {
    setAlert({ message, type });
  }, []);

  // Função para fechar o alerta
  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
    </AlertContext.Provider>
  );
};

// Hook para usar o contexto do alerta
export const useAlert = () => useContext(AlertContext);
