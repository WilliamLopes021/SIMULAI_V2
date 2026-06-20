import globalcss from "../../css/global.module.css";
import clsx from "clsx";
import banner from "../../assets/downBanner.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import img1 from "../../assets/DownloadImage.jpeg";
import img2 from "../../assets/DownloadImage2.jpeg";
import img3 from "../../assets/DownloadImage3.jpeg";
import img4 from "../../assets/DownloadImage4.jpeg";
import img5 from "../../assets/DownloadImage7.jpeg";

export default function Download() {
  const bannerText = clsx(globalcss.poppinsBold, globalcss.bannerText);
  const textCenter = clsx(globalcss.poppinsBold, globalcss.textCenter);

  return (
    <>
      <Navbar />
      <div className={globalcss.mainContainer}>
        <header>
          <div className={bannerText}>
            Experimente o Futuro da Preparação para Entrevistas
            <p>
              Prepare-se com inteligência artificial. Nosso assistente oferece
              simulações realistas, feedback personalizado e análise de
              desempenho para você se destacar em qualquer entrevista.
            </p>
            <div className={globalcss.buttonCenter}>
              <Button text="Baixe o Aplicativo" color="bg-blue" />
            </div>
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
          <section className={globalcss.featureSection}>
            <h2 className={textCenter}>
              Funcionalidades que Impulsionam seu Sucesso
            </h2>
            <div className={globalcss.cardContainer}>
              <Card
                title="Feedback Personalizado"
                description="Receba análises detalhadas e sugestões de melhoria após cada sessão de prática."
                Icon={img1}
                iconType="img"
                display={1}
              />
              <Card
                title="Simulação de Entrevista"
                description="Pratique com cenários de entrevisa realistas e perguntas comuns do setor."
                Icon={img2}
                iconType="img"
                display={1}
              />
              <Card
                title="Análise de Desempenho"
                description="Monitore o seu progresso ao longo do tempo com gráficos e métricas claras."
                Icon={img3}
                iconType="img"
                display={1}
              />
              <Card
                title="Acompanhamento de progresso"
                description="Visualize sus pontos fortes e fracos para focar no que realmente importa"
                Icon={img4}
                iconType="img"
                display={1}
              />
              <Card
                title="Dicas Especializadas"
                description="Obtenha conselhos práticos para aprimorar suas habilidades"
                Icon={img5}
                iconType="img"
                display={1}
              />
            </div><br />
          </section>
          <section className={globalcss.specialSection}>
            <h2 className={textCenter}>
              Pronto para Impulsionar sua Carreira?
            </h2>
            <p>
              Comece a praticar hoje mesmo e construa a confiança necessária
              para brilhar nas suas próximas entrevistas.
            </p>
            <Button text="Disponível no Google Play" color="bg-white" />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

