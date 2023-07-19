import { API_URL, checkResponse } from '../../utils/utils';
import { getCookie, setCookie, clearCookie } from '../../utils/cookies';


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (accessToken, refreshToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };
};
export const loginFailed = (err) => ({
  type: LOGIN_FAILED,
  payload: err,
});

export const logoutStatus = () => ({
  type: LOGOUT,
})

export function loginApi(email, password) {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      const data = await checkResponse(response);
      if (data.success) {
        const { accessToken, refreshToken } = data;
        setCookie('accessToken', accessToken, 1200);
        setCookie('refreshToken', refreshToken);
        dispatch(loginSuccess(accessToken, refreshToken));
        dispatch({ type: 'ISAUTH_CHECKED', payload: true });
      } else {
        dispatch(loginFailed('No such user found! Please check your details!'));
      }
    } catch (err) {
      dispatch(loginFailed(err));
    }
  };
}