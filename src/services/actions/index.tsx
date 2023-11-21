import { TIngredientsActions } from "./burger-ingredients";
import { TBurgerConstructorAction } from "./burger-constructor";
import { TIngredientDetailsActions } from "./ingredient-details";

export type TTodoActions =
  | TIngredientsActions
  | TBurgerConstructorAction
  | TIngredientDetailsActions;
