import Button from "../Button/Button";
import formStyle from "../../css/forms.module.css";
import { validateName, validateEmail } from "../../utils/validateEntries";

export default function ContactForm({ onSubmit, register, errors }) {
  return (
    <form action="post" onSubmit={onSubmit}>
      <div className={formStyle.formGroup}>
        <input
          type="text"
          placeholder="Seu Nome Completo"
          {...register("completeName", {
            validate: (value) => validateName(value),
          })}
        />
        {errors.completeName && <p>{errors.completeName.message}</p>}

        <input
          type="text"
          placeholder="Seu E-mail"
          {...register("email", {
            validate: (value) => validateEmail(value),
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Assunto"
          {...register("subject", {
            validate: (value) => value.trim() !== "" || "Insira o assunto.",
          })}
        />
        {errors.subject && <p>{errors.subject.message}</p>}

        <textarea
          type="text"
          className={formStyle.textArea}
          placeholder="Sua Mensagem..."
          {...register("message", {
            validate: (value) => value.trim() !== "" || "Mensagem inválida.",
          })}
        />
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <Button text="Enviar Mensagem" color="bg-blue" size={"lg"} />
    </form>
  );
}
