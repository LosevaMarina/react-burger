import {
  WS_ORDER_FEED_CONNECTING,
  WS_ORDER_FEED_OPEN,
  WS_ORDER_FEED_DISCONNECT,
  WS_ORDER_FEED_ERROR,
  WS_ORDER_FEED_MESSAGE,
} from "../actions/ws-actions";

import { WebsocketStatus } from "../../utils/order";
import {IOrderInterface} from "../../utils/data";
import {TWsOrderFeedActions} from "../actions/ws-actions";


type TInitialState = {
  status: string;
  orders: IOrderInterface[];
  connectingError: string;
  total: number,
  totalToday: number,
}

const initialState: TInitialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: "",
  total: 0,
  totalToday: 0,
};

export const orderFeedReducer = (state = initialState, action: TWsOrderFeedActions): TInitialState => {
  switch (action.type) {
    case WS_ORDER_FEED_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case WS_ORDER_FEED_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case WS_ORDER_FEED_DISCONNECT:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case WS_ORDER_FEED_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case WS_ORDER_FEED_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
