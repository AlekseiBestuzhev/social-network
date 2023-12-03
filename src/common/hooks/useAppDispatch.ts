import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {ActionsTypes} from "@/app/action-creators-types.ts";
import {AppRootStateType} from "@/app/store.ts";
import {ThunkDispatch} from "redux-thunk";

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, ActionsTypes>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatchType>();