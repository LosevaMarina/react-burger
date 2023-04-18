import { INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_ERROR } from '../actions/burger-ingredients';

const initialState = {
    ingredients: [],
    fetchIngredientsRequest: false,
    fetchIngredientsError: false,
  };

  export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENTS_REQUEST: {
          return {
            ...state,
            fetchIngredientsRequest: true,
          };
        }
        case INGREDIENTS_SUCCESS: {
          return {
            ...state,
            fetchIngredientsRequest: false,
            fetchIngredientsError: false,
            ingredients: action.ingredients,
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
        default: {
            return state;
          }
  }

 
}

