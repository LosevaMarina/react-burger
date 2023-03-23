import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

  const Ingredient = (props) => {
  return (
    <li className={styles.listItem} onClick={props.openModal}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={props.image} alt={props.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredientTitle} text text_type_main-default`}>{props.name}</p>
    </li>
  )
  }

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Ingredient;
