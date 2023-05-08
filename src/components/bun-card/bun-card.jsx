import styles from "./bun-card.module.css";

export const BunCard = ({ style, activityChanged }) => {
  return (
    
    <div
      className={`${styles.card} ${
        style === "top" ? styles.card_top : styles.card_bottom
      }`}
    >
      <p className="text text_type_main-medium">Выбери булку</p>
    </div>
  );
};
