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
    globalcss.spacingPattern
  );
  const formTitle = clsx(
    globalcss.textCenter,
    globalcss.poppinsSemibold,
    globalcss.accordionTitle
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
          </>
        );
        return;
      }

      await userService.createComment(body, id);
      setSuccess(
        "Comentário foi realizado com sucesso e enviado para avaliação!"
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
                "data:image/jpeg;base64,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"
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
