import { useState } from "react";
import { setInvitationalLink } from "../../utils/globalStore";
import * as Dialog from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../utils/validateEntries";
import mailService from "../../api/services/mailService";
import Button from "../Button/Button";
import formStyle from "../../css/forms.module.css";
import style from "../../css/modal.module.css";

export default function SendInviteModal({ isOpen = false, setOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (email) => {
    try {
      const data = await mailService.inviteManager(email);
      if (!data) {
        console.log(data)
        toast.error("E-mail não enviado. Falha interna.");
      } else {
        toast.success("E-mail enviado com sucesso!");
        setInvitationalLink({ data });
      }
    } catch (_) {
      toast.error("Erro ao Enviar E-mail!");
    }
  };
  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={style.overlay} forceMount />
          <Dialog.Content className={style.content} forceMount>
            <div className={style.heading}>
              <Dialog.Title>Insira o E-mail do novo Gerenciador.</Dialog.Title>
              <Dialog.Description>
                Informe um e-mail válido que não corresponda a nenhum outro
                administrador existente.
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
                    onClick={() => {
                      reset();
                      setOpen(false);
                    }}
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