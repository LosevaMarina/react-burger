import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
  } from '../actions/login';
  
  
  const initialState = {
    status: false,
    accessToken: null,
    refreshToken: null,
  };
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          status: true,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      case LOGIN_FAILED:
        return {
          ...state,
          status: false,
          accessToken: null,
          refreshToken: null,
        };
      case LOGOUT:
        return {
          ...state,
          status: false,
          accessToken: '',
          refreshToken: '',
        };
      default:
        return state;
    }
  };