import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getManagerId } from "../../utils/globalStore.js";
import modalStyle from "../../css/modal.module.css";
import style from "../../css/verification.module.css";
import globalcss from "../../css/global.module.css";
import Button from "../../components/Button/Button";

/**
 * Campos de código de 6 dígitos para autenticação.
 * Extraido para fora do componente principal para evitar
 * recriação desnecessaria a cada renderização.
 */
const CodeInputFields = ({
  register,
  inputsRef,
  handleInput,
  handleKeyDown,
}) => (
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

export default function AuthenticatorModal({ isOpen = false }) {
  const { loginManager } = useAuth();
  const { register, handleSubmit } = useForm();
  const inputsRef = useRef([]);
  const navigate = useNavigate();

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
      const id = getManagerId();

      if (code.length < 6) {
        toast.error("Preencha todos os campos.");
        return null;
      }

      await loginManager(id, { code });
      navigate("/usuarios");
    } catch (error) {
      navigate("/login");
      console.error("Erro na autenticação do gestor:", error.message);
    }
  };

  const subTitle = clsx(globalcss.poppinsSemiBold, style.subtitle);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={modalStyle.overlay} forceMount />
        <Dialog.Content className={modalStyle.contentTwo} forceMount>
          <div className={modalStyle.heading}>
            <Dialog.Title>Insira o seu código de acesso.</Dialog.Title>

            <Dialog.Description className={subTitle}>
              Digite o fornecido no momento de cadastro da sua conta
              administrativa.
            </Dialog.Description>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CodeInputFields
              register={register}
              inputsRef={inputsRef}
              handleInput={handleInput}
              handleKeyDown={handleKeyDown}
            />
            <Button color="bg-blue" text={"Confirmar"} size={"lg"} />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
