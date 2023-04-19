import styles from './ingredients-card.module.css';
import {
    ConstructorElement,
    DragIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import PropTypes from "prop-types";
  import { PropTypeingredients } from '../../utils/data';

export const IngredientsCard = ({ ingredients }) => {

    return (
        <div className={styles.list} >
          {ingredients.map((ingredient) => (
            <li key={ingredient._id} className={styles.listItem}>
              <div className={styles.points}><DragIcon type={"primary"} /></div>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
          </div>
    )
}


IngredientsCard.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypeingredients.isRequired).isRequired,
  };
  