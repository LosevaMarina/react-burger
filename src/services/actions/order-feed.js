export const ORDER_FEED_CONNECT = 'ORDER_FEED_CONNECT';
export const ORDER_FEED_DISCONNECT = 'ORDER_FEED_DISCONNECT';
export const ORDER_FEED_CONNECTING = 'ORDER_FEED_CONNECTING';
export const ORDER_FEED_OPEN = 'ORDER_FEED_OPEN';
export const ORDER_FEED_CLOSE = 'ORDER_FEED_CLOSE';
export const ORDER_FEED_MESSAGE = 'ORDER_FEED_MESSAGE';
export const ORDER_FEED_ERROR = 'ORDER_FEED_ERROR';

export const connect = (url) => ({
    type: ORDER_FEED_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: ORDER_FEED_DISCONNECT,
});