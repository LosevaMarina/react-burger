import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientDetailsReducer } from "./ingredient-details";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailsReducer } from "./order-details";
import { userReducer } from "./registration-user";
import { userFeedReducer } from "./ws-profile";
import { orderFeedReducer } from "./ws-reducer";
import {getOrderCard} from "./order-card";

import store from "../store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import {TIngredientsAction} from "./burger-ingredients";

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


export type RootState = ReturnType<typeof rootReducer>;



export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TIngredientsAction>  
>;