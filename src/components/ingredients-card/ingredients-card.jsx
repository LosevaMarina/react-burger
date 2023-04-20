import styles from './ingredients-card.module.css';
  import PropTypes from "prop-types";
  import { PropTypeingredients } from '../../utils/data';
  import { IngredientCard } from '../ingredient-card/ingredient-card';

export const IngredientsCard = ({ ingredients }) => {
    return (
        <div className={styles.list} >
          {ingredients.map((ingredient, index) => {
            const { uuid } = ingredient;
            return (
              <IngredientCard ingredient={ingredient} index={index} key={uuid} /*key={ingredient} */>                
              </IngredientCard>
            )
            })}
          </div>
    )
}


IngredientsCard.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypeingredients.isRequired).isRequired,
  };