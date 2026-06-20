import { useEffect, useState } from "react";
import { FaCalendarAlt, FaLayerGroup, FaStar } from "react-icons/fa";
import clsx from "clsx";
import toast from "react-hot-toast";
import userService from "../../api/services/userService";
import globalcss from "../../css/global.module.css";
import styles from "../../css/admin.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Column from "../../components/Graphics/Column";
import LineGraphic from "../../components/Graphics/Line";

export default function UserManagement() {
  const [metrics, setMetrics] = useState({ media: {}, ageMetrics: [] });
  const bannerText = clsx(globalcss.poppinsBold, globalcss.bannerText);
  const cardTitle = clsx(globalcss.poppinsBold, globalcss.textCenter);
  const centered = clsx(globalcss.centerElement, globalcss.miniCardContainer);
  const centerElement = clsx(
    globalcss.centerElement,
    globalcss.spacingPattern,
    globalcss.spacingTop
  );

  const userMetrics = async () => {
    try {
      const { media, age_distribution, NovemberRate, OctoberRate } =
        await userService.getMetrics();

      const ageMetrics = Object.entries(age_distribution).map(
        ([key, value]) => ({
          idade: key
            .slice(1)
            .replace(/_/g, "-")
            .replace(/(\d+)-(\d+)/, "$1–$2"),
          valor: value,
        })
      );
      return {
        media,
        ageMetrics,
      };
    } catch (err) {
      toast.error("Erro ao listar métricas!");
      return { media: {}, ageMetrics: [] };
    }
  };

  useEffect(() => {
    userMetrics().then(setMetrics);
  }, []);

  return (
    <>
      <Navbar />
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <header>
          <h2 className={cardTitle}>Métricas do Usuário</h2>
        </header>

        <main>
          <section className={styles.metricsSection}>
            <div className={styles.metricsContainer}>
              <div className={styles.metricCard}>
                <FaCalendarAlt className={styles.metricIcon} />
                <h3 className={styles.metricTitle}>Média de Idade</h3>
                <p className={styles.metricValue}>
                  {metrics && metrics.media.age}
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
                  {metrics && metrics.media.rate} / 5 estrelas
                </p>
                <p className={styles.metricDescription}>
                  Satisfação geral do usuário
                </p>
              </div>
            </div>
          </section>
          <section className={centerElement}>
            <div className={centered}>
              {metrics?.ageMetrics && <Column data={metrics.ageMetrics} />}
              {metrics?.ageMetrics && <LineGraphic data={metrics.ageMetrics} />}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}