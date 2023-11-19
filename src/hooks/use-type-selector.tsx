import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../services/reducers/index";

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;