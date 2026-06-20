import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import { LuBookMarked } from "react-icons/lu";
import { FiTarget } from "react-icons/fi";
import { TfiMedall } from "react-icons/tfi";
import { FaRegHourglass } from "react-icons/fa6";
import MiniCard from "../../components/MiniCard/MiniCard";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Progress() {
  const banner = clsx(
    globalcss.alterHeader,
    globalcss.poppinsBold,
    globalcss.title
  );

  const centered = clsx(globalcss.aside, globalcss.centerElement);
  return (
    <>
      <Navbar />
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <div className={banner}>
          Meu Progresso
          <div className={globalcss.miniCardContainer}>
            <Card
              title={"42"}
              Icon={LuBookMarked}
              iconSize={24}
              description={[
                "Total de entrevistas",
                "Entrevistas simuladas concluídas",
              ]}
              iconColor={"#565D6DFF"}
              alterCard={true}
            />
            <Card
              title={"42"}
              Icon={FiTarget}
              iconSize={24}
              description={[
                "Taxa de precisão",
                "Entrevistas simuladas concluídas",
                "AAAAAAAAAA",
              ]}
              iconColor={"#565D6DFF"}
              alterCard={true}
            />
            <Card
              title={"42"}
              Icon={TfiMedall}
              iconSize={24}
              description={[
                "Habilidades Dominadas",
                "Entrevistas simuladas concluídas",
              ]}
              iconColor={"#565D6DFF"}
              alterCard={true}
            />
            <Card
              title={"42"}
              Icon={FaRegHourglass}
              iconSize={24}
              description={[
                "Horas de Prática",
                "Entrevistas simuladas concluídas",
                "AAAAAAAAAA",
              ]}
              iconColor={"#565D6DFF"}
              alterCard={true}
            />
          </div>
        </div>
        <main className={globalcss.spacingTop}>
          <section className={globalcss.centerElement}>
            <div className={centered}>
              <div className={globalcss.test}></div>
              <div className={globalcss.test}></div>
            </div>

            <div className={centered}>
              <div className={globalcss.test}></div>
              <div className={globalcss.test}></div>
            </div>
          </section>

          <section className={globalcss.featureSection}>
            <div className={globalcss.miniCardContainerColumn}>
              <MiniCard
                Icon={TfiMedall}
                iconColor={"#0048ADFF"}
                title={"Módulo Completo: Entrevista Comportamental"}
                text={
                  "Você concluiu com sucesso todos os exercícios do módulo de entrevista comportamental."
                }
                size={"lg"}
              />
              <MiniCard
                Icon={FiTarget}
                iconColor={"#0048ADFF"}
                title={"Módulo Completo: Entrevista Comportamental"}
                text={
                  "Você concluiu com sucesso todos os exercícios do módulo de entrevista comportamental."
                }
              />{" "}
              <MiniCard
                Icon={FaRegHourglass}
                iconColor={"#0048ADFF"}
                title={"Módulo Completo: Entrevista Comportamental"}
                text={
                  "Você concluiu com sucesso todos os exercícios do módulo de entrevista comportamental."
                }
              />{" "}
              <MiniCard
                Icon={LuBookMarked}
                iconColor={"#0048ADFF"}
                title={"Módulo Completo: Entrevista Comportamental"}
                text={
                  "Você concluiu com sucesso todos os exercícios do módulo de entrevista comportamental."
                }
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

