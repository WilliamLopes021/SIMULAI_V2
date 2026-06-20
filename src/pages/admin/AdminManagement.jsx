import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import clsx from "clsx";
import adminService from "../../api/services/adminService";
import globalcss from "../../css/global.module.css";
import styles from "../../css/admin.module.css";
import toast from "react-hot-toast";
import SearchBox from "../../components/SearchBox/SearchBox";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import SendInviteModal from "../../components/Modal/SendInviteModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";

export default function AdminManagenment() {
  const [admins, setAdmins] = useState([]);
  const [deletedId, setDeletedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { auth } = useAuth();
  const cardTitle = clsx(globalcss.poppinsBold, globalcss.textCenter);

  const getAllAdmins = async () => {
    try {
      const data = await adminService.getAllManagers();

      if (!data.success) {
        toast.error("Falha ao listar administradores");
      }

      return data.data;
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao listar administradores");
    }
  };

  function refreshAdmins() {
    getAllAdmins().then(setAdmins);
  }

  const handleDeleteManager = async () => {
    if (typeof deletedId !== "string" || !deletedId.trim()) {
      return toast.error("ID inválido.");
    }
    if (auth.user.id === deletedId) {
      return toast.error("Não é possível excluir essa conta.");
    }
    try {
      const response = await adminService.deleteManager(deletedId);
      if (response.success === true) {
        toast.success("Administrador deletado com sucesso.");
        setIsConfirmModalOpen(false);
        refreshAdmins();
      } else {
        toast.error("Não é possível realizar esta ação.");
      }
    } catch (error) {
      toast.error("Erro ao deletar administrador.");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllAdmins().then(setAdmins);
  }, []);

  if (auth.user.role === "Boss") {
    return (
      <>
        <Navbar />
        <div
          className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}
        >
          <header>
            <h2 className={cardTitle}>Gerenciamento de Gestores</h2>
          </header>

          <main>
            <section
              className={`${globalcss.cardSection} ${styles.adminSection}`}
            >
              <div
                className={`${globalcss.cardContainer} ${styles.adminCardContainer}`}
              >
                <Card
                  title={
                    <div className={styles.titleRow}>
                      <Button
                        className={styles.bigButton}
                        text={"Adicionar novo gestor"}
                        color="bg-blue"
                        onClick={() => {
                          setIsModalOpen(!isModalOpen);
                        }}
                      />

                      <SearchBox placeholder="Pesquisar gestores..." />
                    </div>
                  }
                  align="left"
                  display={1}
                />

                <SendInviteModal
                  isOpen={isModalOpen}
                  setOpen={setIsModalOpen}
                />
              </div>
            </section>

            <section className={styles.tableContainerTwo}>
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Função</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((a) => (
                    <tr key={a._id}>
                      <td>{a.name}</td>
                      <td>{a.email}</td>
                      <td>{a.role}</td>
                      <td>
                        <Button
                          color="bg-red"
                          text={"Excluir"}
                          onClick={() => {
                            setIsConfirmModalOpen(true);
                            setDeletedId(a._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ConfirmModal
                isOpen={isConfirmModalOpen}
                setOpen={setIsConfirmModalOpen}
                onConfirm={handleDeleteManager}
              />
            </section>
          </main>
        </div>
      </>
    );
  } else {
    toast.error("Você não tem permissão para acessar esta página.");
    return;
  }
}
