import styles from "./Navbar.module.css";
import Button from "../Button/Button.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

export const ProfileNav = ({ userInfo, logout, navigate }) => {
  return (
    <>
      <SearchBox placeholder="Procure dicas de entrevista..." />

      <div className={styles.userInfoBox}>
        <p className={styles.userInfoDisplay}>{userInfo.nome || "Usuario"}</p>
        <p className={styles.userInfoDisplay}>
          {userInfo.email || "usuario@gmail.com"}
        </p>
      </div>

      <Button
        text="Sair"
        color="bg-red"
        onClick={() => {
          logout();
          navigate("/");
        }}
      />
    </>
  );
};
