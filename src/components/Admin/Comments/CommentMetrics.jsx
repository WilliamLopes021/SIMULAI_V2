import styles from "../../../css/admin.module.css";

export default function CommentMetrics({ countData }) {
  return (
    <div className={styles.adminCardsRow}>
      <div className={styles.commentCardDisplay}>
        <h2> Total de Comentários </h2>
        <span> {countData?.all || 0} </span>
        <p>Comentários recebidos até agora</p>
      </div>
      <div className={styles.commentCardDisplay}>
        <h2>Comentários Pendentes</h2>
        <span> {countData?.pendente || 0} </span>
        <p>Aguardando a moderação</p>
      </div>
      <div className={styles.commentCardDisplay}>
        <h2>Comentários Aprovados</h2>
        <span> {countData?.aprovado || 0} </span>
        <p>Comentários visíveis para os usuários</p>
      </div>
    </div>
  );
}
