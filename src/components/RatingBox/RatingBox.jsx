import styles from "./RatingBox.module.css";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export default function RatingBox({ rateNumber, onChange }) {
  const starStyles = {
    itemShapes: Star,
    activeFillColor: "#FFD700",
    inactiveFillColor: "#c9c7bbff",
  };

  return (
    <div className={styles.rating}>
      <Rating
        value={rateNumber}
        onChange={onChange} 
        itemCount={5}
        itemStyles={starStyles}
        style={{ maxWidth: 140 }}
      />
    </div>
  );
}
