import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <ul className={styles.resources}>
        <li> Produto </li>
        <li> Recursos </li>
        <li> Empresa </li>
      </ul>

      <div className={styles.socialMedia}>
        <span> 
          © 2025 Assistente de Entrevista com IA. Todos os direitos reservados.
        </span>
        <ul>
          <li> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={20}/></a></li>
          <li> <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter size={20}/></a></li>
          <li> <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20}/></a></li>
          <li> <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub size={20}/></a></li>
        </ul>
      </div>
    </footer>
  );
}
