import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import RecoverPassword from "../pages/user/RecoverPassword";

export const authRoutes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/cadastro",
    Component: Register,
  },
  {
    path: "/recuperar",
    Component: RecoverPassword,
  },
];
