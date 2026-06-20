import { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import validator from "validator";
import registerBanner from "../../assets/celebero.png";
import {
  validateAge,
  validateEmail,
  validateName,
} from "../../utils/validateEntries";
import AdviceModal from "../../components/Modal/AdviceModal";
import TermsModal from "../../components/Modal/TermsModal";
import PoliticalModal from "../../components/Modal/PoliticalModal";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

export default function Register() {
  const [political, setPolitical] = useState(false);
  const [terms, setTerms] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { create } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    await create(data);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={globalcss.mainContainer}>
        <header>
          <div className={globalcss.imgContainer}>
            <img
              src={registerBanner}
              alt="Register Banner"
              className={globalcss.bannerImg}
            />
          </div>
          <div className={formStyle.formContainer}>
            <div className={formStyle.formHeading}>
              <h1 className={globalcss.poppinsBold}> Crie sua Conta</h1>
              <p>Junte-se ao SimulAi para preparar sua próxima entrevista.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={formStyle.formGroup}>
                <label htmlFor="name"> Nome completo </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome Completo"
                  {...register("name", {
                    validate: (value) => validateName(value),
                  })}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div className={formStyle.formGroup}>
                <label htmlFor="email"> E-mail </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  name="email"
                  {...register("email", {
                    validate: (value) => validateEmail(value),
                  })}
                />
                {errors.email && <p> {errors.email.message}</p>}
              </div>

              <div className={formStyle.formGroup}>
                <label htmlFor="age"> Idade </label>
                <input
                  id="age"
                  type="number"
                  placeholder="Sua idade"
                  name="age"
                  {...register("age", {
                    validate: (value) => validateAge(value),
                  })}
                />
                {errors.age && <p> {errors.age.message}</p>}
              </div>

              <div className={formStyle.formGroup}>
                <label htmlFor="password"> Senha </label>
                <PasswordInput
                  id="password"
                  placeholder="******"
                  registration={register("password", {
                    validate: (value) =>
                      validator.isStrongPassword(value) || "Senha muito fraca.",
                  })}
                />
                {errors.password && (
                  <p
                    className={formStyle.linkTwo}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {errors.password.message} <AdviceModal isOpen={isOpen} />
                  </p>
                )}
              </div>

              <div className={formStyle.formGroup}>
                <label htmlFor="passwordConfirm"> Confirmar Senha </label>
                <PasswordInput
                  id="passwordConfirm"
                  placeholder="******"
                  registration={register("passwordConfirm", {
                    validate: (value) =>
                      password === value || "Senhas não compatíveis.",
                  })}
                />
                {errors.passwordConfirm && (
                  <p>{errors.passwordConfirm.message}</p>
                )}
              </div>

              <div className={formStyle.formCheckBox}>
                <input
                  type="checkbox"
                  name="terms"
                  {...register("terms", {
                    required: "Você deve aceitar os termos para continuar.",
                  })}
                />

                <label htmlFor="terms" className={formStyle.advice}>
                  Eu concordo com os{" "}
                  <u
                    onClick={() => setTerms(!terms)}
                    className={formStyle.trigger}
                  >
                    Termos de Serviço
                  </u>{" "}
                  e{" "}
                  <u
                    onClick={() => setPolitical(!political)}
                    className={formStyle.trigger}
                  >
                    Política de Privacidade.
                  </u>
                </label>
                <TermsModal isOpen={terms} setOpen={setTerms} />
                <PoliticalModal isOpen={political} setOpen={setPolitical} />
                {errors.terms && <p> {errors.terms.message}</p>}
              </div>

              <Button
                text="Cadastre-se"
                color="bg-blue"
                size="lg"
                typeButton={"submit"}
              />
            </form>

            <p className={formStyle.formFooter}>
              Já tem conta?{" "}
              <Link to={"/login"} className={formStyle.link}>
                {" "}
                Faça Login aqui{" "}
              </Link>
            </p>
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
}
