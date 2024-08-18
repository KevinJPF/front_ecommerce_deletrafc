import styles from "./Form.module.css";
import Button from "../Button/Button";

const Form = ({ title, children, onClickCancel, onClickSave = null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>{title}</div>
      <div className={styles.content_container}>{children}</div>
      <div className={styles.buttons_container}>
        <Button text={"Voltar"} darkBtn={true} onClick={onClickCancel} />
        {onClickSave && (
          <>
            <div style={{ width: "8px" }} />
            <Button text={"Salvar"} onClick={onClickSave} />
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
