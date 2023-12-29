import { useMemo } from "react";
import {
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import { IngredientsCard } from "../ingredients-card/ingredients-card";
import { BunCard } from "../bun-card/bun-card";
import { useDispatch } from "react-redux";
import {
  INGREDIENT_CARD,
  ADD_BUN_COUNTER,
  ADD_INGREDIENT_COUNTER,
} from "../../services/actions/burger-ingredients";
import { ADD_BUN, ADD_INGREDIENT } from "../../services/actions/burger-constructor";
import { createOrder } from "../../services/actions/order-details";
import { addIngredient } from "../../services/actions/burger-constructor";
import { useNavigate } from "react-router-dom";

import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
//import { CLOSE_ORDER_DETAILS_MODAL } from "../../services/actions/order-details";
import { refreshToken, accessToken } from "../../utils/data";
import {useTypeSelector} from "../../hooks/use-type-selector";
import {IIngredientType} from "../../utils/data";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import type {} from 'redux-thunk/extend-redux';



export const BurgerConstructor = () => {
  const UserAuth = Boolean(
    localStorage.getItem(refreshToken) && localStorage.getItem(accessToken)
  );
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Modalin, setModalin] = React.useState(false);
  
  const orderDetailsModal = useTypeSelector(
    (state) => state.orderDetails.openModal
 );

  const { ingredients, bunIngredient } = useTypeSelector(state => ({
    bunIngredient: state.burgerConstructor.bunIngredient,
    ingredients: state.burgerConstructor.ingredients,
}));

//const {ingredients, bunIngredient} = useTypeSelector((state) => state.burgerConstructor);

  

  const Top = "top";

  //const loading = useTypeSelector(state => state.orderDetails.loading);


  const orderAmount = useMemo(() => {
    return (
      ingredients.reduce((acc: number, cur: any = {}) => {
        
        if (cur.price) {
          return acc + cur.price;
        } 
        return acc;
      }, 0) + (bunIngredient ? bunIngredient.price * 2 : 0)
    );
  }, [ingredients, bunIngredient]);


  
  const [, dropTargetRef] = useDrop({
    accept: INGREDIENT_CARD,
    drop(ingredient: IIngredientType) {
      handleDrop(ingredient);
    },
  });


  function handleDrop(ingredient: IIngredientType) {
    const { _id, type } = ingredient;
    const key = uuidv4();
    switch (type) {
      case "bun": {
        dispatch({
          type: ADD_BUN_COUNTER,
          _id: _id,
        });
        dispatch({
          type: ADD_BUN,
          bunIngredient: { ...ingredient, constructorId: key },
        });
        break;
      }
      default: {
        dispatch({
          type: ADD_INGREDIENT_COUNTER,
          _id: _id,
        });
        //dispatch(addIngredient(ingredient));
        dispatch({
          type: ADD_INGREDIENT,
          ingredient: { ...ingredient, constructorId: key },
        });
        break;
      }    
    }
  }



const handlePlaceOrder = () => {
 // if (UserAuth) {

 const orderIngredientIds = [
  bunIngredient,
  ...ingredients.map((item) => item._id),
  bunIngredient,
];
    //let orderIngredientIds = ingredients.map((item) => item._id);
    console.log ("ингредиенты: " + orderIngredientIds);


   // bunIngredient && orderIngredientIds.push(bunIngredient._id, bunIngredient._id);

console.log ("orderIngredientIds: " + orderIngredientIds);

    dispatch(createOrder(orderIngredientIds));
    setModalin(true);
    console.log ('setModalin: ' + setModalin)
//  } else {
//    navigate("/login");
//  }
};

const closeOrderDetailsModal = () => {
  setModalin(false);
  //dispatch({ type: CLOSE_ORDER_DETAILS_MODAL });
};




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

      {/*открытие модалки с номером заказа*/}

      {Modalin && (
        <Modal closeModal={closeOrderDetailsModal}>
         <p className="text text_type_main-medium m-20">
            Ваш заказ формируется, минутку...
          </p>
        </Modal>
        
      )}
      {Modalin && (
        <Modal closeModal={closeOrderDetailsModal}>
          <OrderDetails />
        </Modal>
        
      )}

{/*


      {orderDetailsModal && loading && (
        <Modal closeModal={closeOrderDetailsModal}>
         <p className="text text_type_main-medium m-20">
            Ваш заказ формируется, минутку...
          </p>
        </Modal>
        
      )}
      {orderDetailsModal && !loading && (
        <Modal closeModal={closeOrderDetailsModal}>
          <OrderDetails />
        </Modal>
        
      )}
*/}



    </section>
  );
};
