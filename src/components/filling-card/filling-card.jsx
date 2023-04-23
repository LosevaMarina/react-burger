import styles from "./filling-card.module.css";

export const FillingCard = () => {
  return (
    <div className={styles.card}>
      <p className="text text_type_main-medium text_color_inactive">
        Собери начинку
      </p>
    </div>
  );
};
