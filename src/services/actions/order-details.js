import { request, API_URL } from "../../utils/utils";
import { clearIngredientCounter } from "./burger-ingredients";
import { accessToken } from "../../utils/data";
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
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(accessToken),
      },
      body: JSON.stringify({
        ingredients: orderItemsId,
      }),
    })
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: ORDER_SUCCEED,
            order: data.order.number.toString(),
            //order: data.order,
          });
        }

        dispatch({
          type: OPEN_ORDER_DETAILS_MODAL,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
        dispatch(clearIngredientCounter());
      })

      .catch((err) => {
        dispatch({
          type: ORDER_FAILED,
        });
        console.log(
          `Произошла ошибка открытия модалки с номером заказа: ${err}`
        );
      });
  };
};
