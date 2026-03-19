import { createContext, useContext, useState } from "react";
import ModalRaiz from "../components/common/modal/ModalRaiz";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    estaAberto: false,
    tipo: null, // 'confirm' | 'form' | 'details' (Podemos manter os tipos em inglês por serem 'chaves' internas, ou mudar para 'confirmacao' | 'formulario' | 'detalhes')
    titulo: "",
    props: {}, // 'props' mantido por ser jargão do React
    // Configurações comuns a todos os modais
    fecharNoOverlay: true,
    tamanho: "md", // 'sm' | 'md' | 'lg' | 'xl'
  });

  const abrirModal = (tipo, { titulo = "", props = {}, ...configuracoes }) => {
    setModal({
      estaAberto: true,
      tipo,
      titulo,
      props,
      ...configuracoes,
    });
  };

  const fecharModal = () => {
    setModal((prev) => ({ ...prev, estaAberto: false }));
  };

  return (
    <ModalContext.Provider value={{ abrirModal, fecharModal }}>
      {children}
      <ModalRaiz {...modal} onClose={fecharModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
