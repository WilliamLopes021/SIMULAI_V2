import { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEntries";
import { setManagerId } from "../../utils/globalStore";
import toast from "react-hot-toast";
import validator from "validator";
import bannerLoginn from "../../assets/image.png";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import MailModal from "../../components/Modal/MailModal";
import AuthenticatorModal from "../../components/Modal/AuthenticatorModal";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

export default function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const tk = await login(data);

      if (tk.message) {
        const message = tk.message.split("/");
        if (message[3] === "admin") {
          setManagerId(message[5]);
          setIsModalOpen(true);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Erro ao efetuar login.");
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={globalcss.mainContainer}>
        <header>
          <div className={globalcss.imgContainer}>
            <img
              src={bannerLoginn}
              alt="Login Banner"
              className={globalcss.bannerImg}
            />
          </div>
          <div className={formStyle.formContainer}>
            <div className={formStyle.formHeading}>
              <h1 className={globalcss.poppinsBold}> Bem-vindo de Volta!</h1>
              <p>Acesse sua conta para continuar sua jornada de preparação.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={formStyle.formGroup}>
                <label htmlFor="email"> E-mail </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  {...register("email", {
                    validate: (value) => validateEmail(value),
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className={formStyle.formGroup}>
                <div className={formStyle.spacing}>
                  <label htmlFor="password"> Senha </label>
                  <label>
                    <MailModal />
                  </label>
                </div>

                <PasswordInput
                  id="password"
                  placeholder="******"
                  registration={register("password", {
                    validate: (value) =>
                      validator.isStrongPassword(value) || "Senha Inválida.",
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <div className={formStyle.formButton}>
                <Button text="Entrar" color="bg-blue" size="lg" />
              </div>
            </form>
            <div className={formStyle.formFooter}>
              <p>Não tem uma conta?</p>
              <p>
                <Link to={"/cadastro"} className={formStyle.link}>
                  Cadastrar
                </Link>
              </p>
            </div>
            <AuthenticatorModal isOpen={isModalOpen} />
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
}
