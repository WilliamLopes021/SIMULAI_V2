import globalcss from "../../css/global.module.css";
import banner from "../../assets/homeBanner2.png";
import { cardInfo, feedbackData } from "../../const/HomePageInfo";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import UserFeedback from "../../components/UserFeedback/UserFeedback";

export default function Home() {
  const navigate = useNavigate();
  const bannerText = clsx(globalcss.poppinsBold, globalcss.bannerText);
  const cardTitle = clsx(globalcss.poppinsBold, globalcss.textCenter);

  return (
    <>
      <Navbar />
      <div className={globalcss.mainContainer}>
        <header>
          <div className={bannerText}>
            Desbloqueie o Sucesso na Sua Entrevista com IA.
            <p>
              Prepare-se para qualquer entrevista com nosso assistente de IA
              inovador. Pratique, receba feedback instantâneo e aperfeiçoe suas
              respostas.
            </p>
            <div className={globalcss.buttons}>
              <Button
                text="Comece Agora"
                color="bg-blue"
                onClick={() => navigate("/cadastro")}
              />
              <Button
                text="Entrar"
                color="bg-white"
                onClick={() => navigate("/login")}
              />
            </div>
            <br />
          </div>
          <div className={globalcss.imgContainer}>
            <img src={banner} className={globalcss.bannerImg} alt="banner" />
          </div>
        </header>

        <main>
          <section className={globalcss.cardSection}>
            <h2 className={cardTitle}>
              Como Nosso Assistente de IA Transforma Sua Preparação
            </h2>
            <div className={globalcss.cardContainer}>
              {cardInfo.map((info, index) => {
                return (
                  <Card
                    key={`${index}${info.title}`}
                    title={info.title}
                    description={info.description}
                    Icon={info.Icon}
                    display={1}
                  />
                );
              })}
            </div>
            <br />
          </section>

          <section>
            <h2 className={globalcss.textCenter}>
              O Que Nossos Usuários Dizem
            </h2>

            <div className={globalcss.commentContainer}>
              {feedbackData.map((info, index) => {
                return (
                  <UserFeedback
                    key={`${index}${info.name}`}
                    name={info.name}
                    feedback={info.feedback}
                    imgUrl={info.imgUrl}
                    position={info.position}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
