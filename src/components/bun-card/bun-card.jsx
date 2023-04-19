import styles from './bun-card.module.css';

export const BunCard = () => {
  return (
    <div className={styles.card}>
      <p className="text text_type_main-medium text_color_inactive">
        Выбери булку
      </p>
    </div>
  );
};
