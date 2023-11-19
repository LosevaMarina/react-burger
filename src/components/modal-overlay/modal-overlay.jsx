import PropTypes from "prop-types";
import styles from "../modal-overlay/modal-overlay.module.css";

const ModalOverlay = (props) => {
  return <div className={styles.modalOverlay} onClick={props.closeModal}></div>;
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;



{/*




import { FC } from "react";
import styles from "../modal-overlay/modal-overlay.module.css";


type TModalOverlay = {
	closeModal: () => void;
}

export const ModalOverlay: FC<TModalOverlay> = (props) => {
  return <div className={styles.modalOverlay} onClick={props.closeModal}></div>;
};






*/}