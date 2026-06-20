import { ProfileNav } from "./ProfileNav.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";
import Button from "../Button/Button.jsx";

export function NavOptions({ auth, userInfo, logout, navigate }) {
  if (auth) {
    return (
      <ProfileNav userInfo={userInfo} logout={logout} navigate={navigate} />
    );
  } else {
    return (
      <>
        <SearchBox placeholder="Procure dicas de entrevista..." />
        <Button
          text="Login"
          color="bg-white"
          onClick={() => navigate("/login")}
        />
        <Button
          text="Cadastre-se"
          color="bg-blue"
          onClick={() => navigate("/cadastro")}
        />
      </>
    );
  }
}
