
import { clearIngredientCounter } from "./burger-ingredients";
//import {IOrderInterface} from "../../utils/data";
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
 order: number;
 //order: IOrderInterface;
}

export interface IOrderFailedAction {
  type: typeof ORDER_FAILED;
  order: number;
  //order: IOrderInterface;
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






export const createOrder: AppThunk = (orderItemsId: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_REQUEST,
    });
    return postOrder(orderItemsId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_SUCCEED,
            //order: res.order
            order: res.order.number
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
        dispatch(clearIngredientCounter());
      })
      .catch((err) => console.log(err));
  };
}













