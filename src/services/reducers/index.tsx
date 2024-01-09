import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./registration-user";
import { userFeedReducer } from "./ws-profile";
import { orderFeedReducer } from "./ws-reducer";
import {getOrderCard} from "./order-card";


export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  userFeed: userFeedReducer,
  orderFeed: orderFeedReducer,
  orderCard: getOrderCard
});



