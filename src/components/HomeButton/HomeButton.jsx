import styles from "./HomeButton.module.css";

const HomeButton = ({
  buttonText,
  buttonColor,
  buttonIcon,
  onClick,
  addButton = false,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.button_back} onClick={onClick}>
        <img className={styles.btn_icon} src={buttonIcon} alt="" />
      </div>

      {buttonText}
    </div>
  );
};

export default HomeButton;
