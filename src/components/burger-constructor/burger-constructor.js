import React, { useEffect } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import {PropTypeingredients} from '../utils/data';
import Modal from "../modal/modal";

const BurgerConstructor = (props) => {
  const [modalActive, setModalActive] = React.useState(false);

  const openModal = () => {
    setModalActive(true);
  }

  const closeModal = () => {
    setModalActive(false);
  };

  const topBun = props.ingredients.map((obj) => {
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

  const bottomBun = props.ingredients.map((obj) => {
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
      <ul className={styles.listElements}>
        <li className={styles.element}>{topBun[0]}</li>
        <div className={styles.list}>
          {props.ingredients.map((obj) => (
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
        {/* <Button htmlType="button" type="primary" size="large" onClick={openModal}>*/}

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setModalActive(true)}
        >
          Оформить заказ
        </Button>
      </div>

    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypeingredients).isRequired,
};

export default BurgerConstructor;
