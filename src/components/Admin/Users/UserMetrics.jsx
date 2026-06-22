import { FaCalendarAlt, FaLayerGroup, FaStar } from "react-icons/fa";
import styles from "../../../css/admin.module.css";

export default function UserMetrics({ metrics }) {
  return (
    <div className={styles.metricsContainer}>
      <div className={styles.metricCard}>
        <FaCalendarAlt className={styles.metricIcon} />
        <h3 className={styles.metricTitle}>Média de Idade</h3>
        <p className={styles.metricValue}>
          {metrics?.media?.age || "-"}
        </p>
        <p className={styles.metricDescription}>
          Dados demográficos da base de usuários
        </p>
      </div>

      <div className={styles.metricCard}>
        <FaLayerGroup className={styles.metricIcon} />
        <h3 className={styles.metricTitle}>Nível Médio</h3>
        <p className={styles.metricValue}>Nível 7.2</p>
        <p className={styles.metricDescription}>
          Progresso geral do usuário
        </p>
      </div>

      <div className={styles.metricCard}>
        <FaStar className={styles.metricIcon} />
        <h3 className={styles.metricTitle}>Classificações Médias</h3>
        <p className={styles.metricValue}>
          {metrics?.media?.rate || "-"} / 5 estrelas
        </p>
        <p className={styles.metricDescription}>
          Satisfação geral do usuário
        </p>
      </div>
    </div>
  );
}
