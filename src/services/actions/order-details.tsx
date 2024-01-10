import { request, API_URL } from "../../utils/utils";
import { clearIngredientCounter } from "./burger-ingredients";
import { accessToken } from "../../utils/data";
import {IOrderInterface} from "../../utils/data";
import { AppDispatch, AppThunk } from "../types/index"
import {postOrder} from "../../utils/utils";



export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const ORDER_REQUEST: "ORDER_REQUEST" = "ORDER_REQUEST";
export const ORDER_SUCCEED: "ORDER_SUCCEED" = "ORDER_SUCCEED";
export const ORDER_FAILED: "ORDER_FAILED" = "ORDER_FAILED";
export const OPEN_ORDER_DETAILS_MODAL: "OPEN_ORDER_DETAILS_MODAL" = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL: "CLOSE_ORDER_DETAILS_MODAL" = "CLOSE_ORDER_DETAILS_MODAL";


export interface IOrderRequestAction {
  type: typeof ORDER_REQUEST;
}

export interface IOrderSuccessAction {
 type: typeof ORDER_SUCCEED;
  order: IOrderInterface;
}

export interface IOrderFailedAction {
  type: typeof ORDER_FAILED;
}

export interface IOrderOpenDetailsModalAction {
  type: typeof OPEN_ORDER_DETAILS_MODAL;
}

export interface IOrderCloseDetailsModalAction {
  type: typeof CLOSE_ORDER_DETAILS_MODAL;
}

export interface IClearConstructor {
  type: typeof CLEAR_CONSTRUCTOR;
}

export type TOrderDetailsActions =
| IOrderRequestAction
| IOrderSuccessAction 
| IOrderFailedAction
| IOrderOpenDetailsModalAction
| IOrderCloseDetailsModalAction
| IClearConstructor;






export const createOrder: AppThunk = (orderItemsId: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_REQUEST,
    });
    return postOrder(orderItemsId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCCEED,
            order: res.order
          });
        } else {
          dispatch({
            type: ORDER_FAILED,
            order: res,
          }); 
        }
        dispatch({
          type: OPEN_ORDER_DETAILS_MODAL,

        });
        //dispatch({
        //  type: CLEAR_CONSTRUCTOR,
        //});
        dispatch(clearIngredientCounter());
      })
      .catch((err) => console.log(err));
  };
}

{/*}
//export function createOrder (orderItemsId: string[]) {
//  return function (dispatch: Dispatch<TOrderDetailsActions>) {

  export const createOrder: AppThunk = (orderItemsId: string) => {
    return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_REQUEST,
    });

    request(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem(accessToken),
      } as HeadersInit,
      body: JSON.stringify({
        ingredients: orderItemsId,
      }), 
    })
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: ORDER_SUCCEED,
            //order: data.order.number.toString(),
            //order: data.order.number,
            order: data.order
          });
        }        
        dispatch({
          type: OPEN_ORDER_DETAILS_MODAL,

        });
        //dispatch({
        //  type: CLEAR_CONSTRUCTOR,
        //});
        dispatch(clearIngredientCounter());
      
    }
)

      .catch((err) => {
        dispatch({
          type: ORDER_FAILED,
          //order: err
        });
        console.log(
          `Произошла ошибка открытия модалки с номером заказа: ${err}`
        );
      });
  };
};



*/}















