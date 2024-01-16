import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,

  ADD_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT_COUNTER,
  ADD_BUN_COUNTER,

  CLEAR_INGREDIENT_COUNTER,
} from "../actions/burger-ingredients";

import {TIngredientsActions} from '../actions/burger-ingredients';
import {IIngredientType} from "../../utils/data";

type TInitialState = {
  ingredients: ReadonlyArray<IIngredientType>;
  fetchIngredientsRequest: boolean;
  fetchIngredientsError: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  fetchIngredientsRequest: false,
  fetchIngredientsError: false,
};

export const burgerIngredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case INGREDIENTS_REQUEST: {
      return {
        ...state,
        fetchIngredientsError: false,
      };
    }
    case INGREDIENTS_SUCCESS: {
      return {
        ...state,
        fetchIngredientsRequest: false,
        fetchIngredientsError: false,
        ingredients: action.data,
      };
    }
    case INGREDIENTS_ERROR: {
      return {
        ...state,
        fetchIngredientsRequest: false,
        fetchIngredientsError: true,
        ingredients: [],
      };
    }

    
    case ADD_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
          return ingredient._id === action._id
            ? { ...ingredient, counter: ingredient.counter + 1 }
            : ingredient;
        }),
      };
    }

    case REMOVE_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
          return ingredient._id === action._id
            ? { ...ingredient, counter: ingredient.counter - 1 }
            : ingredient;
        }),
      };
    }




    case ADD_BUN_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
          if (ingredient.type === "bun") {
            return {
              ...ingredient,
              counter: ingredient._id === action._id ? 2 : 0,
            };
          } else {
            return ingredient;
          }
        }),
      };
    }

    case CLEAR_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) => {
          return { ...ingredient, counter: 0 };
        }),
      };
    }

    default: {
      return state;
    }
  }
};








