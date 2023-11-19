import { request, API_URL } from "../../utils/utils";
import { Dispatch } from "redux";
import {IIngredientType} from "../../utils/data";
import {AppThunk} from "../reducers/index";

export const INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST' = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS: 'INGREDIENTS_SUCCESS' = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_ERROR: 'INGREDIENTS_ERROR' = 'INGREDIENTS_ERROR';

export const ADD_INGREDIENT_COUNTER: 'ADD_INGREDIENT_COUNTER' = 'ADD_INGREDIENT_COUNTER';
export const REMOVE_INGREDIENT_COUNTER: 'REMOVE_INGREDIENT_COUNTER' = 'REMOVE_INGREDIENT_COUNTER';
export const ADD_BUN_COUNTER: 'ADD_BUN_COUNTER' = 'ADD_BUN_COUNTER';

export const CLEAR_INGREDIENT_COUNTER: 'CLEAR_INGREDIENT_COUNTER' = 'CLEAR_INGREDIENT_COUNTER';
export const INGREDIENT_CARD: 'INGREDIENT_CARD' = 'INGREDIENT_CARD';


export interface IIngredientsRequest {
  readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientsSuccess {
  readonly type: typeof INGREDIENTS_SUCCESS;
  readonly data: ReadonlyArray<IIngredientType>;
}

export interface IIngredientsError {
  readonly type: typeof INGREDIENTS_ERROR;
}

export type TIngredientsActions =
  | IIngredientsRequest
  | IIngredientsSuccess
  | IIngredientsError;



//export const getIngredients: AppThunk = () => {
 // return function (dispatch) {


 export function getIngredients() {
  return function (dispatch: Dispatch<TIngredientsActions>) {

    dispatch({ type: INGREDIENTS_REQUEST });

    request(`${API_URL}/ingredients`)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: INGREDIENTS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: INGREDIENTS_ERROR,
        });
      }
    })
      .catch(() => dispatch(ingredientsError()));
  };
}



const ingredientsError = () => ({
  type: INGREDIENTS_ERROR,
});






{/*
export const removeIngredientCounter = (_id) => ({
  type: REMOVE_INGREDIENT_COUNTER,
  _id: _id,
});

export const clearIngredientCounter = () => ({
  type: CLEAR_INGREDIENT_COUNTER,
});







import { request, API_URL } from "../../utils/utils";
import { Dispatch } from "redux";


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
*/}