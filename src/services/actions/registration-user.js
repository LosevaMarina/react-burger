import { API_URL } from "../../utils/utils";
import { setCookie } from '../../utils/cookies';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const registerUserRequest = () => ({
  type: REGISTRATION_REQUEST,
});

export const registerUserSuccess = (user) => ({
  type: REGISTRATION_SUCCESS,
  payload: user,
});

export const registerUserFailed = (err) => ({
  type: REGISTRATION_FAILED,
  payload: err,
});

//export function registerUser(name, email, password) {
  export function registrationUserAction(name, email, password) {
  return async (dispatch) => {
    dispatch(registerUserRequest(name, email, password));

    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };

      const response = await fetch(`${API_URL}/auth/register`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${data.message}`);
      }

      if (data.success) {
        const { accessToken, refreshToken, user } = data;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(registerUserSuccess(user));
        return true;
      } else {
        dispatch(registerUserFailed('Something went wrong! Try again...'));
        return false;
      }
    } catch (err) {
      dispatch(registerUserFailed(err));
      return false;
    }
  };
}