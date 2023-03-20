  import React, { useRef, useEffect } from 'react';
  import { createPortal } from "react-dom";
  import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
  import ModalOverlay from "../modal-overlay/modal-overlay";
  
  import styles from "./modal.module.css";
  
  
  function Modal(props) {
    const { openModal, onClose } = props;  
    const element = React.useMemo(() => document.createElement("div"), []);



    useEffect(() => {
      if (openModal) {
        document.body.appendChild(element);
        return () => {
            document.body.removeChild(element);
        };
      }
    });
  
    if (openModal) {
      return createPortal(
        <div
          className={styles.modal}
          onClick={onClose}
          style={{ overflow: "hidden" }}
        >
          
          <ModalOverlay>
          <div className={styles.content}>
          <button className={styles.buttonClose} type="button" onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            {props.children}
            </div>
          </ModalOverlay>      
        </div>,
        element
      );
    }
    return null;
  }
  
  export default Modal;
  