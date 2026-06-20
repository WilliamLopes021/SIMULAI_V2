import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import formStyle from "../../css/forms.module.css";

/**
 * Campo de senha reutilizável com botão de mostrar/ocultar.
 * Aceita todas as props de `react-hook-form` via spread (`{...register(...)}`).
 *
 * @param {string} placeholder - Texto de placeholder do input.
 * @param {string} id - ID do input, necessário para associar ao <label>.
 * @param {object} registration - Props retornadas por `register()` do react-hook-form.
 */
const PasswordInput = ({ placeholder = "******", id, registration = {} }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={formStyle.inputArea}>
      <input
        id={id}
        className={formStyle.formWidth}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        {...registration}
      />
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        {isVisible ? <VscEyeClosed /> : <VscEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
