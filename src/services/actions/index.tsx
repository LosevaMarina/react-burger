import { TIngredientsActions } from "./burger-ingredients";
import { TBurgerConstructorAction } from "./burger-constructor";
import { TIngredientDetailsActions } from "./ingredient-details";
import { TOrderDetailsActions } from "./order-details";
import {TAnyOrderAction} from "./order-card";
import {TUserActions} from "./registration-user";



export type TTodoActions =
  | TIngredientsActions
  | TBurgerConstructorAction
  | TIngredientDetailsActions
  | TOrderDetailsActions
  | TAnyOrderAction
  | TUserActions;
