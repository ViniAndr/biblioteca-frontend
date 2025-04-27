import { RouterProvider } from "react-router-dom";
import router from "./RouterProvider";

import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
