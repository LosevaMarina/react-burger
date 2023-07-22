import { createUser } from '../../utils/utils';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const CLEAR_USER = 'CLEAR_USER';


export function getUser({email, password, username}) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    createUser({email, password, username})
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          });
        } else {
          dispatch({
            type: GET_USER_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации пользователя: ${err}`);
        dispatch({
          type: GET_USER_FAILED
        })
      })
  }
}
