import clsx from "clsx";
import globalcss from "../../css/global.module.css";
import style from "./MiniCard.module.css";

export default function MiniCard({
  Icon,
  title,
  text,
  size,
  iconColor = "#0048ADFF",
  iconSize = 24,
}) {
  const titleClass = clsx(globalcss.poppinsSemibold, style.title);
  const miniCard = clsx(style.miniCard, globalcss[size])
  return (
    <div className={miniCard}>
      <Icon size={iconSize} color={iconColor} />
      <p className={style.text}>
        <b className={titleClass}>{title}</b> <br />
        {text}
      </p>
    </div>
  );
}
