import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
  } from "react-redux"; 
  import { AppDispatch, AppThunk, RootState } from "../services/types/index";
import { ChangeEvent, useState } from "react";

  
  export const useAppDispatch = () => dispatchHook<AppDispatch & AppThunk>();

  export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
  
  
  export function useForm<T>(inputValues:T) {
    const [values, setValues] = useState<T>(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }  