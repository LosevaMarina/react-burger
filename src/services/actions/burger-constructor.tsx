//import uniqid from "uniqid";
import { v4 as uuidv4 } from "uuid";
import { IIngredientType } from "../../utils/data";




export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = "REMOVE_INGREDIENT";
export const CONSTRUCTOR_CARD: 'CONSTRUCTOR_CARD' = "CONSTRUCTOR_CARD";
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = "CLEAR_CONSTRUCTOR";


interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  ingredient: IIngredientType;
}

interface AddBunAction {
  type: typeof ADD_BUN;
  bunIngredient: IIngredientType;
}

interface ClearConstructorAction {
  type: typeof CLEAR_CONSTRUCTOR;
  ingredients: [];
  bunIngredient: null;
}

interface SortIngredientAction {
  type: typeof MOVE_INGREDIENT;
  dragIndex: number;
  hoverIndex: number;
}


interface RemoveIngredientAction {
  type: typeof REMOVE_INGREDIENT;
  ingredients: IIngredientType;
  insex: number;
}


export type TBurgerConstructorAction =
  | AddIngredientAction
  | AddBunAction
  | ClearConstructorAction
  | SortIngredientAction
  | RemoveIngredientAction;





export const addIngredient = (ingredient: IIngredientType) => {
  const key = uuidv4();
  return {
    type: ADD_INGREDIENT,
    ingredient: { ingredient, key },
  };
};

export const removeIngredient = (ingridient: IIngredientType, index: number) => ({
  type: REMOVE_INGREDIENT,
  index,
  ingridient,
});
