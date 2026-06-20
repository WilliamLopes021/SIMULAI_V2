import { api } from "../api.js";
import { handleApiError } from "../../utils/handleApiError.js";

class mailService {
  async recoveryMail(body) {
    const response = await api.post(`/recover-mail`, body, {
      headers: {
        "X-Client-Agent": navigator.userAgent,
      },
      withCredentials: true,
    });
    return response.data;
  }
  async contact(body) {
    try {
      const { data } = await api.post(`/contact`, body);
      return data.data;
    } catch (error) {
      handleApiError(error, "Erro ao enviar e-mail.");
    }
  }
  async inviteManager(email) {
    try {
      const { data } = await api.post("/admin/invite", email, {
        headers: {
          "X-Client-Agent": navigator.userAgent,
        },
        withCredentials: true,
      });

      console.log(email, data);
      return data.data;
    } catch (error) {}
  }
}

export default new mailService();
