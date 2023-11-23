import { TOrderDetailsActions } from "../actions/order-details";
import {
  ORDER_REQUEST,
  ORDER_SUCCEED,
  ORDER_FAILED,
  OPEN_ORDER_DETAILS_MODAL,
  CLOSE_ORDER_DETAILS_MODAL,
} from "../actions/order-details";
import {IOrderInterface} from "../../utils/data";

export type TinitialState = {
  //order: {number: string }| null | IOrderInterface
  order: null | IOrderInterface,
  makeOrderRequestInProgress: boolean;
  makeOrderRequestFailed: boolean;
  openModal: boolean;
  loading: boolean
};

const initialState: TinitialState = {
  order: null,
  makeOrderRequestInProgress: false,
  makeOrderRequestFailed: false,
  openModal: false,
  loading: false,
};

export const orderDetailsReducer = (state = initialState, action:TOrderDetailsActions): TinitialState => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        makeOrderRequestInProgress: true,
        loading: true,
      };
    }
    case ORDER_SUCCEED: {
      return {
        ...state,
        makeOrderRequestInProgress: false,
        makeOrderRequestFailed: false,
        order: action.order,
        loading: false,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        makeOrderRequestInProgress: false,
        makeOrderRequestFailed: true,
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
