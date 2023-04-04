import styles from "../ingredient-details/ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {
  return (
    <>
      <div className={styles.title}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <div className={styles.conteiner}>
        <img
          src={props.ingredient.image}
          alt={props.ingredient.name}
          className={styles.image}
        />
        <p className="text text_type_main-medium">{props.ingredient.name}</p>
        <ul className={styles.lists}>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredient.calories / 10}
            </p>
          </li>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredient.proteins / 10}
            </p>
          </li>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredient.fat / 10}
            </p>
          </li>
          <li className={styles.list}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {props.ingredient.carbohydrates / 10}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.string,
  proteins: PropTypes.string,
  fat: PropTypes.string,
  carbohydrates: PropTypes.string,
};

export default IngredientDetails;
