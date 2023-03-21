import styles from "../modal-overlay/modal-overlay";

const ModalOverlay = (props) => {
  return (
    <div className={styles.modalOverlay} onClick={(e) => e.stopPropagation()}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;
