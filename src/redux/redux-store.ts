import { applyMiddleware, combineReducers, createStore } from "redux";
import { MessagesReducer } from '@/redux/messages/messages-reducer';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ProfileReducer } from '@/redux/profile/profile-reducer';
import { ActionsTypes } from '@/redux/action-creators-types';
import { UsersReducer } from '@/redux/users/users-reducer';
import { ThemeReducer } from '@/redux/theme/theme-reducer';
import { AuthReducer } from '@/redux/auth/auth-reducer';

const rootReducer = combineReducers({
	theme: ThemeReducer,
	profilePage: ProfileReducer,
	messagesPage: MessagesReducer,
	usersPage: UsersReducer,
	auth: AuthReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsTypes>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>;