import {
    GET_ORDER_CARD_REQUEST,
    GET_ORDER_CARD_SUCCESS,
    GET_ORDER_CARD_FAILED,
  } from "../actions/order-card";
  import {IOrderInterface} from "../../utils/data";
  import {TAnyOrderAction} from "../actions/order-card";


  interface IInitialIngredients {
    order: IOrderInterface | null;
    orderRequest: boolean;
    orderFailed: boolean;
  }

  const initialIngredients: IInitialIngredients = {
    order: null,
    orderRequest: false,
    orderFailed: false
  }
  
  
  export const getOrderCard = (state = initialIngredients, action: TAnyOrderAction): IInitialIngredients => {
    switch (action.type) {
      case GET_ORDER_CARD_REQUEST: {
        return {
          ...state,
          orderRequest: true
        };
      }
      case GET_ORDER_CARD_SUCCESS: {
        return {
          ...state,
          orderFailed: false,
          order: action.order,
          orderRequest: false
        };
      }
      case GET_ORDER_CARD_FAILED: {
        return {
          ...state,
          orderFailed: true,
          orderRequest: false
        };
      }
      default: {
        return state;
      }
    }
  }
  