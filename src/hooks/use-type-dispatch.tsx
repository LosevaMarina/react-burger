import {
  useDispatch as dispatchHook,
} from "react-redux";
import { Dispatch } from "redux";
import { TIngredientsActions } from "../services/actions/burger-ingredients";
export const useTypeDispatch = () => dispatchHook<Dispatch<TIngredientsActions>>();