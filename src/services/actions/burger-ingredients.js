import { API_URL } from "../../utils/config";
import { request } from "../../utils/utils";

export const ADD_INGREDIENT_COUNTER = "ADD_INGREDIENT_COUNTER";
export const REMOVE_INGREDIENT_COUNTER = "REMOVE_INGREDIENT_COUNTER";
export const ADD_BUN_COUNTER = "ADD_BUN_COUNTER";
export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";

export const INGREDIENT_CARD = "INGREDIENT_CARD";

export const getIngredients = () => (dispatch) => {
  dispatch({ type: INGREDIENTS_REQUEST });

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
};

const ingredientsError = () => ({
  type: INGREDIENTS_ERROR,
});
