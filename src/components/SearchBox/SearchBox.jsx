import styles from './SearchBox.module.css';
import SearchIcon from '../../assets/search.svg';

export default function SearchBox({ placeholder = "Buscar...", disabled = false }) {
  return (
    <div className={styles.textbox}>
      <img src={SearchIcon} className={styles.left} alt="Search Icon" />
      <input type="search" placeholder={placeholder} disabled={disabled} />
    </div>
  );
}
