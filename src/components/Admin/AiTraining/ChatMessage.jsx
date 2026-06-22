import styles from "../../../css/ia.module.css";

export default function ChatMessage({ role, content }) {
  const className = role === "user" ? styles.userMessage : styles.aiMessage;
  return (
    <div className={`${styles.chatMessage} ${className}`}>
      <p>{content}</p>
    </div>
  );
}
