import React, { useState, useContext, useMemo, useReducer, useEffect } from "react";
import {
  ConstructorElement,
  Button,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {IngredientsContext} from '../services/ingredientsContext';
import {API_URL} from '../utils/config';
import { request } from '../utils/utils';



const BurgerConstructor = () => {
 const [modalActive, setModalActive] = useState(false);
 const { ingredients } = useContext(IngredientsContext);
 const [orderDetails, setOrderDetails] = useState({})

const bunIngredients = ingredients.filter((item) => {
  return item.type === "bun";
});
const otherIngredients = ingredients.filter((item) => {
  return item.type !== "bun";
});

  const openModal = () => {
    setModalActive(true);
  }

  const closeModal = () => {
    setModalActive(false);
  }


  const onClick = () => {
    request(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredients.map((ingredient) => ingredient._id),
      }),
    })

    .then((data) => {
      setOrderDetails(data)
      openModal(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }



  
  return (
    <section className={styles.block}>
      
      {modalActive &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      }

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
          <p className="text text_type_digits-medium">610</p>
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
