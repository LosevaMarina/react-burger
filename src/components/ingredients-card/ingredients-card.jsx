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
      {ingredients.map((ingredient) => {
        return (
          <IngredientCard
             key={ingredient.cartId} 
            isLocked={false}
            item={ingredient.ingredient}
            id={ingredient.cartId}
          />
        );
      })}
    </div>
  );
};

IngredientsCard.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypeingredients.isRequired).isRequired,
};
