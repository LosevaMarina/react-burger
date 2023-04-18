import { API_URL } from "../../utils/config";
import { request } from "../../utils/utils";

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';


export const getIngredients = () => (dispatch) => {
    dispatch ({ type: INGREDIENTS_REQUEST });

    request(`${API_URL}/ingredients`)
      .then((res) => {
        dispatch({
            type: INGREDIENTS_SUCCESS,
            ingredients: res.data.map((ingredient) => ({
                ...ingredient,
                counter: 0,
                })),
            });
      })
      .catch(() => dispatch(ingredientsError()));
      
    }

const ingredientsError = () => ({
    type: INGREDIENTS_ERROR
  });


