import {
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED
  } from '../actions/registration-user'
  
  const initialState = {
    name: null,
    email: null,
    password: null,
    isAuthenticated: false
  };
  
  export const registrationUserReduser = (state = initialState, action) => {
    switch (action.type) {
      case REGISTRATION_REQUEST:
        return {
          ...state,
        };
      case REGISTRATION_SUCCESS:
        if (action.payload && action.payload.name && action.payload.email) {
          return {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            isAuthenticated: true
          };
        } else {
          return state;
        }
      case REGISTRATION_FAILED:
        return {
          name: null,
          email: null,
          password: null,
          isAuthenticated: false
        };
      default:
        return state;
    }
  };