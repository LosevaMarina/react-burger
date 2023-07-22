import { request, API_URL } from "../../utils/utils";

export const ADD_INGREDIENT_COUNTER = "ADD_INGREDIENT_COUNTER";
export const REMOVE_INGREDIENT_COUNTER = "REMOVE_INGREDIENT_COUNTER";
export const ADD_BUN_COUNTER = "ADD_BUN_COUNTER";
export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_ERROR = "INGREDIENTS_ERROR";
export const CLEAR_INGREDIENT_COUNTER = "CLEAR_INGREDIENT_COUNTER";

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

      //обновление токенов
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log ("токены обновлены!");
    })
    .catch(() => dispatch(ingredientsError()));
};

const ingredientsError = () => ({
  type: INGREDIENTS_ERROR,
});

export const removeIngredientCounter = (_id) => ({
  type: REMOVE_INGREDIENT_COUNTER,
  _id: _id,
});

export const clearIngredientCounter = () => ({
  type: CLEAR_INGREDIENT_COUNTER,
});
