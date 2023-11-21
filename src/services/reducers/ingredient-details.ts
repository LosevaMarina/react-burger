import {
  NO_INGREDIENT,
  INGREDIENT,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL_INGREDIENT,
} from "../actions/ingredient-details";
import {IIngredientType} from "../../utils/data";
import {TIngredientDetailsActions} from "../actions/ingredient-details"


type TInitialState = {
  ingredient: IIngredientType | null;
  openModal: boolean;
}


const initialState: TInitialState = {
  ingredient: null,
  openModal: false,
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case INGREDIENT: {
      return {
        ...state,
        ingredient: action.ingredient,
      };
    }
    case NO_INGREDIENT: {
      return {
        ...state,
        ingredient: null,
      };
    }
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        openModal: true,
      };
    }
    case CLOSE_MODAL_INGREDIENT: {
      return {
        ...state,
        openModal: false,
      };
    }
    default: {
      return state;
    }
  }
};
