import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import userService from "../../api/services/userService";
import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Accordion from "../../components/Accordion/Accordion";
import useAuth from "../../hooks/useAuth.jsx";
import {
  generalQuestions,
  technicalSupportQuestions,
  usingAssistantQuestions,
} from "../../const/HelpPageInfo.js";
import HelpForm from "../../components/HelpForm/HelpForm.jsx";

export default function Help() {
  const [success, setSuccess] = useState("");

  const { auth } = useAuth();

  const bannerTitle = clsx(globalcss.helpTitle, globalcss.poppinsSemibold);
  const accordionTitle = clsx(globalcss.poppinsBold, globalcss.accordionTitle);
  const formTitle = clsx(
    globalcss.textCenter,
    globalcss.poppinsSemibold,
    globalcss.accordionTitle,
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
          </>,
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
                {generalQuestions.map((question) => (
                  <Accordion
                    key={question.question}
                    question={question.question}
                    answer={question.answer}
                  />
                ))}
              </div>
              <h2 className={accordionTitle}> Usando o Assistente de IA </h2>
              <div className={globalcss.accordionSection}>
                {usingAssistantQuestions.map((question) => (
                  <Accordion
                    key={question.question}
                    question={question.question}
                    answer={question.answer}
                  />
                ))}
              </div>
              <h2 className={accordionTitle}> Suporte Técnico </h2>
              <div className={globalcss.accordionSection}>
                {technicalSupportQuestions.map((question) => (
                  <Accordion
                    key={question.question}
                    question={question.question}
                    answer={question.answer}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className={globalcss.alterSection}>
            <br />
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

              <HelpForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
                success={success}
              />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
