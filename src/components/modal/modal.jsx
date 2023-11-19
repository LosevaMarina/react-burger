import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

export const Modal = (props) => {
  useEffect(() => {
    const closeESC = (e) => {
      if (e.key === "Escape") {
        props.closeModal();
      }
    };

    document.addEventListener("keydown", closeESC);

    return () => {
      document.removeEventListener("keydown", closeESC);
    };
  }, []);

  return createPortal(
    <>
      <div className={styles.content}>
        <button className={styles.buttonClose} onClick={props.closeModal}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.closeModal} />
    </>,
    document.getElementById("modals")
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};





{/*


import { useEffect, ReactNode, FC } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";



type TModal {
    closeModal: () => void;
    children?: ReactNode;
}

export const Modal: FC<IModal> = (props) => {

  useEffect(() => {
    const closeESC = (e) => {
      if (e.key === "Escape") {
        props.closeModal();
      }
    };

    document.addEventListener("keydown", closeESC);

    return () => {
      document.removeEventListener("keydown", closeESC);
    };
 // }, [props.closeModal]);
    }, [closeModal]);


  return createPortal(
    <>
      <div className={styles.content}>
        <button className={styles.buttonClose} onClick={props.closeModal}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
      <ModalOverlay closeModal={props.closeModal} />
    </>,
    document.getElementById("modals")
  );
};



*/}