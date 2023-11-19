import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,

  ADD_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT_COUNTER,
  ADD_BUN_COUNTER,

  CLEAR_INGREDIENT_COUNTER,
} from "../actions/burger-ingredients";

import {IIngredientType} from '../../utils/data';



interface IngredientsRequestAction {
  type: typeof INGREDIENTS_REQUEST;
}

interface IngredientsSuccesAction {
  type: typeof INGREDIENTS_SUCCESS;
  ingredients: IIngredientType[];
}

interface IngredientsErrorAction {
  type: typeof INGREDIENTS_ERROR;
}

export type TIngredientsAction =
  | IngredientsRequestAction
  | IngredientsSuccesAction
  | IngredientsErrorAction;



interface IInitialState {
  ingredients: IIngredientType[];
  fetchIngredientsRequest: boolean;
  fetchIngredientsError: boolean;
}


const initialState: IInitialState = {
  ingredients: [],
  fetchIngredientsRequest: false,
  fetchIngredientsError: false,
};

export const burgerIngredientsReducer = (state = initialState, action: TIngredientsAction) => {
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




    {/*

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











import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
  INGREDIENTS_ERROR,

  ADD_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT_COUNTER,
  ADD_BUN_COUNTER,

  CLEAR_INGREDIENT_COUNTER,
} from "../actions/burger-ingredients";


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


*/}

