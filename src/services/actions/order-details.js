import {orderApi} from '../../utils/utils';


export const PLACE_ORDER_REQUEST_STARTED = "PLACE_ORDER_REQUEST_STARTED";
export const PLACE_ORDER_REQUEST_SUCCEED = "PLACE_ORDER_REQUEST_SUCCEED";
export const PLACE_ORDER_REQUEST_FAILED = "PLACE_ORDER_REQUEST_FAILED";

export const OPEN_ORDER_DETAILS_MODAL = "OPEN_ORDER_DETAILS_MODAL";
export const CLOSE_ORDER_DETAILS_MODAL = "CLOSE_ORDER_DETAILS_MODAL";



export const createOrder = (orderItemsId) => {
    return (dispatch) => {
        dispatch({
            type: PLACE_ORDER_REQUEST_STARTED,
          });

      orderApi(orderItemsId)
      .then(
        (data) => {
            
        dispatch({
          type: PLACE_ORDER_REQUEST_SUCCEED,
          orderId: data.order.number.toString(),
        });
        dispatch({
          type: OPEN_ORDER_DETAILS_MODAL,
        });

        }
      )
      .catch((err) => {
        dispatch({
            type: PLACE_ORDER_REQUEST_FAILED,
          });
      });
    }
  };