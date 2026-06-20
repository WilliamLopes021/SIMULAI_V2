import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Download from "../pages/user/Download";
import Feedback from "../pages/user/Feedback";
import Contact from "../pages/user/Contact";
import Help from "../pages/user/Help";
import Progress from "../pages/user/Progress";
import ManagerRegister from "../pages/admin/ManagerRegister";

export const userRoutes = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/sobre",
    Component: About,
  },
  {
    path: "/download",
    Component: Download,
  },

  {
    path: "/feedback",
    Component: Feedback,
  },
  {
    path: "/contatos",
    Component: Contact,
  },
  {
    path: "/ajuda",
    Component: Help,
  },
  {
    path: "/meu-progresso",
    Component: Progress,
  },
  {
    path: `/admin/register/:uniqueid`,
    Component: ManagerRegister,
  },
];
