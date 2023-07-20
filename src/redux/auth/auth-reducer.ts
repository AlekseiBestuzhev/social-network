import { ActionsTypes } from "../action-creators-types";
import { UserPhotosType } from "../users/users-reducer";

export type AuthUserDataType = {
	id: number | null,
	login: string | null,
	email: string | null,
	isAuth: boolean,
	photos: UserPhotosType,
	inProgress: boolean
}

export type AuthUserType = {
	data: AuthUserDataType,
	messages: [],
	fieldsErrors: [],
	resultCode: 0
}

const initialState: AuthUserDataType = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
	photos: {
		small: null,
		large: null
	},
	inProgress: true
}

export const AuthReducer = (state: AuthUserDataType = initialState, action: ActionsTypes): AuthUserDataType => {
	switch (action.type) {
		case 'SET-USER-AUTH-DATA': {
			return {
				...state,
				...action.payload,
				isAuth: true,
			};
		}
		case 'SET-USER-AUTH-PHOTO': {
			return {
				...state,
				photos: {
					...state.photos,
					large: action.payload.photo
				}
			};
		}
		case 'SET-AUTH-IN-PROGRESS': {
			return {
				...state,
				inProgress: action.payload.inProgress
			}
		}
		default:
			return state;
	}
}

export const setUserAuthData = (id: number, email: string, login: string) => {
	return {
		type: 'SET-USER-AUTH-DATA',
		payload: {
			id,
			email,
			login
		}
	} as const
}

export const setUserAuthPhoto = (photo: string) => {
	return {
		type: 'SET-USER-AUTH-PHOTO',
		payload: {
			photo
		}
	} as const
}

export const setAuthInProgress = (inProgress: boolean) => {
	return {
		type: 'SET-AUTH-IN-PROGRESS',
		payload: {
			inProgress
		}
	} as const
}