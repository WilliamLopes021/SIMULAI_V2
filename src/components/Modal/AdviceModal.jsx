import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import style from "../../css/modal.module.css";
import Button from "../Button/Button";

export default function AdviceModal({ isOpen }) {
  const list = clsx(style.spacingBottom, style.text);
  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={style.overlay} forceMount />
          <Dialog.Content className={style.content} forceMount>
            <div className={style.heading}>
              <Dialog.Title>Requisitos de uma senha segura. </Dialog.Title>
              <Dialog.Description>
                <p className={globalcss.poppinsSemiBold}>
                  A sua deverá conter no mínimo:
                </p>
                <br />
                <ul className={list}>
                  <li>Seis (6) caracteres.</li>
                  <li>Uma letra maiúscula.</li>
                  <li>Uma letra minúscula.</li>
                  <li>Um número.</li>
                  <li>Um símbolo (!@#$%¨&*())</li>
                </ul>
                <Dialog.Close asChild>
                  <Button
                    text={"Sair"}
                    color="bg-red"
                    size={"lg"}
                    typeButton={"button"}
                  />
                </Dialog.Close>
              </Dialog.Description>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
