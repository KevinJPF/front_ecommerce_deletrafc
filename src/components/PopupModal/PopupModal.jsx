import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./PopupModal.module.css";
import Button from "../Button/Button";
const PopupModal = ({ isOpen, children, title, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} id="modal-popup">
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h2>{title}</h2>
        </div>
        <div className={styles.modal_body}>
          <div className={styles.modal_content}>{children}</div>
        </div>
        <div className={styles.buttons_container}>
          <Button text={"Cancelar"} darkBtn={true} onClick={onCancel} />
          <Button text={"Confirmar"} onClick={onConfirm} />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PopupModal;
