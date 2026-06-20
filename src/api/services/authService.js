import { api } from "../api.js";
import { handleApiError } from "../../utils/handleApiError.js";

class authService {
  async create(body) {
    try {
      const { data } = await api.post("/user", body, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
      });
      return data.data;
    } catch (error) {
      throw handleApiError(error, "Erro ao criar usuário.");
    }
  }

  async login(body) {
    try {
      const { data } = await api.post(`/login`, body, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });
      if (data.message) {
        return data;
      } else {
        return data.data;
      }
    } catch (err) {
      throw handleApiError(err, "Erro ao autenticar usuário.");
    }
  }

  async refresh() {
    try {
      const { data } = await api.put(`/refresh`, {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      throw handleApiError(error, "Erro ao atualizar acesso.");
    }
  }

  async logout() {
    try {
      const response = await api.delete(`/logout`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error, "Falha ao realizar logout.");
    }
  }

  async validateRecoveryCode(body) {
    try {
      const { data } = await api.post(`/recover-mail/valid`, body, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      throw handleApiError(error, "Erro ao conferir código.");
    }
  }

  async userLogin(id) {
    try {
      const response = await api.post(`/user/login/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Falha ao realizar login.");
    }
  }

  async managerLogin(id, code) {
    try {
      const response = await api.post(`/admin/login/${id}`, code, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Falha ao realizar login.");
    }
  }
}

export default new authService();
