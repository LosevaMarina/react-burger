import {
  WS_USER_FEED_CONNECTING,
  WS_USER_FEED_DISCONNECT,
  WS_USER_FEED_ERROR,
  WS_USER_FEED_MESSAGE,
  WS_USER_FEED_OPEN,
} from "../actions/ws-profile";
import { WebsocketStatus } from "../../utils/order";

const initialState = {
  status: " ",
  orders: [],
  connectingError: "",
  loader: false,
};

export const userFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_FEED_CONNECTING:
      return {
        ...state,
        status: "CONNECTING...",
        loader: true,
      };
    case WS_USER_FEED_OPEN:
      return {
        ...state,
        status: "ONLINE",
        connectingError: "",
        loader: true,
      };
    case WS_USER_FEED_DISCONNECT:
      return {
        ...state,
        status: "OFFLINE",
      };
    case WS_USER_FEED_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case WS_USER_FEED_MESSAGE:
      return {
        ...state,
        orders: action.payload,
        loader: false,
      };
    default:
      return state;
  }
};
