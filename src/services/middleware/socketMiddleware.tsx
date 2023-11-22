import { Middleware, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { TWsActions} from "../actions/ws-actions";
import {TWsOrderFeedActions } from "../actions/ws-actions";
import { TWsUserOrderFeedActions } from "../actions/ws-profile";

export type TWsActionTypes = {
    wsConnect: string;
    wsDisconnect: string;
    wsSendMessage?: string;
    wsConnecting: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
  };

export const socketMiddleware: any = (wsActions: TWsActions): Middleware => {
  return (store: {
    dispatch: (type: TWsOrderFeedActions | TWsUserOrderFeedActions) => void;
}) => {
    let socket: WebSocket | null = null;




        return (next: Dispatch<AnyAction>) =>
        (action: TWsOrderFeedActions | TWsUserOrderFeedActions) => {
          const { dispatch } = store;
          const { type } = action;
          const {
              wsConnect,
              //wsSendMessage,
              onOpen,
              onClose,
              onError,
              onMessage,
              wsConnecting,
              wsDisconnect,
          } = wsActions;

          if (type === wsConnect) {
              socket = new WebSocket(action.payload);
              dispatch({type: wsConnecting});
              console.log ("CONNECTING.....")
          }

          if (socket) {
              socket.onopen = () => {
                  dispatch({ type: onOpen });
                  console.log ("OPEN")
              };

              socket.onerror = () => {
                  dispatch({ type: onError, payload: 'Error' });
                  console.log ("ERROR")
              };

              socket.onmessage = (event: MessageEvent) => {
                  const { data } = event;
                  const parsedData = JSON.parse(data);
                  console.log ("MESSAGE")
                  dispatch({ type: onMessage, payload: parsedData });
              };

              socket.onclose = () => {
                  dispatch({ type: onClose });
                  console.log ("CLOSE")
              };

              //if (type === wsSendMessage) {
             //     socket.send(JSON.stringify(action.payload));
            //  }

              if (type === wsDisconnect) {
                  socket.close();
                  socket = null;
              }
          }

          next(action);
      };
  };
};