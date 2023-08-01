import { request, API_URL } from "../../utils/utils";
import {clearIngredientCounter} from './burger-ingredients'
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCEED = "ORDER_SUCCEED";
export const ORDER_FAILED = "ORDER_FAILED";
export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";


export const createOrder = (orderItemsId) => {
  return (dispatch) => {
    dispatch({
      type: ORDER_REQUEST,
    });

    request(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: orderItemsId,
      }),
    })
      .then((data) => {
        dispatch({
          type: ORDER_SUCCEED,
          orderId: data.order.number.toString(),
        });
        dispatch({
          type: OPEN_ORDER_DETAILS_MODAL,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR
        })
        dispatch (clearIngredientCounter())
        console.log("удачное оформление заказа!!!");
        
      })
    
      .catch((err) => {
        dispatch({
          type: ORDER_FAILED,
        });
        console.log(`Произошла ошибка открытия модалки с номером заказа: ${err}`);
      });
  };
};

