import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  MOVE_INGREDIENT
} from "../actions/burger-constructor";
import {IIngredientType} from "../../utils/data";
import {TBurgerConstructorAction} from "../actions/burger-constructor";

type TInitialState = {
  ingredients: IIngredientType[];
  bunIngredient: IIngredientType | null;
}

const initialState: TInitialState = {
  ingredients: [],
  bunIngredient: null,
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorAction): TInitialState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bunIngredient: action.bunIngredient,
      };
    }

    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.ingredient
        ],
      };
    }

    case REMOVE_INGREDIENT: {
      const ingredientsArray = [...state.ingredients];
      ingredientsArray.splice(action.insex, 1);
      return {
        ...state,
        ingredients: ingredientsArray
      };
    }

    case MOVE_INGREDIENT: {
      const ingredients = [...state.ingredients];
      [ingredients[action.dragIndex], ingredients[action.hoverIndex]] = [
        ingredients[action.hoverIndex],
        ingredients[action.dragIndex],
      ];
      return {
        ...state,
        ingredients,
      };
    }
    
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
        bunIngredient: null,
      };
    }

    default: {
      return state;
    }
  }
};
