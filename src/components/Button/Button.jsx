import styles from "./Button.module.css";
import clsx from "clsx";

const Button = ({
  text,
  onClick,
  size,
  typeButton,
  value,
  color = "bg-white",
  disable = false,
}) => {
  let buttonSize = size ? size : "";
  const classes = clsx(styles.button, styles[color], styles[buttonSize]);

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disable}
      type={typeButton}
      value={value}
    >
      {text}
    </button>
  );
};

export default Button;
