import { RouterProvider } from "react-router-dom";
import router from "./RouterProvider";

import { AutenticacaoProvider } from "./contexts/AutenticacaoContext";
import { AlertaProvider } from "./contexts/AlertaContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <AlertaProvider>
      <AutenticacaoProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AutenticacaoProvider>
    </AlertaProvider>
  );
}

export default App;
