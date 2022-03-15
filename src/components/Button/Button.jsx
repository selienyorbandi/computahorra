import styles from "./styles.module.css";

function Button({message, onClick, primary, size}) {
    
  return (
    <button className={`${styles.Button} ${primary ? styles.Button__primary : styles.Button__secondary} ${size === "sm" ? styles.Button__sm : styles.Button__md}`} onClick={onClick}>{message}</button>
  );
}

export default Button;