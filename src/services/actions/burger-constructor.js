export const ADD_BUN = "SELECT_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CONSTRUCTOR_CARD = "CONSTRUCTOR_CARD";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export const addIngredient = (ingredient, uuid) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient,
  uuid: uuid,
});

export const removeIngredient = (ingredient, uuid) => ({
  type: REMOVE_INGREDIENT,
  ingredient: ingredient,
  uuid: uuid,
});
