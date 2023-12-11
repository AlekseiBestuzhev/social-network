import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { ActionsTypes } from '@/app/action-creators-types.ts';
import { AppRootStateType } from '@/app/store.ts';

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, ActionsTypes>;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
