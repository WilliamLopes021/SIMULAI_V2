import { useState } from "react";
import clsx from "clsx";
import mailService from "../../api/services/mailService";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import useAuth from "../../hooks/useAuth.jsx";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import MiniCard from "../../components/MiniCard/MiniCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState("");

  const { auth } = useAuth();

  const bannerTitle = clsx(
    globalcss.title,
    globalcss.poppinsBold,
    globalcss.spacing,
  );
  const headerDescription = clsx(
    globalcss.alterHeaderDesc,
    globalcss.poppinsRegular,
  );

  const miniCardInfo = [
    {
      Icon: MdOutlineMailOutline,
      title: "Email Principal",
      text: "simulai.tcc@gmail.com",
    },
    {
      Icon: FiPhone,
      title: "Telefone",
      text: "+55 (11) 94002-8922",
    },
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!auth?.user) {
      setSuccessMessage("Você precisa estar logado para enviar mensagens.");
      return;
    }

    try {
      await mailService.contact(data);
      setSuccessMessage("Mensagem enviada com sucesso!");
      reset();
    } catch {
      setSuccessMessage("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <div className={globalcss.alterHeader}>
          <div className={headerDescription}>
            <div className={bannerTitle}> Fale Conosco </div>
            Tire suas dúvidas, envie sugestões ou saiba mais sobre como o seu
            assistente SimulAI pode impulsionar sua carreira.
          </div>
        </div>
        <br />
        <main>
          <div className={globalcss.mainDivision}>
            <div className={formStyle.formContainer}>
              <div>
                <h2 className={formStyle.formHeading}>
                  Envie-nos uma Mensagem
                </h2>
              </div>

              <ContactForm
                onSubmit={handleSubmit(onSubmit)}
                register={register}
                errors={errors}
              />

              <p>Responderemos em até 24 horas úteis.</p>

              {successMessage && <p>{successMessage}</p>}
            </div>
          </div>

          <div className={globalcss.aside}>
            <h2> Outras Formas de Contato </h2>
            <br />
            <div className={globalcss.miniCardContainer}>
              {miniCardInfo.map((info, index) => (
                <MiniCard
                  key={`mini-${info.title}-${index}`}
                  Icon={info.Icon}
                  title={info.title}
                  text={info.text}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
