import { AppDispatch, AppThunk } from "../types";
import {IUserInterface} from "../../utils/data";

import { login, checkResponse } from "../../utils/utils";
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
  payload: IUserInterface;
}

interface IGetUserFailed {
  type: typeof GET_USER_FAILED;
}

interface IClearUser {
  type: typeof CLEAR_USER;
  user: null;
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

  export const getUserSuccess = (user: IUserInterface ): IGetUserSuccess => {
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
            dispatch(getUserSuccess(res))
        })
        .catch(err => dispatch(getUserFailed()))
}