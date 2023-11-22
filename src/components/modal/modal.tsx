import { useEffect, ReactNode, FC } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";



type TModal = {
    closeModal: () => void;
    children?: ReactNode;
}

export const Modal: FC<TModal> = (props) => {

  useEffect(() => {
    const closeESC = (e: any) => {
      if (e.key === "Escape") {
        props.closeModal();
      }
    };

    document.addEventListener("keydown", closeESC);

    return () => {
      document.removeEventListener("keydown", closeESC);
    };
  }, [props.closeModal]);
   // }, [closeModal]);


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
    document.getElementById("modals") as HTMLElement 
  );
};


