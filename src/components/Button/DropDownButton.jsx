import React, { useState } from "react";
import styles from "./DropDownButton.module.css";

function DropDownButton({ options, value, onChange, onClick }) {
  const [selectedOption, setSelectedOption] = useState(value || options[0]);

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    onChange(newOption);
  };

  return (
    <select
      className={styles.dropdown}
      value={selectedOption}
      onChange={handleOptionChange}
      onClick={onClick ?? null}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default DropDownButton;
