import React, { useState, useContext, useReducer, useEffect } from "react";
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

const BurgerConstructor = () => {
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
