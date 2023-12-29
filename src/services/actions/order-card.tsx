import { request, API_URL } from "../../utils/utils";
import {IOrderInterface} from "../../utils/data";
import { Dispatch } from "redux";

export const GET_ORDER_CARD_REQUEST: "GET_ORDER_CARD_REQUEST" = 'GET_ORDER_CARD_REQUEST';
export const GET_ORDER_CARD_SUCCESS: "GET_ORDER_CARD_SUCCESS" = 'GET_ORDER_CARD_SUCCESS';
export const GET_ORDER_CARD_FAILED: "GET_ORDER_CARD_FAILED" = 'GET_ORDER_CARD_FAILED';



interface IGetOrderCardRequestAction {
  type: typeof GET_ORDER_CARD_REQUEST
}

interface IGetOrderCardSuccesAction {
  type: typeof GET_ORDER_CARD_SUCCESS
  order: IOrderInterface; 
}

  interface IGetOrderCardFailedAction {
    type: typeof GET_ORDER_CARD_FAILED
  }
  



export type TAnyOrderAction =
  | IGetOrderCardRequestAction
  | IGetOrderCardSuccesAction
  | IGetOrderCardFailedAction;






export function getOrderCard (number: string) {
return function (dispatch: Dispatch<TAnyOrderAction>) {
    dispatch({ type: GET_ORDER_CARD_REQUEST });

    request(`${API_URL}/orders/${number}`)
    .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_CARD_SUCCESS,
            order: res.orders[0]
          });
        } else {
          dispatch({
            type: GET_ORDER_CARD_FAILED
          })
        }
      })
        .catch(err => console.log(err + "ОШИБКА ОТКРЫТИЯ КАРТОЧКИ ЗАКАЗА"));
    }
     
  }
  
  















  {/*
export const getOrderCard = (number) => (dispatch) => {
    dispatch({ type: GET_ORDER_CARD_REQUEST });

    request(`${API_URL}/orders/${number}`)
    .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_CARD_SUCCESS,
            order: res.orders[0]
          });
        } else {
          dispatch({
            type: GET_ORDER_CARD_FAILED
          })
        }
      })
        .catch(err => console.log(err));
    
  }
*/}