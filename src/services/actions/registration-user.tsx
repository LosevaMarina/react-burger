import { AppDispatch, AppThunk } from "../types";
import { TUserType } from "../../utils/data";
import { getUser, createUser, logout } from "../../utils/utils";
import { login, checkResponse, forgotPassword } from "../../utils/utils";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER";
export const GET_USER: "GET_USER" = "GET_USER";

export const CHECK_TOKEN: "CHECK_TOKEN" = "CHECK_TOKEN";





export interface IGetUserRequest {
  type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: TUserType;
}

interface IGetUserFailed {
  type: typeof GET_USER_FAILED;
}

interface IClearUser {
  type: typeof CLEAR_USER;
}

interface IGetUser {
  type: typeof GET_USER;
  payload: {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: { email: string; name: string };
  };
}

interface ICheckToken {
  type: typeof CHECK_TOKEN;
}

export type TUserActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IClearUser
  | IGetUser
  | ICheckToken;

  export const getUserRequest = (): IGetUserRequest => {
    return {
      type: GET_USER_REQUEST
    }
  }


  export const clearUser = (): IClearUser => {
    return {
      type: CLEAR_USER
    }
  }
  
  export const getUserSuccess = (user: TUserType ): IGetUserSuccess => {
    return {
      type: GET_USER_SUCCESS,
      payload: user

    }
  }

  export const getUserFailed = (): IGetUserFailed => {
    return {
      type: GET_USER_FAILED
    }
  }

  export const userLogin: AppThunk = data => (dispatch: AppDispatch) => {
    dispatch(getUserRequest());
    login(data)
        .then(checkResponse)
        .then(res => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            //dispatch(getUserSuccess(res))
            dispatch({ type: GET_USER, payload: res });
        })
        .catch(err => dispatch(getUserFailed()))
}





export const checkUser: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      getUser()
        .then((res) => {
          dispatch({ type: GET_USER, payload: res });
        })
        .catch((err) => console.log(err + "ошибка загагрузки страницы"));
    }
  };
};

export const forgotPasswordUser: AppThunk = (data) => {
  return (dispatch: AppDispatch) => {
    forgotPassword(data)
      
  };
};



export const logOutUser: AppThunk = data => (dispatch: AppDispatch) => {
  logout(data)
      .then(checkResponse)
      .then(res => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(clearUser())
      })
      .catch(err => console.log(err))
}

