
import styles from "./page.module.css";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const Page = () => {
  return (
    <section className={styles.content}>
      <div className={styles.page}>
      <IngredientDetails />
        </div>
    </section>
  );
};
