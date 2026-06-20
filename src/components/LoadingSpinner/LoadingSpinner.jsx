import timer from "../../assets/SandyLoading.gif";
import styles from "./LoadingSpinner.module.css";
import useLoading from "../../hooks/useLoading.js";

export default function LoadingSpinner() {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.spinner}>
      <img src={timer} alt="Carregando..." />
    </div>
  );
}
