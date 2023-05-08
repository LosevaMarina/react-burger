import { useMemo } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { IngredientsCard } from "../ingredients-card/ingredients-card";
import { BunCard } from "../bun-card/bun-card";
import { useDispatch, useSelector } from "react-redux";
import {
  INGREDIENT_CARD,
  ADD_BUN_COUNTER,
  ADD_INGREDIENT_COUNTER,
} from "../../services/actions/burger-ingredients";
import { ADD_BUN } from "../../services/actions/burger-constructor";
import { createOrder } from "../../services/actions/order-details";
import { addIngredient } from "../../services/actions/burger-constructor";


export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );

  const { bunIngredient } = useSelector((state) => state.burgerConstructor);

  const Top = "top";

  const orderAmount = useMemo(() => {
    return (
      ingredients.reduce((acc, cur) => {
        if (cur.ingredient.price) {
          return acc + cur.ingredient.price;
        }
        return acc;
      }, 0) + (bunIngredient ? bunIngredient.price * 2 : 0)
    );
  }, [ingredients, bunIngredient]);

 

  
  const [, dropTargetRef] = useDrop({
    accept: INGREDIENT_CARD,
    drop(ingredient) {
      handleDrop(ingredient);
    },
  });

  function handleDrop(ingredient) {
    const { _id, type } = ingredient;
    switch (type) {
      case "bun": {
        dispatch({
          type: ADD_BUN_COUNTER,
          _id: _id,
        });
        dispatch({
          type: ADD_BUN,
          bunIngredient: ingredient,
        });
        break;
      }
      default: {
        dispatch({
          type: ADD_INGREDIENT_COUNTER,
          _id: _id,
        });
        dispatch(addIngredient(ingredient));
        break;
      }
    }
  }

  function handlePlaceOrder() {
    const orderIngredientIds = [
      bunIngredient._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bunIngredient._id,
    ];
    dispatch(createOrder(orderIngredientIds));
  }

 return (
    <section className={styles.block} ref={dropTargetRef}>
      <ul className={styles.listElements}>
        <li className={styles.element}>
          {bunIngredient && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bunIngredient.name} (верх)`}
              price={bunIngredient.price}
              thumbnail={bunIngredient.image}
            />
          )}
          {!bunIngredient && <BunCard style={Top} />}
        </li>

        <IngredientsCard ingredients={ingredients} /> 

        <li className={styles.element}>
          {bunIngredient && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bunIngredient.name} (низ)`}
              price={bunIngredient.price}
              thumbnail={bunIngredient.image}
            />
          )}
          {!bunIngredient && <BunCard style={!Top} />}
        </li>
      </ul>

      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">{orderAmount}</p>
          <div className={styles.subtract}></div>
        </div>

        <Button
          disabled={!bunIngredient}
          htmlType="button"
          type="primary"
          size="large"
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
