import {ActionsTypes} from "@/app/action-creators-types.ts";
import {AppRootStateType} from "@/app/store.ts";
import {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, ActionsTypes>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();