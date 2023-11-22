import { IOrderFeedAnswer } from "../../utils/data";

export const WS_USER_FEED_CONNECT: "WS_USER_FEED_CONNECT" = "WS_USER_FEED_CONNECT";
export const WS_USER_FEED_DISCONNECT: "WS_USER_FEED_DISCONNECT" = "WS_USER_FEED_DISCONNECT";
export const WS_USER_FEED_CONNECTING: "WS_USER_FEED_CONNECTING" = "WS_USER_FEED_CONNECTING";
export const WS_USER_FEED_OPEN: "WS_USER_FEED_OPEN" = "WS_USER_FEED_OPEN";
export const WS_USER_FEED_CLOSE: "WS_USER_FEED_CLOSE" = "WS_USER_FEED_CLOSE";
export const WS_USER_FEED_MESSAGE: "WS_USER_FEED_MESSAGE" = "WS_USER_FEED_MESSAGE";
export const WS_USER_FEED_ERROR: "WS_USER_FEED_ERROR" = "WS_USER_FEED_ERROR";

interface IWsUserFeedConnectAction {
  type: typeof WS_USER_FEED_CONNECT;
  payload: "string";
}

interface IWsUserFeedCloseAction {
  type: typeof WS_USER_FEED_CLOSE;
}

interface IWsUserFeedConnectingAction {
  type: typeof WS_USER_FEED_CONNECTING;
}

interface IWsUserFeedOpenAction {
  type: typeof WS_USER_FEED_OPEN;
}

interface IWsUserFeedDisconnectAction {
  type: typeof WS_USER_FEED_DISCONNECT;
}

interface IWsUserFeedErrorAction {
  type: typeof WS_USER_FEED_ERROR;
  payload: string;
}

interface IWsUserFeedMessageAction {
  type: typeof WS_USER_FEED_MESSAGE;
  payload: IOrderFeedAnswer;
}


export type TWsUserOrderFeedActions =
  | IWsUserFeedConnectAction
  | IWsUserFeedCloseAction
  | IWsUserFeedConnectingAction
  | IWsUserFeedOpenAction
  | IWsUserFeedDisconnectAction
  | IWsUserFeedErrorAction
  | IWsUserFeedMessageAction;




export const connect = (url: string) => ({
  type: WS_USER_FEED_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: WS_USER_FEED_DISCONNECT,
});
