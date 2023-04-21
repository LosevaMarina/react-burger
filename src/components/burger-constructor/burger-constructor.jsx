import React, { useState, useContext, useReducer, useEffect, useMemo } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { IngredientsContext } from "../../services/ingredientsContext";
import { API_URL } from "../../utils/config";
import { request } from "../../utils/utils";


import { useDrop } from "react-dnd";
import { IngredientsCard } from '../ingredients-card/ingredients-card';
import { BunCard } from '../bun-card/bun-card';
import { useDispatch, useSelector } from "react-redux";
import { INGREDIENT_CARD, ADD_BUN_COUNTER, ADD_INGREDIENT_COUNTER } from '../../services/actions/burger-ingredients';
import { ADD_INGREDIENT, ADD_BUN } from '../../services/actions/burger-constructor';

{/*const BurgerConstructor = () => {
  const [modalActive, setModalActive] = useState(false);
  const { ingredients } = useContext(IngredientsContext);
  const [orderNumber, setOrderNumber] = useState({});

  const bunIngredients = ingredients.filter((item) => {
    return item.type === "bun";
  });
  const otherIngredients = ingredients.filter((item) => {
    return item.type !== "bun";
  });

  const openModal = () => {
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const onClick = () => {
    request(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients.map((ingredient) => ingredient._id),
      }),
    })
      .then((data) => {
        setOrderNumber(data);
        openModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // начальное значение стейта
  const initialState = { count: 0 };

  // функция-редьюсер
  // изменяет состояния в зависимости от типа переданного action
  function reducer(state, action) {
    switch (action.type) {
      case "calculate":
        return {
          count:
            otherIngredients.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price,
              0
            ) +
            bunIngredients.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price,
              0
            ),
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // при вызове dispatch достаточно указать тип действия
    dispatch({ type: "calculate" });
  }, [ingredients]);

  return (
    <section className={styles.block}>
      {modalActive && (
        <Modal closeModal={closeModal}>
          <OrderDetails order={orderNumber} />
        </Modal>
      )}

      <ul className={styles.listElements}>
        <li className={styles.element}>
          <ConstructorElement
            type="top"
            key={bunIngredients[0]._id}
            isLocked={true}
            text={`${bunIngredients[0].name} (верх)`}
            price={bunIngredients[0].price}
            thumbnail={bunIngredients[0].image}
          />
        </li>
        <div className={styles.list}>
          {otherIngredients.map((ingredient) => (
            <li key={ingredient._id} className={styles.listItem}>
              <div className={styles.points}></div>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </div>
        <li className={styles.element}>
          <ConstructorElement
            type="bottom"
            key={bunIngredients[0]._id}
            isLocked={true}
            text={`${bunIngredients[0].name} (низ)`}
            price={bunIngredients[0].price}
            thumbnail={bunIngredients[0].image}
          />
        </li>
      </ul>
      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">{state.count}</p>
          <div className={styles.subtract}></div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
*/}


export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const Top = "top";
  

 const { bunIngredient } = useSelector((state) => state.burgerConstructor);
 const orderAmount = useMemo(() => {
  return (
    ingredients.reduce((acc, cur) => {
      if (cur.price) {
        return acc + cur.price;
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
      dispatch({
        type: ADD_INGREDIENT,
        ingredient
      });
      break;
    }
  }
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
        {!bunIngredient && <BunCard style = {Top}/>}

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
        {!bunIngredient && <BunCard style= {!Top} />}
        </li>
      </ul>



      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">{orderAmount}</p>
          <div className={styles.subtract}></div>
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );




}