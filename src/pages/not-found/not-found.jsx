import styles from "./not-found.module.css";

export const NotFound404 = () => {
  return (
    <section className={styles.content}>
      <h1 className={`text_type_main-large ${styles.text}`}>
        Усп, ошибка 404!
      </h1>
    </section>
  );
};
