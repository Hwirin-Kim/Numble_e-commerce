import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../config/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
