import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  setAccessTokenGetter,
  setRefreshAuthFunction,
} from "../api/interceptors/authInterceptor";
import authService from "../api/services/authService";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const handleAuthSuccess = (tokens, setAuth) => {
  if (tokens.acessToken) {
    const userInfo = jwtDecode(tokens.acessToken);
    setAuth({
      acessToken: tokens.acessToken,
      user: {
        id: userInfo.id,
        email: userInfo.email,
        role: userInfo.role,
      },
    });
    return tokens.acessToken;
  }
  return null;
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null); // { acessToken, user }

  const create = async (credentials) => {
    try {
      const tokens = await authService.create(credentials);
      return handleAuthSuccess(tokens.acessCredentials, setAuth);
    } catch (error) {
      toast.error("Confira suas credenciais.");
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const tokens = await authService.login(credentials);
      if (tokens.message) {
        return tokens;
      } else {
        return handleAuthSuccess(tokens, setAuth);
      }
    } catch (error) {
      toast.error("Credenciais inválidas");
      throw error;
    }
  };

  const loginManager = async (id, code) => {
    try {
      const tokens = await authService.managerLogin(id, code);
      return handleAuthSuccess(tokens.data, setAuth);
    } catch (error) {
      toast.error("Credenciais inválidas");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      toast.success("Sessão terminada com sucesso!");
    } catch (error) {
      console.error(
        "Falha ao invalidar token no backend durante o logout:",
        error
      );
    }
    setAuth(null);
  };

  const validateCode = async (code) => {
    try {
      const token = await authService.validateRecoveryCode(code);
      return handleAuthSuccess(token, setAuth);
    } catch (error) {
      console.log(error.message);
      setAuth(null);
    }
  };

  const refresh = useCallback(async () => {
    try {
      const tokens = await authService.refresh();
      return handleAuthSuccess(tokens, setAuth);
    } catch (error) {
      console.error("Token refresh falhou:", error);
      setAuth(null); // Desloga se o refresh falhar
      throw error;
    }
  }, [setAuth]);

  useEffect(() => {
    setAccessTokenGetter(() => auth?.acessToken || null);
    setRefreshAuthFunction(refresh);
  }, [auth, refresh]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        refresh,
        create,
        validateCode,
        loginManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

