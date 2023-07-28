export const INGREDIENT = "INGREDIENT";
export const NO_INGREDIENT = "NO_INGREDIENT";
export const OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT";
export const CLOSE_MODAL_INGREDIENT = "CLOSE_MODAL_INGREDIENT";

export function selectIngredient(ingredient) {
  return {
    type: INGREDIENT,
    ingredient: ingredient,
  };
}


