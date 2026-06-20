import styles from "./Comment.module.css";
import RatingBox from "../RatingBox/RatingBox";

export default function Comment({ photoURL, name, rate, date, comment }) {
  return (
    <div className={styles.commentBox}>
      <div className={styles.heading}>
        <img src={photoURL} alt="Profile Image" />
        <div className={styles.commentInfo}>
          <h2 className={styles.name}>{name}</h2>
          <p>{date}</p>
        </div>
        <RatingBox rateNumber={rate} />
      </div>
      <p className={styles.commentText}>{comment}</p>
    </div>
  );
}
