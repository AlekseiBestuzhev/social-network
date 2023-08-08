import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { MessagesReducer } from '@/features/messages/messages-reducer.ts';
import { ProfileReducer } from '@/features/profile/profile-reducer.ts';
import { UsersReducer } from '@/features/users/users-reducer.ts';
import { ThemeReducer } from '@/features/theme/theme-reducer.ts';
import { AuthReducer } from '@/features/auth/auth-reducer.ts';
import thunk from 'redux-thunk';
import {ServiceReducer} from "@/features/service/service-reducer.ts";
import {saveThemeToLS} from "@/common/utils/locatStorageUtils.ts";

const rootReducer = combineReducers({
	theme: ThemeReducer,
	profile: ProfileReducer,
	messagesPage: MessagesReducer,
	usersPage: UsersReducer,
	auth: AuthReducer,
	service: ServiceReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof store.getState>;

store.subscribe(() => {
	saveThemeToLS(store.getState().theme.current);
});