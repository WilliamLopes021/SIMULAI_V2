import globalcss from "../../css/global.module.css";
import banner from "../../assets/homeBanner2.png";
import { LuLightbulb } from "react-icons/lu";
import { FiBarChart } from "react-icons/fi";
import { MdMicNone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

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
            <img src={banner} className={globalcss.bannerImg} alt="" />
          </div>
        </header>

        <main>
          <section className={globalcss.cardSection}>
            <h2 className={cardTitle}>
              Como Nosso Assistente de IA Transforma Sua Preparação
            </h2>
            <div className={globalcss.cardContainer}>
              <Card
                title="Simulações Realistas"
                description="Pratique com IA que se adapta, oferecendo cenários de entrevista ilimitados para aprimorar suas habilidades."
                Icon={MdMicNone}
                display={1}
              />
              <Card
                title="Feedback Instantâneo"
                description="Receba análises detalhadas sobre sua linguagem corporal, tom de voz e conteúdo das respostas em tempo real."
                Icon={LuLightbulb}
                display={1}
              />
              <Card
                title="Análise de Desempenho"
                description="Acompanhe seu progresso com métricas claras e identifique áreas de melhoria para um crescimento contínuo."
                Icon={FiBarChart}
                display={1}
              />
            </div>
            <br />
          </section>

          <section>
            <h2 className={globalcss.textCenter}>
              O Que Nossos Usuários Dizem
            </h2>

            <div className={globalcss.commentContainer}>
              <div className={globalcss.alterComment}>
                <p className={globalcss.textComment}>
                  "É incrível o quão revolucionário é o aplicativo, por causa
                  dele consegui superar as minhas fraquezas e explorar melhor as
                  minhas inconsistências. Recomendo principalmente para quem tem
                  medo de fazer entrevistas"
                </p>
                <div className={globalcss.commentProfile}>
                  <img
                    src={
                      "https://imgs.search.brave.com/WkPUusWdlbWaejdqvG5Q8DSJyx5Fh5c1VnFho_Fr5hk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzIwLzQwLzE1LzY1/LzM2MF9GXzIwNDAx/NTY1NjJfRzJmVW5N/OE9TdFNUSHpUVzRW/UEtDWVNXNEtpTHVZ/TXcuanBn"
                    }
                    alt="perfilImage"
                  />
                  <div className={globalcss.commentProfileText}>
                    <b> Rios Oliveira </b>
                    <p> Eletricista </p>
                  </div>
                </div>
              </div>
              <div className={globalcss.alterComment}>
                <p className={globalcss.textComment}>
                  "Aplicativo insanamente insano. Consegui meu primeiro emprego
                  por causa dele. Obrigado equipe da SimulAI!"
                </p>
                <div className={globalcss.commentProfile}>
                  <img
                    src={
                      "https://imgs.search.brave.com/WkPUusWdlbWaejdqvG5Q8DSJyx5Fh5c1VnFho_Fr5hk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzIwLzQwLzE1LzY1/LzM2MF9GXzIwNDAx/NTY1NjJfRzJmVW5N/OE9TdFNUSHpUVzRW/UEtDWVNXNEtpTHVZ/TXcuanBn"
                    }
                    alt="perfilImage"
                  />
                  <div className={globalcss.commentProfileText}>
                    <b> Soares João Azafes </b>
                    <p> Designer de Interiores</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
