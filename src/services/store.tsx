import { rootReducer } from "./reducers/index";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
//import thunk from "redux-thunk";
import { compose } from "redux";
import { socketMiddleware } from "./middleware/socketMiddleware";
import ReduxThunk from 'redux-thunk';

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
//import {FEED_URL, ORDERS_URL} from "../utils/utils";




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

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const enhancer = composeEnhancers(
//  applyMiddleware(
//    thunk,
//    ordersMiddlware,
//    ordersProfileMiddlware
//  )
//);

//export const store = createStore(
//  rootReducer, 
//  enhancer
//)

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(ReduxThunk),
    applyMiddleware(ordersMiddlware),
      applyMiddleware(ordersProfileMiddlware),
      )); 







