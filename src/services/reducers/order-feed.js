import {
  ORDER_FEED_CONNECTING,
  ORDER_FEED_OPEN,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_ERROR,
  ORDER_FEED_MESSAGE,
} from "../actions/order-feed";
import { WebsocketStatus } from "../../utils/utils";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: "",
};
console.log ("работает");

export const orderFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_FEED_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case ORDER_FEED_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case ORDER_FEED_DISCONNECT:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case ORDER_FEED_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case ORDER_FEED_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};


