import styles from "./styles.module.css";

function Button({message, onClick, primary, size, disabl=false, color}) {
    
  const priCol = `Button__primary__${color}`;
  const secCol = `Button__secondary__${color}`;

  return (
    <button 
      className={
        `
        ${styles.Button} 
        ${primary ? styles.Button__primary : styles.Button__secondary} 
        ${size === "sm" ? styles.Button__sm : styles.Button__md}
        ${primary ? color && styles[priCol] : color && styles[secCol]}
        `
      } 
      onClick={onClick} 
      disabled={disabl}>{message}
    </button>
  );
}

export default Button;