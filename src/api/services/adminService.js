import { api } from "../api.js";
import { handleApiError } from "../../utils/handleApiError.js";

class adminService {
  async getAdminCode(id) {
    try {
      const response = await api.get(`/admin/register/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Erro ao identificar admin.");
    }
  }

  async createNewManager(body, id) {
    try {
      const response = await api.post(`/admin/register/${id}`, body, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      handleApiError(error, "Erro ao cadastrar novo admin.");
    }
  }

  async getAllComments(status = true) {
    try {
      const { data } = await api.get(`/admin/comment`);
      const rawData = data.data;
      const allComments = rawData.flatMap((user) =>
        user.comments.map((comment) => ({
          id: comment._id,
          userId: user._id,
          profileImage: user.profileImage,
          name: user.name,
          email: user.email,
          title: comment.title,
          body: comment.body,
          rating: comment.rating,
          status: comment.status,
          type: comment.type,
          count: comment.count,
          createdAt: new Date(comment.createdAt),
        }))
      );

      const filteredComments = allComments.filter(
        (comment) => status === true || comment.status === status
      );

      const sortedComments = filteredComments.sort(
        (a, b) => b.createdAt - a.createdAt
      );

      const count = {
        all: allComments.length,
        aprovado: allComments.filter((c) => c.status === "Aprovado").length,
        pendente: allComments.filter((c) => c.status === "Pendente").length,
        rejeitado: allComments.filter((c) => c.status === "Rejeitado").length,
      };

      return {
        comments: sortedComments,
        count,
      };
    } catch (error) {
      handleApiError(error, "Erro na listagem dos comentérios");
    }
  }

  async setCommentStatus(IDs, status) {
    const { userId, commentId } = IDs;
    try {
      const response = await api.put(
        `/admin/user/${userId}/comment/${commentId}/status`,
        status,
        {
          headers: {
            "X-Client-Agent": navigator.userAgent,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Erro de comunicação com a API.");
    }
  }

  async deleteUserComment(params) {
    const { userID, commentID } = params;
    try {
      const response = await api.delete(
        `/admin/user/${userID}/comment/${commentID}`,
        {
          headers: {
            "X-Client-Agent": navigator.userAgent,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Falha ao deletar usuário.");
    }
  }

  async getAllManagers() {
    try {
      const response = await api.get(`/admins`, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Falha na listagem de administradores");
    }
  }

  async getOneAdmin(id) {
    try {
      const { data } = await api.get(`/admin/${id}`, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      handleApiError(error, "Falha na listagem de administradores");
    }
  }

  async deleteManager(id) {
    try {
      const response = await api.delete(`/admin/${id}`, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      handleApiError(error, "Falha ao deletar administrador.")
    }
  }
}

export default new adminService();
