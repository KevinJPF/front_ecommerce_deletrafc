import React, { useState, useRef, useEffect } from "react";
import styles from "./ComboBox.module.css";
import { MdOutlineChevronRight } from "react-icons/md";

const ComboBox = ({
  options,
  placeholder,
  label,
  isWrong = false,
  isMandatory = false,
  selecaoObrigatoria = true,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(""); // Valor digitado
  const [showDropdown, setShowDropdown] = useState(false); // Controle do dropdown
  const [filteredOptions, setFilteredOptions] = useState(options); // Opções filtradas
  const [selectedIndex, setSelectedIndex] = useState(-1); // Índice da opção selecionada
  const optionRefs = useRef([]); // Cria uma referência para cada item
  const inputRef = useRef(null);

  useEffect(() => {
    if (selectedIndex >= 0 && optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]); // Rola para o item selecionado

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Remove a acentuação tanto do valor digitado quanto das opções
  const normalizeString = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  useEffect(() => {
    const filtered = options.filter((option) =>
      normalizeString(option).includes(normalizeString(inputValue))
    );

    setFilteredOptions(filtered);
    setSelectedIndex(filtered.length > 0 ? 0 : -1); // Reseta o índice ao digitar algo novo
    onChange(inputValue);
  }, [inputValue]);

  const handleOptionClick = (option) => {
    setInputValue(option); // Seleciona a opção clicada
    setShowDropdown(false); // Fecha o dropdown
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      // Desce na lista
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // Sobe na lista
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if ((e.key === "Enter" || e.key === "Tab") && selectedIndex >= 0) {
      // Seleciona a opção quando "Enter" ou "Tab" é pressionado
      e.preventDefault(); // Evita que o "Tab" mova o foco para o próximo elemento
      setInputValue(filteredOptions[selectedIndex]);
      inputRef.current.blur(); // Tira o foco no input
    } else if (e.key === "Escape" && showDropdown) {
      inputRef.current.blur(); // Tira o foco no input
    }
  };

  return (
    <div className={styles.main_container}>
      {label && (
        <div className={styles.label_container}>
          {label && (
            <p
              className={styles.label}
              style={isWrong ? { color: "var(--red1)" } : null}
            >
              {label}
              {isMandatory ? " *" : ""}
            </p>
          )}
        </div>
      )}
      <div className={styles.dropdown_container}>
        <div className={styles.input_container}>
          <input
            className={`${styles.input_text} ${
              showDropdown && styles.input_expanded
            }`}
            type="text"
            label={label}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => {
              setShowDropdown(true);
            }}
            onKeyDown={handleKeyDown} // Adiciona o evento de teclado
            onBlur={() =>
              setTimeout(() => {
                setShowDropdown(false);

                if (selecaoObrigatoria) {
                  // Normaliza o valor digitado
                  const normalizedInputValue = normalizeString(
                    inputRef.current.value
                  );
                  // Encontra a opção correspondente na lista
                  const match = options.find(
                    (option) => normalizeString(option) === normalizedInputValue
                  );

                  if (match) {
                    // Se a opção estiver na lista, define o valor do input como o texto da lista correspondente
                    setInputValue(match);
                  } else {
                    // Se a opção não estiver na lista, limpa o valor do input
                    setInputValue("");
                  }
                }
              }, 200)
            }
            ref={inputRef}
          />
          <div
            className={`${styles.drop_button} ${
              showDropdown && styles.drop_button_open
            }`}
            onClick={() => {
              if (showDropdown) {
                setShowDropdown(false);
                inputRef.current.blur(); // Tira o foco no input
              } else {
                setShowDropdown(true);
                inputRef.current.focus(); // Define o foco no input
              }
            }}
          >
            <div
              className={`${styles.inner_icon} ${
                showDropdown && styles.inner_icon_open
              }`}
            >
              <MdOutlineChevronRight
                color={showDropdown ? "var(--gray1)" : "var(--white)"}
              />
            </div>
          </div>
        </div>
        {showDropdown && (
          <ul className={styles.list_container}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  ref={(el) => (optionRefs.current[index] = el)} // Armazena a referência
                  onMouseEnter={() => {
                    setSelectedIndex(index);
                  }}
                  onClick={() => handleOptionClick(option)}
                  className={`${styles.list_item} ${
                    index === selectedIndex && styles.active_item
                  }`} // Aplica o estilo ativo
                  style={
                    index === selectedIndex
                      ? {
                          backgroundColor: "var(--highlight)",
                          color: "var(--gray1)",
                        }
                      : null
                  }
                >
                  {option}
                </li>
              ))
            ) : (
              <li className={styles.list_item_not_found}>
                Nenhuma opção encontrada
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
