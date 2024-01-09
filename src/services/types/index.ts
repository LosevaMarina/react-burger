import { store } from "../store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import {TTodoActions} from "../actions/index";
import {rootReducer} from "../reducers/index"


//export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TTodoActions>
>;
export type RootState = ReturnType<typeof rootReducer>;