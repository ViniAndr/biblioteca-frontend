import { createContext, useContext, useState } from "react";

import ModalRoot from "../components/common/modal/ModalRoot";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null, // 'confirm' | 'form' | 'details'
    title: "",
    props: {},
    // Configurações comuns a todos os modais
    overlayClose: true,
    size: "md", // 'sm' | 'md' | 'lg' | 'xl'
  });

  const openModal = (type, { title = "", props = {}, ...config }) => {
    setModal({
      isOpen: true,
      type,
      title,
      props,
      ...config,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalRoot {...modal} onClose={closeModal} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
