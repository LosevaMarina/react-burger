import { v4 as uuid } from 'uuid';
export const ADD_BUN = "SELECT_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CONSTRUCTOR_CARD = "CONSTRUCTOR_CARD";
export const INGREDIENT_MOVE = "INGREDIENT_MOVE";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";


export const addIngredient = (id) => ({
    type: ADD_INGREDIENT,
    uuid: uuid(),
    id: id
  });
  
  export const removeIngredient = (cartId) => ({
    type: REMOVE_INGREDIENT,
    cartId: cartId
  });
  
