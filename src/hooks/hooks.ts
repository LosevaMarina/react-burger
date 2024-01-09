import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
  } from "react-redux";
  import { AppDispatch, AppThunk } from "../services/types/index";
  import {RootState} from "../services/reducers/index";

  
  export const useAppDispatch = () => dispatchHook<AppDispatch & AppThunk>();

  export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
   