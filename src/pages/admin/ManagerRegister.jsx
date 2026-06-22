import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import adminService from "../../api/services/adminService";
import Footer from "../../components/Footer/Footer";
import ManagerRegisterForm from "../../components/Admin/Manager/ManagerRegisterForm";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function ManagerRegister() {
  const [qrcode, setQrcode] = useState("");
  const { uniqueid } = useParams();
  const navigate = useNavigate();

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

            <ManagerRegisterForm uniqueid={uniqueid} />
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
