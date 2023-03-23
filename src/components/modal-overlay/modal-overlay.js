import PropTypes from "prop-types";
import styles from "../modal-overlay/modal-overlay";


const ModalOverlay = (props) => {

  return (
    <div className={styles.overlay} onClick={props.closeModal} >
    </div>
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;


