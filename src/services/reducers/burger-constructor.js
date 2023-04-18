import { ADD_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/burger-constructor';
import { v4 as uuid } from "uuid";

const initialState = {
    ingredients: [],
    bun: null,
  };

  export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN: {
            return {
              ...state,
              bun: action.bun,
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
          default: {
              return state;
            }
    }
  }