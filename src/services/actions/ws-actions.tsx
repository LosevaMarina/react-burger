import { IOrderFeedAnswer } from "../../utils/data";
import {
  WS_USER_FEED_CONNECT,
  WS_USER_FEED_DISCONNECT,
  WS_USER_FEED_CONNECTING,
  WS_USER_FEED_OPEN,
  WS_USER_FEED_CLOSE,
  WS_USER_FEED_MESSAGE,
  WS_USER_FEED_ERROR,
} from "./ws-profile";

export const WS_ORDER_FEED_CONNECT: "WS_ORDER_FEED_CONNECT" =
  "WS_ORDER_FEED_CONNECT";
export const WS_ORDER_FEED_DISCONNECT: "WS_ORDER_FEED_DISCONNECT" =
  "WS_ORDER_FEED_DISCONNECT";
export const WS_ORDER_FEED_CONNECTING: "WS_ORDER_FEED_CONNECTING" =
  "WS_ORDER_FEED_CONNECTING";
export const WS_ORDER_FEED_OPEN: "WS_ORDER_FEED_OPEN" = "WS_ORDER_FEED_OPEN";
export const WS_ORDER_FEED_CLOSE: "WS_ORDER_FEED_CLOSE" = "WS_ORDER_FEED_CLOSE";
export const WS_ORDER_FEED_MESSAGE: "WS_ORDER_FEED_MESSAGE" =
  "WS_ORDER_FEED_MESSAGE";
export const WS_ORDER_FEED_ERROR: "WS_ORDER_FEED_ERROR" = "WS_ORDER_FEED_ERROR";

interface IWsOrderFeedConnectAction {
  type: typeof WS_ORDER_FEED_CONNECT;
  payload: "string";
}

interface IWsOrderFeedCloseAction {
  type: typeof WS_ORDER_FEED_CLOSE;
}

interface IWsOrderFeedConnectingAction {
  type: typeof WS_ORDER_FEED_CONNECTING;
}

interface IWsOrderFeedOpenAction {
  type: typeof WS_ORDER_FEED_OPEN;
}

interface IWsOrderFeedDisconnectAction {
  type: typeof WS_ORDER_FEED_DISCONNECT;
}

interface IWsOrderFeedErrorAction {
  type: typeof WS_ORDER_FEED_ERROR;
  payload: string;
}
interface IWsOrderFeedMessageAction {
  type: typeof WS_ORDER_FEED_MESSAGE;
  payload: IOrderFeedAnswer;
}

export type TWsOrderFeedActions =
  | IWsOrderFeedConnectAction
  | IWsOrderFeedCloseAction
  | IWsOrderFeedConnectingAction
  | IWsOrderFeedOpenAction
  | IWsOrderFeedDisconnectAction
  | IWsOrderFeedErrorAction
  | IWsOrderFeedMessageAction;

export const connect = (url: string) => ({
  type: WS_ORDER_FEED_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: WS_ORDER_FEED_DISCONNECT,
});

export type TWsActions = {
  wsConnect:
    | typeof WS_ORDER_FEED_CONNECT
    | typeof WS_USER_FEED_CONNECT
  wsDisconnect:
    | typeof WS_ORDER_FEED_DISCONNECT
    | typeof WS_USER_FEED_DISCONNECT
  wsConnecting:
    | typeof WS_ORDER_FEED_CONNECTING
    | typeof WS_USER_FEED_CONNECTING
  onOpen:
    | typeof WS_ORDER_FEED_OPEN
    | typeof WS_USER_FEED_OPEN
  onClose:
    | typeof WS_ORDER_FEED_CLOSE
    | typeof WS_USER_FEED_CLOSE
  onError:
    | typeof WS_ORDER_FEED_ERROR
    | typeof WS_USER_FEED_ERROR
  onMessage:
    | typeof WS_ORDER_FEED_MESSAGE
    | typeof WS_USER_FEED_MESSAGE
};
