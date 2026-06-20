import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import styles from "./Card.module.css";

export default function Card({
  title,
  description,
  addInfo,
  Icon,
  display = 2,
  iconColor = "",
  iconType = "icon",
  align = "center",
  iconSize = 48,
  alterCard = false,
}) {
  let info;
  const cardDisplay = display == 2 ? styles.cardTwo : styles.card;
  const color = iconColor == "skyBlue" ? "#00BDD6FF" : "#0048ADFF";
  const cardAlignment =
    align === "left" ? clsx(cardDisplay, styles.leftAlign) : cardDisplay;

  let Content = Icon ? <Icon size={iconSize} color={color} /> : null;

  if (iconType === "img") {
    Content = <img src={Icon} className={styles.image} alt="Card image" />;
  }

  if (addInfo) {
    info = <p className={styles.fontColor}> {addInfo} </p>;
  }

  if (!alterCard) {
  return (
    <div className={clsx(cardAlignment, styles.cardRow)}>
      {/* lado esquerdo → conteúdo normal */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeading}>
          {Content}
        </div>
        <h2 className={globalcss.poppinsSemibold}>{title}</h2>
        <p>{description}</p>
      </div>

      {/* lado direito → form (addInfo) */}
      {info && <div className={styles.cardSide}>{info}</div>}
    </div>
  );

  } else {
    const titleClass = clsx(styles.alterCardMetric, globalcss.poppinsSemibold);

    return (
      <div className={styles.cardThree}>
        <div className={styles.alterHeading}>
          <p> {description[0]} </p>
          {<Icon size={iconSize} color={iconColor} />}
        </div>
        <div className={styles.spacing}>
          <h2 className={titleClass}> {title} </h2>
          {description[2] && <p> {description[2]}</p>}
        </div>
        <div className={styles.flexEnd}>
          <p>{description[1]}</p>
        </div>
      </div>
    );
  }
}