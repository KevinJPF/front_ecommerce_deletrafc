import styles from "./InputText.module.css";

const InputText = ({
  label,
  placeholder,
  onChange,
  value,
  isPassword = false,
}) => {
  return (
    <div className={styles.container}>
      <p>{label}</p>
      <input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputText;
