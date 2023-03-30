import React, { useState, useContext, useMemo, useReducer, useEffect } from "react";
import {
  ConstructorElement,
  Button,
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


 {/*const bunIngredients = useMemo(() => {
  return ingredients.find((ingredient) => ingredient.type === 'bun')
}, [ingredients]);

const otherIngredients = useMemo(() => {
  return ingredients.find((ingredient) => ingredient.type !== 'bun')
}, [ingredients]);
*/}



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



  const topBun = ingredients.map((obj) => {
    return (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${obj.name} (верх)`}
        price={obj.price}
        thumbnail={obj.image}
      />
    );
  });

  const bottomBun = ingredients.map((obj) => {
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${obj.name} (низ)`}
        price={obj.price}
        thumbnail={obj.image}
      />
    );
  });

  return (
    <section className={styles.block}>
      
      {modalActive &&
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      }
      <ul className={styles.listElements}>
        <li className={styles.element}>{topBun[0]}</li>
        <div className={styles.list}>
          {ingredients.map((obj) => (
            <li key={obj._id} className={styles.listItem}>
              <div className={styles.points}></div>
              <ConstructorElement
                text={obj.name}
                price={obj.price}
                thumbnail={obj.image}
              />
            </li>
          ))}
        </div>
        <li className={styles.element}>{bottomBun[0]}</li>
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
