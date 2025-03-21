import { RouterProvider } from "react-router-dom";
import router from "./RouterProvider";

import { AuthProvider } from "./contexts/AuthContext";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
