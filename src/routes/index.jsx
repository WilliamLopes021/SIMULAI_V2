import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";
import NotFound from "../pages/advices/NotFound";
import NotAllowed from "../pages/advices/NotAllowed";

export default function AppRoutes() {
  const { auth } = useAuth();
  const isAdmin = auth && ["Boss", "Manager"].includes(auth.user.role);

  const router = createBrowserRouter([
    ...authRoutes,
    ...(isAdmin ? adminRoutes : userRoutes),
    { path: "*", element: <NotFound /> },
    { path: "/not-allowed", element: <NotAllowed /> },
  ]);

  return <RouterProvider router={router} />;
}
