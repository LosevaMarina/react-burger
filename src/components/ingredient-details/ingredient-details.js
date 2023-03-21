import styles from "../ingredient-details/ingredient-details.module.css";

const IngredientDetails = ({ state }) => {
  return (
    <>
      <div className={styles.title}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <div className={styles.conteiner}>
        <img src={state.image} alt={state.name} className={styles.image} />
        <p className="text text_type_main-medium mt-4">{state.name}</p>
        <ul className={styles.lists}>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {state.calories / 10}
            </p>
          </li>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {state.proteins / 10}
            </p>
          </li>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {state.fat / 10}
            </p>
          </li>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {state.carbohydrates / 10}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IngredientDetails;
