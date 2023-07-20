import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { MessagesReducer } from '@/redux/messages/messages-reducer.ts';
import { ProfileReducer } from '@/features/profile/profile-reducer.ts';
import { UsersReducer } from '@/redux/users/users-reducer.ts';
import { ThemeReducer } from '@/redux/theme/theme-reducer.ts';
import { AuthReducer } from '@/redux/auth/auth-reducer.ts';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	theme: ThemeReducer,
	profilePage: ProfileReducer,
	messagesPage: MessagesReducer,
	usersPage: UsersReducer,
	auth: AuthReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof store.getState>;