export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
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
      //console.log ("wsConnect       " + wsConnect);

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        console.log ("socket       " + socket);
        dispatch({type: wsConnecting});
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: 'Error' });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        };

        if (wsSendMessage && type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
