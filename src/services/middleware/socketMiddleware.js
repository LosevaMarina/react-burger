export const socketMiddleware = (wsActions) => {
  return store => {
      let socket = null;

      return next => action => {
          const { dispatch } = store;
          const { type } = action;
          const {
              wsConnect,
              wsSendMessage,
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

              socket.onmessage = event => {
                  const { data } = event;
                  const parsedData = JSON.parse(data);
                  console.log ("MESSAGE")
                  dispatch({ type: onMessage, payload: parsedData });
              };

              socket.onclose = () => {
                  dispatch({ type: onClose });
                  console.log ("CLOSE")
              };

              if (type === wsSendMessage) {
                  socket.send(JSON.stringify(action.payload));
              }

              if (type === wsDisconnect) {
                  socket.close();
                  socket = null;
              }
          }

          next(action);
      };
  };
};