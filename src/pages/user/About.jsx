import globalcss from "../../css/global.module.css";
import banner from "../../assets/AboutImageBanner.png";
import clsx from "clsx";
import { LuLightbulb } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { MdOutlineHandshake } from "react-icons/md";
import { GoDependabot, GoLightBulb } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
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
              <Card
                title="Inovação"
                description="Estamos constantemente explorando novas fronteiras da IA para oferecer as ferramentas mais avançadas e eficazes."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <LuLightbulb size={48} color="#0048ADFF" />
                  </div>
                )}
                align="left"
                display={1}
              />
              <Card
                title="Centrado no Usuário"
                description="O sucesso dos nossos usuários é a nossa prioridade. Projetamos soluções que realmente transformam vidas e carreiras."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <LuUsers size={48} color="#0048ADFF" />
                  </div>
                )}
                align="left"
                display={1}
              />
              <Card
                title="Integridade"
                description="Operamos com total transparência e honestidade, construindo confiança com a nossa comunidade."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <MdOutlineHandshake size={48} color="#0048ADFF" />
                  </div>
                )}
                align="left"
                display={1}
              />
            </div>
          </section>

          <section className={globalcss.featureSection}>
            <h2 className={cardTitle}> Nossa Jornada & Marcos</h2>
            <div className={globalcss.cardContainer}>
              <Card
                title="Fundação da Empresa"
                description="Estamos constantemente explorando novas fronteiras da IA para oferecer as ferramentas mais avançadas e eficazes."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaRegStar size={48} color="#00BDD6FF" />
                    <span style={{ color: "#00BDD6FF", fontWeight: "bold" }}>
                      2020
                    </span>
                  </div>
                )}
                align="left"
                display={1}
              />

              <Card
                title="Lançamento do MVP"
                description="Lançamos a primeira versão do nosso assistente de IA, recebendo feedback valioso de nossos usuários beta."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <GoTrophy size={48} color="#00BDD6FF" />
                    <span style={{ color: "#00BDD6FF", fontWeight: "bold" }}>
                      2021
                    </span>
                  </div>
                )}
                align="left"
              />
              <Card
                title="Atingimos 100.000 Usuários"
                description="Celebramos nosso crescimento, alcançando uma base de usuários significativa e impactando milhares de carreiras."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <LuUsers size={48} color="#00BDD6FF" />
                    <span style={{ color: "#00BDD6FF", fontWeight: "bold" }}>
                      2022
                    </span>
                  </div>
                )}
                align="left"
                display={1}
              />
              <Card
                title="Introdução de Novas Ferramentas de IA"
                description="Expandimos nossos recursos com análises de voz e feedback comportamental, aprimorando ainda mais a experiência."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <GoLightBulb size={48} color="#00BDD6FF" />
                    <span style={{ color: "#00BDD6FF", fontWeight: "bold" }}>
                      2023
                    </span>
                  </div>
                )}
                align="left"
              />
              <Card
                title="Parcerias Estratégicas"
                description="Firmamos colaborações com grandes empresas de RH, ampliando nosso alcance e oferta de oportunidades."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <MdOutlineHandshake size={48} color="#00BDD6FF" />
                    <span style={{ color: "#00BDD6FF", fontWeight: "bold" }}>
                      2024
                    </span>
                  </div>
                )}
                align="left"
                display={1}
              />
              <Card
                title="Visão para o Futuro"
                description="Continuaremos a evoluir, integrando as mais recentes inovações em IA para ajudar você a alcançar seus sonhos profissionais."
                Icon={() => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <GoDependabot size={48} color="#00BDD6FF" />
                    <span style={{ color: "#00BDD6FF", fontWeight: "bold" }}>
                      2025
                    </span>
                  </div>
                )}
                align="left"
              />
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
