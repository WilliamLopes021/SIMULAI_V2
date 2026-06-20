import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Accordion.module.css";
import globalcss from "../../css/global.module.css";

export default function Accordion({ question, answer }) {
  const [open, setOpen] = useState(false);
  const header = open
    ? clsx(globalcss.poppinsSemiBold, styles.header, styles.open)
    : clsx(globalcss.poppinsSemiBold, styles.header);
  const body = open ? styles.body : styles.buttonActive;
  const button = open ? styles.button : styles.button;

  return (
  <div className={styles.item}>
    <div className={styles.headerRow} onClick={() => setOpen(!open)}>
      <div className={header}>{question}</div>

      <button className={button}>
        {open ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
      </button>
    </div>

    <AnimatePresence>
      {open && (
        <motion.p
          className={styles.answer}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {answer}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

}
