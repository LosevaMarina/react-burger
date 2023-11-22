import { FC } from "react";
import styles from "../modal-overlay/modal-overlay.module.css";


type TModalOverlay = {
	closeModal: () => void;
}

export const ModalOverlay: FC<TModalOverlay> = (props) => {
  return <div className={styles.modalOverlay} onClick={props.closeModal}></div>;
};
