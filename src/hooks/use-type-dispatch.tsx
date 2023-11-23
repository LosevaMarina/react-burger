import {
  //TypedUseSelectorHook,
 // useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { Dispatch } from "redux";
import { TIngredientsActions } from "../services/actions/burger-ingredients";
//import { AppDispatch, AppThunk } from "../services/reducers/index";

//export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useTypeDispatch = () => dispatchHook<Dispatch<TIngredientsActions>>();
//export const useTypeDispatch = () => dispatchHook<AppDispatch | AppThunk>();