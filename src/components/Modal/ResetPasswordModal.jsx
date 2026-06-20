import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/validateEntries";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isStrongPassword } from "validator";
import useAuth from "../../hooks/useAuth.jsx";
import userService from "../../api/services/userService";
import Button from "../Button/Button";
import formStyle from "../../css/forms.module.css";
import style from "../../css/modal.module.css";

export default function ResetPasswordModal({ isOpen = false }) {
  const [show, setShow] = useState("password");
  let { auth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const showContent = () => {
    setShow((prev) => (prev === "password" ? "text" : "password"));
  };

  useEffect(() => {
    if (errors.email) toast.error(errors.email.message);
    if (errors.password) toast.error(errors.password.message);
    if (errors.confirmPassword) toast.error(errors.confirmPassword.message);
  }, [errors]);

  const onSubmit = async (data) => {
    try {
      const { email } = data;
      const user = await userService.getById(auth.user.id);

      if (user.email === email) {
        const response = await userService.resetPassword(auth.user.id, data);

        if (response.success) {
          reset();
          toast.success("Senha redefinida com sucesso!");
          navigate("/");
        } else {
          toast.error("Falha ao redefinir senha. ID inválido.");
        }
      } else {
        toast.error("E-mail não confere com o usuário logado.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao processar requisição.");
    }
  };

  // A guarda abaixo (`if (!auth?.acessToken) return null`) é
  // suficiente para proteger o modal. O useEffect anterior
  // era defeituoso (a variável `retry` era redefinida a cada
  // renderização, tornando o guard inútil) e foi removido.

  if (!auth?.acessToken) return null;
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={style.overlay} forceMount />
        <Dialog.Content className={style.contentTwo} forceMount>
          <div className={style.heading}>
            <Dialog.Title>Insira a sua nova senha</Dialog.Title>
            <Dialog.Description className={style.text}>
              <p>
                Não compartilhe sua senha com NINGUÉM. Sua senha deve conter:
              </p>
              <br />

              <ul>
                <li>Seis (6) caracteres.</li>
                <li>Uma letra maiúscula.</li>
                <li>Uma letra minúscula.</li>
                <li>Um número.</li>
                <li>Um símbolo (!@#$%¨&*())</li>
              </ul>
            </Dialog.Description>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={formStyle.formGroup}>
              <input
                type="email"
                placeholder="E-mail"
                {...register("email", {
                  validate: (value) => validateEmail(value),
                })}
              />

              <input
                type={show}
                placeholder="Nova senha"
                {...register("password", {
                  validate: (v) =>
                    isStrongPassword(v) ||
                    "A senha não cumpre os requisitos mínimos!",
                })}
              />

              <input
                type={show}
                placeholder="Confirmar senha"
                {...register("confirmPassword", {
                  validate: (v) => password === v || "As senhas não coincidem.",
                })}
              />

              <Button text="Enviar" typeButton="submit" color="bg-blue" />
              <Button
                text={show === "password" ? "Mostrar" : "Ocultar"}
                typeButton="button"
                onClick={showContent}
              />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
