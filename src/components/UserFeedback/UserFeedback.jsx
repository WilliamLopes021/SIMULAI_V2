import styles from "./styles.module.css";

export default function UserFeedback({ name, feedback, imgUrl, position }) {
  return (
    <div className={styles.card}>
      <p className={styles.textComment}>{feedback}</p>
      <div className={styles.commentProfile}>
        <img src={imgUrl} alt="perfilImage" />
        <div className={styles.commentProfileText}>
          <b> {name} </b>
          <p> {position} </p>
        </div>
      </div>
    </div>
  );
}
