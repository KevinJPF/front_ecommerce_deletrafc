import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./PopupModal.module.css";
const PopupModal = ({
  isOpen,
  children,
  title,
  onClose,
  hasButtons,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} id="modal-popup">
      <div className={styles.modal}>
        <div className={styles.modal_header}>{title}</div>
        <div className={styles.modal_body}>
          <div className={styles.modal_content}>{children}</div>
        </div>
        <div className={styles.buttons_container}>
          <div className="btn dark" onClick={onCancel}>
            Cancelar
          </div>
          <div className="btn" onClick={onConfirm}>
            Confirmar
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default PopupModal;
