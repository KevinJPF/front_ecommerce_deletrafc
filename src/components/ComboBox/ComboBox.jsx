import React, { useState } from "react";
import styles from "./ComboBox.module.css";

const ComboBox = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn} onClick={handleToggle}>
        {value}{" "}
        <div className={!isOpen ? styles.arrowUp : styles.arrowDown}>
          <p>{">"}</p>
        </div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option, index) => (
            <button
              key={index}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
