import React from "react";
import InputMask from "react-input-mask";
import styles from "./InputText.module.css"; // Se você tiver um arquivo CSS para os estilos

const InputText = ({
  label,
  placeholder,
  onChange,
  value,
  isPassword = false,
  isWrong = false,
  isMandatory = false,
  mask = "",
  onlyNumbers = false,
  onBlur = () => {},
}) => {
  // Função para permitir apenas números
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (onlyNumbers) {
      // Remove qualquer caractere que não seja número
      const numericValue = inputValue.replace(/\D/g, "");
      onChange(numericValue);
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className={styles.container}>
      <p style={isWrong ? { color: "var(--red1)" } : null}>
        {label}
        {isMandatory ? " *" : ""}
      </p>
      {mask ? (
        // Usando InputMask quando uma máscara for fornecida
        <InputMask
          mask={mask}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type={isPassword ? "password" : "text"}
              style={
                isWrong
                  ? { borderColor: "var(--red1)", color: "var(--red1)" }
                  : null
              }
            />
          )}
        </InputMask>
      ) : (
        // Input padrão, sem máscara
        <input
          type={isPassword ? "password" : "text"}
          style={
            isWrong
              ? { borderColor: "var(--red1)", color: "var(--red1)" }
              : null
          }
          placeholder={placeholder}
          onChange={handleInputChange}
          value={value}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default InputText;
