import validator from "validator";

export function validateName(name) {
  const trimmed = validator.trim(name);

  if (trimmed === "") {
    return "O nome é obrigatório.";
  }

  if (!validator.isAlpha(trimmed, "pt-BR", { ignore: " " })) {
    return "O nome deve conter apenas letras.";
  }

  if (trimmed.length < 3) {
    return "O nome deve ter pelo menos 3 caracteres.";
  }

  return true; // válido
}

export function validateAge(age) {
  const isInteger = validator.isInt(String(age));
  const isInRange = age > 13 && age < 120;

  if (!isInteger || !isInRange) {
    return "Idade inválida.";
  }

  return true;
}

export function validateEmail(email) {
  const trimmedMail = validator.trim(email);

  if (trimmedMail === "") {
    return "E-mail é obrigatório.";
  }

  if (!validator.isEmail(trimmedMail)) {
    return "E-mail inválido.";
  }

  return true;
}
