import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

const Ingredient = ({ ingredient, onClick }) => {
  const { _id, image, price, name } = ingredient;
  return (
    <li key={_id} className={styles.listItem} onClick={onClick}>
      {0 < ingredient.counter && (
          <Counter count={ingredient.counter} size="default" extraClass="m-1" />
        )}
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredientTitle} text text_type_main-default`}>
        {name}
      </p>
    </li>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Ingredient;
