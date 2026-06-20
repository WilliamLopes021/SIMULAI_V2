import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import validator from "validator";
import {
  validateAge,
  validateEmail,
  validateName,
} from "../../utils/validateEntries";
import adminService from "../../api/services/adminService";
import AdviceModal from "../../components/Modal/AdviceModal";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function ManagerRegister() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });

  const { uniqueid } = useParams();
  const navigate = useNavigate();

  const toggle = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const ShowPassword = ({ visible }) => {
    return visible ? <VscEyeClosed /> : <VscEye />;
  };

  const getQrCode = async () => {
    try {
      const data = await adminService.getAdminCode(uniqueid);
      if (data.success === true) {
        return data.data.qrcode;
      } else {
        navigate("/");
        toast.error("Permissão administrativa é necessária.");
      }
    } catch (err) {
      navigate("/");
      console.log(err.message);
      toast.error("Erro ao renderizar QRCODE.");
    }
  };

  const formContainer = clsx(globalcss.otherSpacing, formStyle.formContainer);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const { ...body } = data;
      const response = await adminService.createNewManager(body, uniqueid);
      console.log(response);
      if (response) {
        navigate("/login");
        toast.success("Conta administrativa criada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao criar conta administrativa.");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getQrCode().then(setQrcode);
  }, []);

  return (
    <>
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <header>
          <div className={formContainer}>
            <div className={formStyle.formHeadingTwo}>
              <h1 className={globalcss.poppinsBold}> Seja Bem Vindo! </h1>
              <p onClick={() => getQrCode()}>
                {" "}
                Você foi convidado a participar e interagir nas operações e
                serviços da empresa SimulAI. Realize o cadastro para conseguir
                ter acesso as funções administrativas. Lembre-se de utilizar as
                mesmas credenciais fornecidas no processo de seleção!
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={formStyle.formGroup}>
                <label htmlFor="name"> Nome completo </label>
                <input
                  type="text"
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
                <div className={formStyle.inputArea}>
                  <input
                    className={formStyle.formWidth}
                    type={show.confirm ? "text" : "password"}
                    placeholder="******"
                    name="password"
                    {...register("password", {
                      validate: (value) =>
                        validator.isStrongPassword(value) ||
                        "Senha muito fraca.",
                    })}
                  />
                  <div onClick={() => toggle("confirm")}>
                    <ShowPassword visible={show.confirm} />
                  </div>
                </div>

                {errors.password && (
                  <p
                    className={formStyle.linkTwo}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {" "}
                    {errors.password.message} <AdviceModal isOpen={isOpen} />
                  </p>
                )}
              </div>

              <div className={formStyle.formGroup}>
                <label htmlFor="passwordConfirm"> Confirmar Senha </label>
                <div className={formStyle.inputArea}>
                  <input
                    className={formStyle.formWidth}
                    type="password"
                    placeholder="******"
                    name="passwordConfirm"
                    {...register("passwordConfirm", {
                      validate: (value) =>
                        password === value || "Senhas não compatíveis.",
                    })}
                  />
                  <div onClick={() => toggle("password")}>
                    <ShowPassword visible={show.password} />
                  </div>
                </div>

                {errors.passwordConfirm && (
                  <p>{errors.passwordConfirm.message}</p>
                )}
                <div className={formStyle.formGroup}>
                  <label htmlFor="code">
                    {" "}
                    Insirao código fornecido pelo QRCODE{" "}
                  </label>
                  <input
                    type="number"
                    placeholder={"123456"}
                    name="code"
                    {...register("code", {
                      validate: (v) => v.length == 6 || "Código Inválido.",
                      required: true,
                    })}
                  />

                  {errors.code && <p>{errors.code.message}</p>}
                </div>

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
                  Eu concordo com os Termos de Serviço e Política de
                  Privacidade.
                </label>
                {errors.terms && <p> {errors.terms.message}</p>}
              </div>

              <Button
                text="Cadastre-se"
                color="bg-blue"
                size="lg"
                typeButton={"submit"}
              />
            </form>
          </div>
          <div className={globalcss.imgContainer}>
            <img
              src={qrcode}
              alt="Register Banner"
              className={globalcss.bannerImg}
            />
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
}
