import { useEffect, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import userService from "../../api/services/userService";
import globalcss from "../../css/global.module.css";
import styles from "../../css/admin.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Column from "../../components/Graphics/Column";
import LineGraphic from "../../components/Graphics/Line";
import UserMetrics from "../../components/Admin/Users/UserMetrics";

export default function UserManagement() {
  const [metrics, setMetrics] = useState({ media: {}, ageMetrics: [] });
  const cardTitle = clsx(globalcss.poppinsBold, globalcss.textCenter);
  const centered = clsx(globalcss.centerElement, globalcss.miniCardContainer);
  const centerElement = clsx(
    globalcss.centerElement,
    globalcss.spacingPattern,
    globalcss.spacingTop
  );

  const userMetrics = async () => {
    try {
      const { media, age_distribution, } =
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
    } catch {
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
      <div className={`${globalcss.mainContainer}`}>
        <header>
          <h2 className={cardTitle}>Métricas do Usuário</h2>
        </header>

        <main>
          <section className={styles.metricsSection}>
              <UserMetrics metrics={metrics} />
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