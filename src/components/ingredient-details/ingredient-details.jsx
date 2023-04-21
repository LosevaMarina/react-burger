import styles from "../ingredient-details/ingredient-details.module.css";
import { useSelector } from "react-redux";

export const IngredientDetails = () => {


  const { ingredient } = useSelector(
    (state) => state.ingredientDetails
  );

  const { name, calories, carbohydrates, fat, proteins, image } =
  ingredient;

  return (
    <>
      <div className={styles.title}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <div className={styles.conteiner}>
        <img
          src={image}
          alt={name}
          className={styles.image}
        />
        <p className="text text_type_main-medium">{name}</p>
        <ul className={styles.lists}>

          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {calories / 10}
            </p>
          </li>

          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {proteins / 10}
            </p>
          </li>

          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {fat / 10}
            </p>
          </li>

          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {carbohydrates / 10}
            </p>
          </li>

        </ul>
      </div>
    </>
  );
};

