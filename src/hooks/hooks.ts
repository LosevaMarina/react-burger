import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
  } from "react-redux";
  import { AppDispatch, AppThunk, RootState } from "../services/types/index";

  
  export const useAppDispatch = () => dispatchHook<AppDispatch & AppThunk>();

  export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
  