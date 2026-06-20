import { useState, useEffect } from "react";
import userService from "../api/services/userService.js";
import adminService from "../api/services/adminService.js";

export const useUserData = (auth, isAdmin) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth) return;

      try {
        let data;
        if (isAdmin) {
          data = await adminService.getOneAdmin(auth.user.id);
        } else {
          data = await userService.getById(auth.user.id);
        }

        if (data) {
          setUserInfo({
            nome: data.name,
            email: data.email,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [auth, isAdmin]);

  return { userInfo };
};
