import styles from "./bun-card.module.css";
import { FC } from "react";

interface IBunCard {
  style: string 
}

  export const BunCard: FC<IBunCard> = (props) => {
  return (
    
    <div
      className={`${styles.card} ${
        props.style === "top" ? styles.card_top : styles.card_bottom
      }`}
    >
      <p className="text text_type_main-medium">Выбери булку</p>
    </div>
  );
};
