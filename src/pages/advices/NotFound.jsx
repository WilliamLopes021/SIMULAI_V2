import clsx from "clsx";
import banner from "../../assets/banner404.png";
import { useNavigate } from "react-router-dom";
import style from "../../css/verification.module.css";
import globalcss from "../../css/global.module.css";
import Button from "../../components/Button/Button";

export default function NotFound() {
  const navigate = useNavigate();

  const title = clsx(globalcss.poppinsBold, style.title);
  const subTitle = clsx(globalcss.poppinsSemiBold, style.subtitle);

  return (
    <>
      <div className={style.container}>
        <div className={style.cardTwo}>
          <h1 className={title}>Página não encontrada.</h1>
          <div className={style.imgContainer}>
            <img src={banner} alt="Page was not found." />
            <Button
              text={"Retornar à página principal."}
              onClick={() => {
                navigate("/");
              }}
              color="bg-blue"
            />
          </div>
        </div>
      </div>
    </>
  );
}
