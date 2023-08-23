import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import { MessagesReducer } from '@/features/messages/messages-reducer.ts';
import { ProfileReducer } from '@/features/profile/profile-reducer.ts';
import {ServiceReducer} from '@/features/service/service-reducer.ts';
import { UsersReducer } from '@/features/users/users-reducer.ts';
import { ThemeReducer } from '@/features/theme/theme-reducer.ts';
import { AuthReducer } from '@/features/auth/auth-reducer.ts';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	theme: ThemeReducer,
	profile: ProfileReducer,
	messagesPage: MessagesReducer,
	usersPage: UsersReducer,
	auth: AuthReducer,
	service: ServiceReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootStateType = ReturnType<typeof store.getState>;