import {
  ADD_BUN,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  MOVE_INGREDIENT,
} from "../actions/burger-constructor";

const initialState = {
  ingredients: [],
  bunIngredient: null,
};

export const burgerConstructorReducer = (state = initialState, action) => {
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
          { ingredient: action.ingredient, uuid: action.uuid },
        ],
      };
    }

    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (ingredient) => ingredient.cartId !== action.cartId
        ),
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
