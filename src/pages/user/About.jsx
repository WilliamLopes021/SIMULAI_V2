import globalcss from "../../css/global.module.css";
import banner from "../../assets/AboutImageBanner.png";
import clsx from "clsx";
import { missionValuesInfo, journeyMilestonesInfo } from "../../const/AboutPageInfo";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

export default function About() {
  const bannerText = clsx(globalcss.poppinsBold, globalcss.bannerText);
  const cardTitle = clsx(globalcss.poppinsBold, globalcss.textCenter);

  return (
    <>
      <Navbar />
      <div className={globalcss.mainContainer}>
        <header>
          <div className={bannerText}>
            Construindo o Futuro da Preparação de Entrevistas.
            <p>
              Desde a nossa fundação, somos impulsionados pela visão de
              revolucionar a forma como os profissionais se preparam para o
              sucesso na carreira. Acreditamos no poder da IA para desbloquear o
              potencial humano, oferecendo uma experiência de prática
              personalizada, eficaz e sem estresse.
            </p>
          </div>
          <div className={globalcss.imgContainer}>
            <img
              src={banner}
              className={globalcss.bannerImg}
              alt="banner download."
            />
          </div>
        </header>
        <main>
          <section className={globalcss.cardSection}>
            <h2 className={cardTitle}> Nossa Missão & Valores</h2>
            <div className={globalcss.cardContainer}>
              {missionValuesInfo.map((info, index) => (
                <Card
                  key={`mission-${index}`}
                  title={info.title}
                  description={info.description}
                  Icon={info.Icon}
                  align="left"
                  display={info.display}
                />
              ))}
            </div>
          </section>

          <section className={globalcss.featureSection}>
            <h2 className={cardTitle}> Nossa Jornada & Marcos</h2>
            <div className={globalcss.cardGrid}>
              {journeyMilestonesInfo.map((info, index) => (
                <Card
                  key={`journey-${index}`}
                  title={info.title}
                  description={info.description}
                  Icon={info.Icon}
                  align="left"
                  display={info.display}
                />
              ))}
            </div><br />
          </section>
          <section className={globalcss.specialSection}>
            <h2 className={cardTitle}> Nossa Visão para o Futuro</h2>
            <p>
              Estamos comprometidos em continuar inovando e expandindo nossas
              ferramentas para garantir que cada usuário tenha a melhor chance
              de sucesso. O futuro é inteligente, e estamos construindo-o
              juntos.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
