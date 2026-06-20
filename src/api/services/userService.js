import api from "../axiosInstance";
import { handleApiError } from "../../utils/handleApiError";

class userService {
  async getAll() {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Error ao buscar usuários.");
    }
  }

  async getById(id) {
    try {
      const { data } = await api.get(`/user/${id}`, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      throw handleApiError(error, "Erro ao buscar usuário.");
    }
  }

  async update(id, data) {
    try {
      const response = await api.put(`/user/${id}`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Erro ao editar usuário.");
    }
  }

  async delete(id) {
    try {
      const response = await api.delete(`/user/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Error ao deletar usuário.");
    }
  }

  async createComment(body, id) {
    try {
      const { data } = await api.post(`/user/comment/${id}`, body);
      return data.data;
    } catch (error) {
      throw handleApiError(error, "Falha ao criar comentário.");
    }
  }

  async deleteComment(userId, commentId) {
    try {
      const response = await api.delete(`/user/${userId}/comment/${commentId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Erro ao deletar comentário.");
    }
  }

  async resetPassword(id, body) {
    try {
      const response = await api.put(`/reset-password/${id}`, body);
      return response.data;
    } catch (error) {
      throw handleApiError(error, "Falha ao criar nova senha.");
    }
  }

  async getMetrics() {
    try {
      const { data } = await api.get("/metrics");
      return data.data;
    } catch (error) {
      handleApiError(error, "Erro ao listar estatísticas.");
    }
  }

  async getEvaluationComments() {
    try {
      const { data } = await api.get("/comment/evaluation");
      return data.data;
    } catch (error) {
      handleApiError(error, "Falha ao listar comentários.");
    }
  }
}

export default new userService();
