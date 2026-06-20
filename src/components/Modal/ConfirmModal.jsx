import * as Dialog from "@radix-ui/react-dialog";
import globalcss from "../../css/global.module.css";
import style from "../../css/modal.module.css";
import Button from "../Button/Button";

/**
 * Modal genérico de confirmação de ação destrutiva.
 * A lógica da ação é de responsabilidade do componente pai via `onConfirm`.
 *
 * @param {boolean} isOpen - Controla visibilidade do modal.
 * @param {function} setOpen - Função para fechar o modal.
 * @param {function} onConfirm - Callback chamado ao confirmar a ação.
 */
export default function ConfirmModal({ isOpen, setOpen, onConfirm }) {
  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={style.overlay} forceMount />
          <Dialog.Content className={style.content} forceMount>
            <div className={style.heading}>
              <Dialog.Title> ATENÇÃO </Dialog.Title>
              <Dialog.Description>
                <p className={globalcss.poppinsSemiBold}>
                  Essa ação implicará na deleção <b>PERMANENTE</b> do administrador
                  selecionado. Deseja continuar?
                </p>
                <br />
                <Button
                  text={"Confirmar"}
                  color="bg-blue"
                  size={"lg"}
                  typeButton={"button"}
                  onClick={onConfirm}
                />
                <Dialog.Close asChild>
                  <Button
                    text={"Cancelar"}
                    color="bg-red"
                    size={"lg"}
                    typeButton={"button"}
                    onClick={() => setOpen(false)}
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
