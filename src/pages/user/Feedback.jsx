import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth.jsx";
import { Link } from "react-router-dom";
import { getApprovedComments } from "../../api/services/commentService";
import userService from "../../api/services/userService";
import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import formStyle from "../../css/forms.module.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Comment from "../../components/Comment/Comment";
import RatingBox from "../../components/RatingBox/RatingBox";

export default function Feedback() {
  const [comments, setComments] = useState([]);
  const [rate, setRate] = useState(0);
  const [success, setSuccess] = useState("");

  const commentContainer = clsx(
    globalcss.commentContainer,
    globalcss.spacingPattern,
  );
  const formTitle = clsx(
    globalcss.textCenter,
    globalcss.poppinsSemibold,
    globalcss.accordionTitle,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { onChange: rhfOnChange, ...ratingProps } = register("rating", {
    valueAsNumber: true,
  });

  const { auth } = useAuth();

  const onSubmit = async (data) => {
    try {
      const body = { ...data, type: "Evaluation" };
      const id = auth?.user?.id;
      console.log(body);

      if (!id) {
        setSuccess(
          <>
            Você precisa ter uma{" "}
            <Link to="/cadastro" className={formStyle.link}>
              conta
            </Link>{" "}
            para realizar esta ação!
          </>,
        );
        return;
      }

      await userService.createComment(body, id);
      setSuccess(
        "Comentário foi realizado com sucesso e enviado para avaliação!",
      );
      reset();
      setRate(0);
    } catch (err) {
      console.log(err.message);
      setSuccess("Falha ao realizar comentário.");
    }
  };

  useEffect(() => {
    getApprovedComments().then(setComments);
  }, []);

  return (
    <>
      <Navbar />
      <div className={`${globalcss.mainContainer} ${globalcss.pageTopSpacing}`}>
        <div className={globalcss.centerElement}>
          <div className={formStyle.formContainerTwo}>
            <div className={formStyle.formHeadingTwo}>
              <h1 className={formTitle}>Compartilhe Seu Feedback</h1>
              <p>
                Sua opinião nos ajuda a melhorar. Por favor, conte-nos sobre sua
                experiência com o AI Interview Assistant.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={formStyle.formGroupTwo}>
                <input
                  type="text"
                  placeholder="Assunto do comentário"
                  {...register("title", {
                    validate: (value) =>
                      value.trim() !== "" || "Insira um título válido.",
                  })}
                />

                {errors.title && <p>{errors.title.message}</p>}

                <textarea
                  placeholder="Sua Mensagem de Feedback"
                  {...register("body", {
                    validate: (value) =>
                      value.trim() !== "" || "O preenchimento é obrigatório.",
                  })}
                />
                {errors.body && <p>{errors.body.message}</p>}

                <div className={formStyle.specialFormGroup}>
                  <input
                    type="hidden"
                    {...ratingProps}
                    value={rate}
                    onChange={() => {}}
                  />

                  <RatingBox
                    rateNumber={rate}
                    onChange={(value) => {
                      setRate(value);
                      rhfOnChange({
                        target: {
                          name: "rating",
                          value: value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <p className={globalcss.textComment}> {success} </p>
              <div className={formStyle.formButton}>
                <Button text="Enviar Feedback" color="bg-blue" size={"lg"} />
              </div>
            </form>
          </div>
        </div>

        <div className={commentContainer}>
          {comments.map((c, i) => (
            <Comment
              key={i}
              photoURL={
                "https://imgs.search.brave.com/WkPUusWdlbWaejdqvG5Q8DSJyx5Fh5c1VnFho_Fr5hk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzIwLzQwLzE1LzY1/LzM2MF9GXzIwNDAx/NTY1NjJfRzJmVW5N/OE9TdFNUSHpUVzRW/UEtDWVNXNEtpTHVZ/TXcuanBn"
              }
              name={c.name}
              rate={c.rating}
              date={c.createdAt}
              comment={c.body}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
