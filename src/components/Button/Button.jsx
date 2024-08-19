import styles from "./Button.module.css";

const Button = ({
  darkBtn = false,
  redBtn = false,
  text,
  onClick,
  buttonColor = null,
  textColor = null,
}) => {
  return (
    <div
      className={
        darkBtn ? styles.btn_dark : redBtn ? styles.btn_red : styles.btn_back
      }
      style={{ backgroundColor: buttonColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
