import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function HelpForm({ onSubmit, register, errors, success }) {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <div className={formStyle.formGroupTwo}>
        <input
          type="text"
          placeholder="Assunto"
          {...register("title", {
            validate: (value) =>
              value.trim() !== "" || "Insira um título válido.",
          })}
        />

        {errors.title && <p>{errors.title.message}</p>}

        <textarea
          placeholder="Digite a sua dúvida..."
          {...register("body", {
            validate: (value) =>
              value.trim() !== "" || "O preenchimento é obrigatório.",
          })}
        />
        {errors.body && <p>{errors.body.message}</p>}
      </div>
      <p className={globalcss.textComment}> {success} </p>
      <div className={formStyle.formButton}>
        <Button
          text={"Enviar Dúvida"}
          color="bg-blue"
          onClick={onSubmit}
        />
        <Button
          text={"Página de Contato"}
          onClick={() => navigate("/contato")}
        />
      </div>
    </form>
  );
}
