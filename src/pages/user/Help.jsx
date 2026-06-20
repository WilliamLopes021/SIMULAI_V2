import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import userService from "../../api/services/userService";
import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Accordion from "../../components/Accordion/Accordion";
import useAuth from "../../hooks/useAuth.jsx";

export default function Help() {
  const [success, setSuccess] = useState("");

  const { auth } = useAuth();

  const navigate = useNavigate();
  const bannerTitle = clsx(globalcss.helpTitle, globalcss.poppinsSemibold);
  const accordionTitle = clsx(globalcss.poppinsBold, globalcss.accordionTitle);
  const formTitle = clsx(
    globalcss.textCenter,
    globalcss.poppinsSemibold,
    globalcss.accordionTitle
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const body = { ...data, rating: 0, type: "Help" };
      const id = auth?.user?.id;

      if (!id) {
        setSuccess(
          <>
            Você precisa ter uma{" "}
            <Link to="/cadastro" className={formStyle.link}>
              conta
            </Link>{" "}
            para realizar esta ação!
          </>
        );
        return;
      }

      await userService.createComment(body, id);
      setSuccess("Comentário realizado com sucesso!");
      reset();
    } catch (err) {
      console.log(err.message);
      setSuccess("Falha ao realizar comentário.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <header>
          <div className={globalcss.alterHeader}>
            <p className={bannerTitle}>Perguntas Frequentes</p>
            <p className={globalcss.textComment}>
              Encontre respostas para suas perguntas sobre o AI Interview
              Assistant.
            </p>
          </div>
        </header>
        <main>
          <section className={globalcss.featureSection}>
            <div>
              <h2 className={accordionTitle}> Perguntas Gerais</h2>
              <div className={globalcss.accordionSection}>
                <Accordion
                  question="O que é o SimulAI?"
                  answer="O SimulAI é uma plataforma de preparação para entrevistas que utiliza inteligência artificial para simular cenários de entrevista, fornecer feedback em tempo real e ajudar os usuários a aprimorar suas habilidades."
                />
                <Accordion
                  question="Como o assistente de IA funciona?"
                  answer="O assistente analisa o conteúdo das suas respostas para gerar perguntas personalizadas, indentificar pontos fortes, gerar feedkbacks de melhorias e também te dar dicas"
                />
                <Accordion
                  question="Quais tipos de entrevistas são suportados?"
                  answer="Atualmente, o SimulAI suporta entrevistas técnicas básicas, entrevistas de estágio/primeiro emprego e entrevistas gerais de RH. Novos modelos de perguntas estão sendo adicionados continuamente."
                />
                <Accordion
                  question="Quais são os requisitos mínimos do sistema?"
                  answer="Para utilizar do nosso aplicativo, basta ter um celular android."
                />
              </div>
              <h2 className={accordionTitle}> Usando o Assistente de IA </h2>
              <div className={globalcss.accordionSection}>
                <Accordion
                  question="Como inicio uma sessão de prática?"
                  answer='Basta entrar no aplicativo, e clicar no botão "Iniciar Entrevista".'
                />
                <Accordion
                  question="Posso revisar meu desempenho após a sessão?"
                  answer="Sim, os feedbacks são instantâneos, é possível verificá-los logo após a entrevista."
                />
                <Accordion
                  question="Quão preciso é o feedback da IA?"
                  answer="Temos uma IA completamente focada em dar feedbacks reais de acordo com o desempenho do usuário."
                />
                <Accordion
                  question="Posso personalizar as perguntas das entrevistas?"
                  answer="Sim, você pode filtrar a profissão na qual a entrevista será focada, dessa forma a IA realizará perguntas mais técnicas sobre a área escolhida."
                />
              </div>
              <h2 className={accordionTitle}> Suporte Técnico </h2>
              <div className={globalcss.accordionSection}>
                <Accordion
                  question="Estou enfrentando problemas técnicos, o que devo fazer?"
                  answer="Você deve entrar em contato por meio do nosso site, assim nós te ajudaremos!"
                />
                <Accordion
                  question="Como entro em contato com o suporte?"
                  answer="No nosso site, temos a aba de Contatos e a de Ajuda, você pode entrar em contato po qualquer uma dessas abas."
                />
                <Accordion
                  question="Onde posso encontrar tutoriais ou guias de usuário? "
                  answer="No site do SimulAI, tem todas as informações necessárias para o usuário, e o nosso aplicativo é bem simples e intuitivo."
                />
              </div>
            </div>
          </section>
          <section className={globalcss.alterSection}><br />  
            <h2 className={globalcss.poppinsSemibold}>
              Não encontrou o que procura?
            </h2>
            <p>
              Nossa equipe de suporte está pronta para ajudar. Fale conosco ou
              deixe seu feedback.
            </p>
            <div className={formStyle.formContainerTwo}>
              <div className={formStyle.formHeadingTwo}>
                <h1 className={formTitle}>Compartilhe a Sua Dúvida</h1>
                <p>
                  Nossos administradores podem esclarecer suas dúvidas através
                  desta página! Sua opinião faz a diferença!
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={formStyle.formGroupTwo}>
                  <input
                    type="text"
                    placeholder="Assunto"
                    {...register("title", {
                      validate: (value) =>
                        value.trim() !== "" || "Insira um título válido.",
                    })}
                  />

                  {errors.title && <p>{errors.title.message}</p>}

                  <textarea
                    placeholder="Digite a sua dúvida..."
                    {...register("body", {
                      validate: (value) =>
                        value.trim() !== "" || "O preenchimento é obrigatório.",
                    })}
                  />
                  {errors.body && <p>{errors.body.message}</p>}
                </div>
                <p className={globalcss.textComment}> {success} </p>
                <div className={formStyle.formButton}>
                  <Button text="Enviar Feedback" color="bg-blue" size={"lg"} />
                </div>
              </form>
            </div>
            <p>
              Você também pode falar <b>diretamente</b> conosco ou deixar um{" "}
              <b>feedback </b>
              da sua experiência com nossos serviços.
            </p>
            <div className={globalcss.buttons}>
              <Button
                text="Fale Conosco"
                color="bg-white"
                onClick={() => navigate("/contatos")}
              />
              <Button
                text="Enviar Feedback"
                color="bg-blue"
                onClick={() => navigate("/feedback")}
              />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

