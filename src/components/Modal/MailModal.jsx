import * as Dialog from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../utils/validateEntries";
import { useNavigate } from "react-router-dom";
import { setUserEmail } from "../../utils/globalStore";
import mailService from "../../api/services/mailService";
import Button from "../Button/Button";
import formStyle from "../../css/forms.module.css";
import style from "../../css/modal.module.css";

export default function MailModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const emailSent = await mailService.recoveryMail(data);

      if (emailSent.success === true) {
        setUserEmail(emailSent.data.userEmail);
        navigate("/recuperar");
      } else {
        toast.error("Erro ao Enviar E-mail!");
      }
    } catch (_) {
      toast.error("Erro ao Enviar E-mail!");
    }
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className={style.trigger}>
          {" "}
          Esqueceu a senha?{" "}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className={style.overlay} forceMount />
          <Dialog.Content className={style.content} forceMount>
            <div className={style.heading}>
              <Dialog.Title>Insira o E-mail de Recuperação</Dialog.Title>
              <Dialog.Description>
                Informe o e-mail associado à sua conta para receber o link de
                redefinição de senha.
              </Dialog.Description>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={formStyle.formGroup}>
                <input
                  type="email"
                  placeholder="seu.email@gmail.com"
                  {...register("email", {
                    validate: (value) => validateEmail(value),
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <Button text={"Enviar"} typeButton={"submit"} color="bg-blue" />
                <Dialog.Close asChild>
                  <Button
                    text={"Cancelar"}
                    typeButton={"button"}
                    color="bg-red"
                    onClick={() => reset()}
                  />
                </Dialog.Close>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
