import { ADD_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT, INGREDIENT_MOVE } from '../actions/burger-constructor';
import { v4 as uuid } from "uuid";

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
                { ...action.ingredient, uuid: uuid() },
                ...state.ingredients,
              ],
            };
          }
          case REMOVE_INGREDIENT: {
            return {
              ...state,
              ingredients: [...state.ingredients].filter(
                (ingredient) => ingredient.uuid !== action.uuid
              ),
            };
          }
          case INGREDIENT_MOVE: {
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
          default: {
              return state;
            }
    }
  }