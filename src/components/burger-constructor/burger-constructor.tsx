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
import { ADD_BUN } from "../../services/actions/burger-constructor";
import { createOrder } from "../../services/actions/order-details";
import { addIngredient } from "../../services/actions/burger-constructor";
import { useNavigate } from "react-router-dom";

import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { CLOSE_ORDER_DETAILS_MODAL } from "../../services/actions/order-details";
import { refreshToken, accessToken } from "../../utils/data";
import {useTypeSelector} from "../../hooks/use-type-selector";
import {IIngredientType} from "../../utils/data";

export const BurgerConstructor = () => {
  const UserAuth = Boolean(
    localStorage.getItem(refreshToken) && localStorage.getItem(accessToken)
  );
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [Modal, setModal] = useState(false);
  const orderDetailsModal = useTypeSelector(
    (state) => state.orderDetails.openModal
  );

  //const ingredient = useTypeSelector(
   // (state) => state.burgerConstructor.ingredients
  //);

  const { bunIngredient, ingredients } = useTypeSelector((state) => state.burgerConstructor);

  const Top = "top";

  const loading = useTypeSelector(state => state.orderDetails.loading);

  const orderAmount = useMemo(() => {
    return (
      ingredients.reduce((acc: number, cur: any = {}) => {
        
        if (cur.ingredient.price) {
          return acc + cur.ingredient.price;
        } 
        return acc;
      }, 0) + (bunIngredient ? bunIngredient.price * 2 : 0)
    );
  }, [ingredients, bunIngredient]);

  
 // function func (ingredient: IIngredientType) { 
 //   console.log ("ingredient.price" + ingredient.price);
 // }

  const [, dropTargetRef] = useDrop({
    accept: INGREDIENT_CARD,
    drop(ingredient: IIngredientType) {
      handleDrop(ingredient);
     // func(ingredient);
    },
  });


  function handleDrop(ingredient: IIngredientType) {
    const { _id, type, price } = ingredient;
    //console.log ("ingredient.type: " + ingredient.type);
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
  if (UserAuth) {
   
    let orderIngredientIds = ingredients.map((ingredient) => ingredient._id);
    bunIngredient && orderIngredientIds.push(bunIngredient._id, bunIngredient._id);
    //dispatch(createOrder(orderIngredientIds));

  } else {
    //перенаправляем на страницу входа
    navigate("/login", { state: { from: { pathname: "/" } } });
    //обновляем токены
    localStorage.removeItem(accessToken);
    localStorage.removeItem(refreshToken);
  }
}
  
  function closeOrderDetailsModal() {
    //setModal(false);
    dispatch({ type: CLOSE_ORDER_DETAILS_MODAL });
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

      {/*открытие модалки с номером заказа*/}

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
    </section>
  );
};
