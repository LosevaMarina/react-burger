  import React, { useRef, useEffect } from 'react';
  import { createPortal } from "react-dom";
  import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
  import ModalOverlay from "../modal-overlay/modal-overlay";
  
  import styles from "./modal.module.css";
  
  
  function Modal(props) {
    const { openModal, onClose } = props;  
    const containerRef = useRef(document.createElement('div'));
    const container = containerRef.current;


    useEffect(() => {
      if (openModal) {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
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
            <button className={styles.buttonClose} type="button" onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            {props.children}
          </ModalOverlay>      
        </div>,
        container
      );
    }
    return null;
  }
  
  export default Modal;
  