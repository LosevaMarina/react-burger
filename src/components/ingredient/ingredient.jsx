import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { Link, useLocation } from "react-router-dom";

export const Ingredient = ({ ingredient, onClick }) => {


  const location = useLocation();
  const { image, price, name, } = ingredient;

  const [{isDragging}, dragRef] = useDrag({
    type: "INGREDIENT_CARD",
    item: {...ingredient},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
  return (
    /*<li
      key={ingredient._id} 
      className={styles.listItem}
      onClick={() => onClick(ingredient)}
      ref={dragRef}
      style={{ border: isDragging ? "1px solid #2f2f37" : "0px" }}
    >*/

    
    <Link
      key={ingredient._id} 
      className={styles.listItem}
      onClick={() => onClick(ingredient)}
      ref={dragRef}
      style={{ border: isDragging ? "1px solid #2f2f37" : "0px" }}
      // динамический путь для ингредиента
      to={`/ingredients/${ingredient._id}`}
      //сохраняем в свойство background роут, на котором была открыта модалка
      state={{ background: location }}
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
      
    </Link>


/*</li>*/
  );
};