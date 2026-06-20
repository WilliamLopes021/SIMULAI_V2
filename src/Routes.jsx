import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import NotFound from "./pages/advices/NotFound";
import NotAllowed from "./pages/advices/NotAllowed";

export default function AppRoutes() {
  const { auth } = useAuth();
  const isAdmin = auth && ["Boss", "Manager"].includes(auth.user.role);

  const router = createBrowserRouter([
    ...authRoutes,
    ...userRoutes,
    ...(isAdmin ? adminRoutes : []),
    { path: "*", element: <NotFound /> },
    { path: "/not-allowed", element: <NotAllowed /> },
  ]);

  return <RouterProvider router={router} />;
}
