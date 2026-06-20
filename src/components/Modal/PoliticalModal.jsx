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
          <Dialog.Content className={style.contentThree} forceMount>
            <div className={style.heading}>
              <Dialog.Title> Política de Privacidade. </Dialog.Title>
              <Dialog.Description>
                <div className={style.politicalContent}>
                  <p>
                    A sua privacidade é prioridade para nós. Este documento
                    descreve como coletamos, utilizamos, armazenamos e
                    protegemos seus dados durante o uso do aplicativo. Ao
                    continuar utilizando nossos serviços, você declara estar
                    ciente e de acordo com as práticas descritas nesta política.
                  </p>

                  <h2>1. Coleta de Dados</h2>
                  <p>
                    Coletamos apenas informações essenciais para o funcionamento
                    do app, tais como:
                  </p>
                  <ul className={style.list}>
                    <li>Dados fornecidos pelo usuário.</li>
                    <li>Dados de uso do aplicativo.</li>
                    <li>Histórico de entrevistas.</li>
                    <li>
                      Nenhum dado sensível é coletado sem sua autorização.
                    </li>
                  </ul>
                  <h2> 2. Uso das Informações</h2>
                  <p>Os dados coletados são utilizados exclusivamente para:</p>
                  <ul>
                    <li>Melhorar sua experiência</li>
                    <li>Personalizar recomendações.</li>
                    <li>Garantir segurança e funcionamento adequado.</li>
                  </ul>

                  <h2> 3. Compartilhamento de Dados</h2>
                  <p>Não vendemos nem compartilhamos suas informações.</p>

                  <ul>
                    <li>Somente poderemos compartilhar dados se:</li>
                    <ul>
                      <li>
                        Houver exigência legal; For necessário para garantir a
                        segurança da plataforma.
                      </li>
                    </ul>
                  </ul>

                  <h2> 4. Armazenamento e Segurança</h2>
                  <p>
                    Utilizamos tecnologias modernas para proteger seus dados
                    contra acesso não autorizado, perda ou modificação.
                  </p>

                  <h2> 5. Direitos do Usuário </h2>
                  <p> Como usuário você têm o direito de: </p>
                  <ul>
                    <li>Solicitar exclusão dos dados.</li>
                    <li>Pedir esclarecimentos.</li>
                    <li>Solicitar acesso.</li>
                    <li>Corrigir informações.</li>
                  </ul>

                  <h2> 6. Alterações na Política</h2>
                  <p>
                    A Política pode ser atualizada periodicamente, sempre
                    divulgada no app.
                  </p>
                  <h2> 7. Contato </h2>
                  <p>
                    Em caso de dúvidas, utilize o suporte dentro do aplicativo.
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
