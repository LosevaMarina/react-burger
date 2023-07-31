import { rootReducer } from "./reducers/index";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//import { composeWithDevTools } from "@redux-devtools/extension";
import { composeWithDevTools } from "redux-devtools-extension";

import { socketMiddleware } from "./middleware/socketMiddleware";

import {
  WS_ORDER_FEED_CONNECT,
  WS_ORDER_FEED_DISCONNECT,
  WS_ORDER_FEED_CONNECTING,
  WS_ORDER_FEED_OPEN,
  WS_ORDER_FEED_CLOSE,
  WS_ORDER_FEED_MESSAGE,
  WS_ORDER_FEED_ERROR,
} from "./actions/ws-actions";
import {
  WS_USER_FEED_CONNECT,
  WS_USER_FEED_DISCONNECT,
  WS_USER_FEED_CONNECTING,
  WS_USER_FEED_OPEN,
  WS_USER_FEED_CLOSE,
  WS_USER_FEED_MESSAGE,
  WS_USER_FEED_ERROR,
} from "./actions/ws-profile";

const ordersMiddlware = socketMiddleware({
  wsConnect: WS_ORDER_FEED_CONNECT,
  wsDisconnect: WS_ORDER_FEED_DISCONNECT,
  wsConnecting: WS_ORDER_FEED_CONNECTING,
  onOpen: WS_ORDER_FEED_OPEN,
  onMessage: WS_ORDER_FEED_MESSAGE,
  onClose: WS_ORDER_FEED_CLOSE,
  onError: WS_ORDER_FEED_ERROR,
});

const ordersProfileMiddlware = socketMiddleware({
  wsConnect: WS_USER_FEED_CONNECT,
  wsDisconnect: WS_USER_FEED_DISCONNECT,
  wsConnecting: WS_USER_FEED_CONNECTING,
  onOpen: WS_USER_FEED_OPEN,
  onMessage: WS_USER_FEED_MESSAGE,
  onClose: WS_USER_FEED_CLOSE,
  onError: WS_USER_FEED_ERROR,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, ordersMiddlware, ordersProfileMiddlware)
  )
);

export default store;
