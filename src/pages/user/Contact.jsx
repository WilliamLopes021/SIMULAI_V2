import { useState } from "react";
import clsx from "clsx";
import mailService from "../../api/services/mailService";
import { useForm } from "react-hook-form";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { validateName, validateEmail } from "../../utils/validateEntries";
import useAuth from "../../hooks/useAuth.jsx";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import MiniCard from "../../components/MiniCard/MiniCard";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState("");

  const { auth } = useAuth(); // ✅ PARA SABER SE O USUÁRIO ESTÁ LOGADO

  const bannerTitle = clsx(
    globalcss.title,
    globalcss.poppinsBold,
    globalcss.spacing,
  );
  const headerDescription = clsx(
    globalcss.alterHeaderDesc,
    globalcss.poppinsRegular,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // 🔥 SE NÃO ESTIVER LOGADO → BLOQUEIA AQUI MESMO
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

              <form action="post" onSubmit={handleSubmit(onSubmit)}>
                <div className={formStyle.formGroup}>
                  <input
                    type="text"
                    placeholder="Seu Nome Completo"
                    {...register("completeName", {
                      validate: (value) => validateName(value),
                    })}
                  />
                  {errors.completeName && <p>{errors.completeName.message}</p>}

                  <input
                    type="text"
                    placeholder="Seu E-mail"
                    {...register("email", {
                      validate: (value) => validateEmail(value),
                    })}
                  />
                  {errors.email && <p>{errors.email.message}</p>}

                  <input
                    type="text"
                    placeholder="Assunto"
                    {...register("subject", {
                      validate: (value) =>
                        value.trim() !== "" || "Insira o assunto.",
                    })}
                  />
                  {errors.subject && <p>{errors.subject.message}</p>}

                  <textarea
                    type="text"
                    className={formStyle.textArea}
                    placeholder="Sua Mensagem..."
                    {...register("message", {
                      validate: (value) =>
                        value.trim() !== "" || "Mensagem inválida.",
                    })}
                  />
                  {errors.message && <p>{errors.message.message}</p>}
                </div>

                <Button text="Enviar Mensagem" color="bg-blue" size={"lg"} />
              </form>

              <p>Responderemos em até 24 horas úteis.</p>

              {successMessage && <p>{successMessage}</p>}
            </div>
          </div>

          <div className={globalcss.aside}>
            <h2> Outras Formas de Contato </h2>
            <br />
            <div className={globalcss.miniCardContainer}>
              <MiniCard
                Icon={MdOutlineMailOutline}
                title={"Email Principal"}
                text={"contact@simulai.com"}
              />
              <MiniCard
                Icon={FiPhone}
                title={"Telefone"}
                text={"+55 (11) 94002-8922"}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
