import UserManagement from '../pages/admin/UserManagement';
import CommentsManagement from '../pages/admin/CommentsManagement';
import AiTraining from '../pages/admin/AiTraining';
import AdminManagement from '../pages/admin/AdminManagement';
import ManagerRegister from '../pages/admin/ManagerRegister';

export const adminRoutes = [
  {
    path: "/",
    Component: UserManagement
  },
  {
    path: '/usuarios',
    Component: UserManagement
  },
  {
    path: '/comentarios',
    Component: CommentsManagement
  },
  {
    path: '/AI',
    Component: AiTraining
  },
  {
    path: '/Gerenciamento-de-gestores',
    Component: AdminManagement
  },
  {
    path: '/admin/register/:uniqueid',
    Component: ManagerRegister
  },
]