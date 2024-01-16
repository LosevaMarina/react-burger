import {IIngredientType} from "../../utils/data";

export const INGREDIENT: 'INGREDIENT' = "INGREDIENT";
export const NO_INGREDIENT: "NO_INGREDIENT" = "NO_INGREDIENT";
export const OPEN_MODAL_INGREDIENT: "OPEN_MODAL_INGREDIENT" = "OPEN_MODAL_INGREDIENT";
export const CLOSE_MODAL_INGREDIENT: "CLOSE_MODAL_INGREDIENT" = "CLOSE_MODAL_INGREDIENT";


export interface IIngredient {
  readonly type: typeof INGREDIENT;
  ingredient: IIngredientType;
}

export interface INoIngredients {
  readonly type: typeof NO_INGREDIENT;
  ingredient: null;
}

export interface IOpenModalIngredient {
  readonly type: typeof OPEN_MODAL_INGREDIENT;
  openModal: boolean;
}

export interface ICloseModalIngredient {
  readonly type: typeof CLOSE_MODAL_INGREDIENT;
  openModal: boolean;
}

export type TIngredientDetailsActions =
  | IIngredient
  | INoIngredients
  | IOpenModalIngredient
  | ICloseModalIngredient;






export function selectIngredient(ingredient: IIngredientType) {
  return {
    type: INGREDIENT,
    ingredient: ingredient,
  };
}
