import clsx from "clsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { useForm } from "react-hook-form";
import { getUserEmail } from "../../utils/globalStore.js";
import mailService from "../../api/services/mailService.js";
import style from "../../css/verification.module.css";
import globalcss from "../../css/global.module.css";
import Button from "../../components/Button/Button";
import ResetPasswordModal from "../../components/Modal/ResetPasswordModal";

export default function RecoverPassword() {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const { validateCode } = useAuth();
  const { register, handleSubmit } = useForm();
  const inputsRef = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    try {
      const code = Object.values(data).join("");
      if (code.length < 6) {
        toast.error("Preencha todos os campos.");
        return null;
      }
      (await validateCode({ code: code }))
        ? setModalOpen(true)
        : toast.error("Erro na verificação. Verifique a validade do código.");
    } catch (error) {
      console.log("AAA", error.message);
    }
  };

  const resendCode = async () => {
    try {
      const email = getUserEmail();
      if (!email) {
        toast.error("Endereço de E-mail não identificado.");
        return;
      }
      const emailSent = await mailService.recoveryMail({ email });

      if (emailSent.success === true) {
        navigate("/recuperar");
      } else {
        toast.error("Falha ao reenviar E-mail");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const RecoverForm = () => {
    return (
      <div className={style.inputGroup}>
        {[...Array(6)].map((_, i) => {
          const { ref, ...rest } = register(`code${i + 1}`);

          return (
            <input
              key={i}
              type="text"
              maxLength="1"
              {...rest}
              ref={(el) => {
                ref(el);
                inputsRef.current[i] = el;
              }}
              className={style.input}
              onInput={(e) => handleInput(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          );
        })}
      </div>
    );
  };

  const title = clsx(globalcss.poppinsBold, style.title);
  const subTitle = clsx(globalcss.poppinsSemiBold, style.subtitle);

  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={title}>Verifique sua identidade</h1>
          <p className={subTitle}>
            Digite o código de 6 dígitos enviado ao seu e-mail
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RecoverForm />
            <Button color="bg-blue" text={"Confirmar"} size={"lg"} />
          </form>
          <a
            className={style.resend}
            onClick={() => {
              resendCode();
            }}
          >
            Reenviar código
          </a>
        </div>
      </div>
      <ResetPasswordModal isOpen={modalOpen} />
    </>
  );
}
