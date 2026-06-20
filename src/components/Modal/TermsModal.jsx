import * as Dialog from "@radix-ui/react-dialog";
import style from "../../css/modal.module.css";
import Button from "../Button/Button";
import globalcss from "../../css/global.module.css";

export default function ConfirmModal({ isOpen, setOpen }) {
  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={style.overlay} forceMount />
          <Dialog.Content className={style.contentTwo} forceMount>
            <div className={style.heading}>
              <Dialog.Title> Termos de Uso. </Dialog.Title>
              <Dialog.Description>
                <div className={style.termsContainer}>
                  <p>
                    Ao utilizar nosso aplicativo, você concorda automaticamente
                    com os termos descritos abaixo. Leia com atenção para
                    entender suas responsabilidades e os limites do serviço.
                  </p>

                  <h2> 1. Responsabilidade do Usuário </h2>
                  <p>- As informações fornecidas devem ser verdadeiras.</p>
                  <p>
                    - O usuário não deve usar o app para fins ilegais ou
                    ofensivos.
                  </p>

                  <h2> 2. Uso da Plataforma </h2>
                  <p>
                    Contas que violarem estes termos podem ser suspensas ou
                    encerradas para preservar a segurança e integridade do
                    sistema.
                  </p>

                  <h2> 3. Privacidade e Dados </h2>
                  <p>
                    Todos os dados são tratados conforme nossa Política de
                    Privacidade, incluindo coleta, armazenamento e proteção das
                    informações.
                  </p>
                </div>

                <Dialog.Close asChild>
                  <Button
                    text={"Voltar"}
                    color="bg-blue"
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
