import { request, API_URL } from "../../utils/utils";

export const GET_ORDER_CARD_REQUEST = 'GET_ORDER_CARD_REQUEST';
export const GET_ORDER_CARD_SUCCESS = 'GET_ORDER_CARD_SUCCESS';
export const GET_ORDER_CARD_FAILED = 'GET_ORDER_CARD_FAILED';



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