import { v4 as uuidv4 } from 'uuid';
//import { nanoid } from "nanoid";
export const ADD_BUN = "SELECT_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CONSTRUCTOR_CARD = "CONSTRUCTOR_CARD";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const addIngredient = (ingredient) => {
  //ngredient.key=uuidv4();
  return {
  type: ADD_INGREDIENT,
  ingredient: ingredient,
  key: uuidv4()
}
};

export const removeIngredient = (cartId) => ({
  type: REMOVE_INGREDIENT,
  cartId: cartId,
});