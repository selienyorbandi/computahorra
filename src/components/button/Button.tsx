import styles from "./styles.module.css";

interface BtnProps {
  message: string;
  onClick?: () => void;
  size?: string;
  disabl?: boolean;
  type: string;
}

function Button({ message, onClick, size, disabl = false, type = "secondary" }: BtnProps) {
  const handleBtnTypeStyle = () => {
    let btnColors = {};
    switch (type) {
      case "primary":
        return (btnColors = {
          background: "var(--primary-color)",
        });
      case "secondary":
        return (btnColors = {
          background: "var(--light-color)",
          border: "solid 1px var(--primary-color)",
          color: "var(--primary-color)",
        });
      case "success":
        return (btnColors = {
          background: "var(--success-color)",
        });
      case "danger":
        return (btnColors = {
          background: "var(--danger-color)",
        });
      case "warning":
        return (btnColors = {
          background: "var(--warning-color)",
        });
      default:
        return btnColors;
    }
  };
  return (
    <button
      className={`
        ${styles.Button} 
        ${size === "sm" ? styles.Button__sm : styles.Button__md}
        `}
      onClick={onClick}
      disabled={disabl}
      style={handleBtnTypeStyle()}>
      {message}
    </button>
  );
}

export default Button;
