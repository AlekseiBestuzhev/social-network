import {
	AuthUserDataType,
	setUserAuthPhoto,
	setUserAuthData,
	AuthReducer
} from "./auth-reducer";

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

test('SET-USER-AUTH-DATA action should set user auth data', () => {
	const newState = AuthReducer(initialState, setUserAuthData(1, 'test@mail.com', 'testlogin'));
	expect(newState.id).toBe(1);
	expect(newState.email).toBe('test@mail.com');
	expect(newState.login).toBe('testlogin');
	expect(newState.isAuth).toBe(true);
});

test('SET-USER-AUTH-PHOTO action should set user auth photo', () => {
	const newState = AuthReducer(initialState, setUserAuthPhoto('testphoto'));
	expect(newState.photos.large).toBe('testphoto');
});

test('unknown action should return initial state', () => {
	const action = { type: 'UNKNOWN' } as any;
	const newState = AuthReducer(initialState, action);
	expect(newState).toEqual(initialState);
});
