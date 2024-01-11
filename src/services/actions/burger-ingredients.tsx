import { request, API_URL } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../types/index";
import {IIngredientType} from "../../utils/data";

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

export interface IAddIngredientCounter {
  readonly type: typeof ADD_INGREDIENT_COUNTER;
  readonly _id: string;
}

export interface IRemoveIngredientCounter {
  readonly type: typeof REMOVE_INGREDIENT_COUNTER;
  readonly _id: string;
}

export interface IAddBunCounter {
  readonly type: typeof ADD_BUN_COUNTER;
  readonly _id: string;
}

export interface IClearIngredientCounter {
  readonly type: typeof CLEAR_INGREDIENT_COUNTER;
}

export type TIngredientsActions =
  | IIngredientsRequest
  | IIngredientsSuccess
  | IIngredientsError
  | IAddIngredientCounter
  | IRemoveIngredientCounter
  | IAddBunCounter
  | IClearIngredientCounter;


export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {

    dispatch({ type: INGREDIENTS_REQUEST });
    request(`${API_URL}/ingredients`)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: INGREDIENTS_SUCCESS,
          data: res.data.map((ingredient: IIngredientType) => ({
            ...ingredient,
            counter: 0,
        }))
        
      })
      } else {
        dispatch({
          type: INGREDIENTS_ERROR,
        });
      }
    })
      .catch(() => dispatch(({
        type: INGREDIENTS_ERROR,
      })));
  };
}



export const removeIngredientCounter = (_id: string): IRemoveIngredientCounter => ({
  type: REMOVE_INGREDIENT_COUNTER,
  _id,
});



export const clearIngredientCounter = (): IClearIngredientCounter => ({
  type: CLEAR_INGREDIENT_COUNTER,
});