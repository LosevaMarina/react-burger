import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";
import { forgotPasswordReducer } from "./forgot-password";
import { resetPasswordReducer } from "./reset-password";
import { registrationUserReduser } from "./registration-user";

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  registerUser: registrationUserReduser,
});
