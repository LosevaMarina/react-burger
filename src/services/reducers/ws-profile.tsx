import {
  WS_USER_FEED_CONNECTING,
  WS_USER_FEED_DISCONNECT,
  WS_USER_FEED_ERROR,
  WS_USER_FEED_MESSAGE,
  WS_USER_FEED_OPEN,
} from "../actions/ws-profile";
import { WebsocketStatus } from "../../utils/order";
import {IOrderInterface } from "../../utils/data";
import {TWsUserOrderFeedActions} from "../actions/ws-profile"

interface IInitialState {
  status: string;
  orders: IOrderInterface[];
  connectingError: string;
}

const initialState: IInitialState = {
  status: " ",
  orders: [],
  connectingError: "",
};

export const userFeedReducer = (state = initialState, action: TWsUserOrderFeedActions) => {
  switch (action.type) {
    case WS_USER_FEED_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case WS_USER_FEED_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case WS_USER_FEED_DISCONNECT:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case WS_USER_FEED_ERROR:
      return {
        ...state,
        connectingError: action.payload,
        orders: [],
      };
    case WS_USER_FEED_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
