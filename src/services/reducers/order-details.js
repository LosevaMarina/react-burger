import { Ingredient } from "../../components/ingredient/ingredient";
import {
  ORDER_REQUEST,
  ORDER_SUCCEED,
  ORDER_FAILED,
  OPEN_ORDER_DETAILS_MODAL,
  CLOSE_ORDER_DETAILS_MODAL,
} from "../actions/order-details";

const initialState = {
  order: 0,
  makeOrderRequestInProgress: false,
  makeOrderRequestFailed: false,
  openModal: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        makeOrderRequestInProgress: true,
      };
    }
    case ORDER_SUCCEED: {
      return {
        ...state,
        makeOrderRequestInProgress: false,
        makeOrderRequestFailed: false,
        order: action.order,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        makeOrderRequestInProgress: false,
        makeOrderRequestFailed: true,
        order: "",
      };
    }
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        openModal: true,
      };
    }
    case CLOSE_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        openModal: false,
      };
    }
    default: {
      return state;
    }
  }
};
