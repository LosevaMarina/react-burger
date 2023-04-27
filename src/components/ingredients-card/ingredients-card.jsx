import styles from "./ingredients-card.module.css";
import PropTypes from "prop-types";
import { PropTypeingredients } from "../../utils/data";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { FillingCard } from "../filling-card/filling-card";

export const IngredientsCard = ({ ingredients }) => {
  return ingredients.length === 0 ? (
    <div className={styles.list}>
      <FillingCard />
    </div>
  ) : (
    <div className={styles.list}>
      {ingredients.map((item, index) => {
        return (
          <IngredientCard item={item.ingredient} index={index} key={item.key} />
        );
      })}
    </div>
  );
};

IngredientsCard.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypeingredients.isRequired).isRequired,
};
