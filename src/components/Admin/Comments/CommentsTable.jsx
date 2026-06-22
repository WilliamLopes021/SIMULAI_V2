import styles from "../../../css/admin.module.css";
import Button from "../../Button/Button.jsx";

export default function CommentsTable({
  commentData,
  updateCommentStatus,
  deleteUserComment,
}) {
  return (
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
  );
}
