import { useState, useEffect } from "react";
import apiPromise from "./api/api"; // Importa a Promise exportada pelo setupApi()
import AppRoutes from "./routes"; // Seu componente principal de rotas
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { Toaster } from "react-hot-toast";

function AppInitializer() {
  const [error, setError] = useState(null);

  useEffect(() => {
    apiPromise.catch((err) => {
      setError("Falha crítica ao iniciar a aplicação.");
      console.error("Erro de inicialização da API:", err);
    });
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <LoadingProvider>
      <LoadingSpinner />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
    </LoadingProvider>
  );
}

export default AppInitializer;
