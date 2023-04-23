import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { INGREDIENT_CARD } from "../../services/actions/burger-ingredients";

export const Ingredient = ({ ingredient, onClick }) => {
  const { _id, image, price, name } = ingredient;

  const [, dragRef] = useDrag({
    type: INGREDIENT_CARD,
    item: ingredient,
  });

  return (
    //<li key={_id} className={styles.listItem} onClick={onClick} ref={dragRef}>
    <li
      key={_id}
      className={styles.listItem}
      onClick={() => onClick(ingredient)}
      ref={dragRef}
    >
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
