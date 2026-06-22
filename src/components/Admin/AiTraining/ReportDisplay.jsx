import styles from "../../../css/ia.module.css";

export default function ReportDisplay({ report }) {
  if (!report) return null;

  const formattedReport = report.split("\n").map((line, index) => {
    const boldedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={index} dangerouslySetInnerHTML={{ __html: boldedLine }} />;
  });

  return (
    <div className={styles.reportDisplay}>
      <h2>Relatório de Avaliação do Candidato</h2>
      <div className={styles.reportContent}>{formattedReport}</div>
    </div>
  );
}
