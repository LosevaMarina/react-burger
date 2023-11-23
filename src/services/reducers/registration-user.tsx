import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  CLEAR_USER,

  CHECK_TOKEN,
  GET_USER
} from "../actions/registration-user";

import {TUserActions} from "../actions/registration-user";

  interface IInitialUserState {
    user: { email: string; name: string } | null;
    isAuthChecked: boolean;
    userFailed: boolean;
    password: string;
  }

  
const initialUserState: IInitialUserState = {
  user: null,
  isAuthChecked: true,
  userFailed: false,
  password: ""
};

export const userReducer = (state = initialUserState, action: TUserActions) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        isAuthChecked: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        //user: action.user,
        user: action.payload.user,
        isAuthChecked: true,
        userFailed: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        isAuthChecked: true,
      };
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: null,
        userFailed: false,
        isAuthChecked: true,
      };
    }


    case CHECK_TOKEN: {
      return {
        ...state,
        isAuthChecked: true
      }
    }


    case GET_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true
      }
    }


    default: {
      return state;
    }
  }
};
