import { useEffect, useState } from "react";
import clsx from "clsx";
import adminService from "../../api/services/adminService.js";
import globalcss from "../../css/global.module.css";
import styles from "../../css/admin.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";
import SearchBox from "../../components/SearchBox/SearchBox.jsx";
import Button from "../../components/Button/Button.jsx";
import toast from "react-hot-toast";

export default function CommentsManagement() {
  const [commentData, setCommentData] = useState([]);
  const [countData, setCountData] = useState({});
  const [currentStatus, setCurrentStatus] = useState(true);

  const cardTitle = clsx(globalcss.poppinsBold, globalcss.textCenter);

  const updateCommentStatus = async (id, status) => {
    try {
      const data = await adminService.setCommentStatus(id, status);

      if (!data.success) {
        toast.error("Não foi possível modificar o status do comentário!");
      }

      const res = await getAllComments(currentStatus);
      setCommentData(res.comments);
      setCountData(res.count);
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao manipular comentário.");
    }
  };

  const deleteUserComment = async (Ids) => {
    try {
      const data = await adminService.deleteUserComment(Ids);

      if (!data.success) {
        toast.error("Não foi possível deletar o comentário!");
      }
      const res = await getAllComments(currentStatus);
      setCommentData(res.comments);
      setCountData(res.count);
      toast.success("Comentário deletado com sucesso!");
    } catch (error) {
      console.log(error.message);
      toast.error("Erro ao deletar comentário.");
    }
  };

  const getAllComments = async (status = true) => {
    try {
      const { comments, count } = await adminService.getAllComments(status);
      return { comments, count };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments(currentStatus).then((res) => {
      setCommentData(res.comments);
      setCountData(res.count);
    });
  }, [currentStatus]);

  return (
    <>
      <Navbar />
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <header>
          <h2 className={cardTitle}>Gerenciamento de comentários</h2>
        </header>
        <main>
          <section
            className={`${globalcss.cardSection} ${styles.adminSection}`}
          >
            <div className={styles.adminCardContainer}>
              <div className={styles.adminCardsRow}>
                <div className={styles.commentCardDisplay}>
                  <h2> Total de Comentários </h2>
                  <span> {countData.all} </span>
                  <p>Comentários recebidos até agora</p>
                </div>
                <div className={styles.commentCardDisplay}>
                  <h2>Comentários Pendentes</h2>
                  <span> {countData.pendente} </span>
                  <p>Aguardando a moderação</p>
                </div>
                <div className={styles.commentCardDisplay}>
                  <h2>Comentários Aprovados</h2>
                  <span> {countData.aprovado} </span>
                  <p>Comentários visíveis para os usuários</p>
                </div>
              </div>
            </div>
            <br />
            <div
              className={`${globalcss.cardContainer} ${styles.adminCardContainer}`}
            >
              <Card
                title={
                  <div className={styles.titleWithButtons}>
                    <span>Lista de comentários</span>

                    <div className={styles.buttonsArea}>
                      <Button
                        className={styles.bigButton}
                        text={"Aprovar selecionados"}
                        color="bg-white"
                      />
                      <Button
                        className={styles.bigButton}
                        text={"Rejeitar selecionados"}
                        color="bg-white"
                      />
                      <Button
                        className={styles.bigButton}
                        text={"Excluir selecionados"}
                        color="bg-red"
                      />
                    </div>
                  </div>
                }
                align="left"
                display={1}
                addInfo={
                  <div className={styles.adminAddInfo}>
                    <div className={styles.filtersRow}>
                      <SearchBox placeholder="Pesquisar comentários..." />

                      <select
                        className={styles.select}
                        value={currentStatus}
                        onChange={(e) => {
                          const v = e.target.value;
                          setCurrentStatus(v === "Todos" ? true : v);
                        }}
                      >
                        <option value="Todos">Todos os Status</option>
                        <option value="Aprovado">Aprovados</option>
                        <option value="Pendente">Pendentes</option>
                        <option value="Rejeitado">Rejeitados</option>
                      </select>
                    </div>
                  </div>
                }
              />
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th>E-mail</th>
                    <th>Comentário</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(commentData) &&
                    commentData.map((com) => (
                      <tr key={com.id}>
                        <td className={styles.userCell}>{com.email}</td>

                        <td className={styles.commentCell}>{com.body}</td>

                        <td>
                          {new Date(com.createdAt).toLocaleString("pt-BR")}
                        </td>

                        <td>
                          <span
                            className={`${styles.badge} ${
                              styles[`${com.status}`]
                            }`}
                          >
                            {com.status}
                          </span>
                        </td>

                        <td className={styles.actionCell}>
                          <Button
                            text="Aprovar"
                            color="bg-white"
                            onClick={() =>
                              updateCommentStatus(
                                { userId: com.userId, commentId: com.id },
                                { status: "Aprovado" }
                              )
                            }
                          />

                          <Button
                            text="Rejeitar"
                            color="bg-white"
                            onClick={() =>
                              updateCommentStatus(
                                { userId: com.userId, commentId: com.id },
                                { status: "Rejeitado" }
                              )
                            }
                          />

                          <Button
                            text="Excluir"
                            color="bg-red"
                            onClick={() =>
                              deleteUserComment({
                                userID: com.userId,
                                commentID: com.id,
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}